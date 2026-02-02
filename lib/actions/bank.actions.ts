"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "@/lib/plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Simple in-memory cache (per server runtime instance) to avoid repeated Plaid calls during high navigation.
// Not a replacement for a real cache; resets on deployment or server restart.
const accountsCache = new Map<string, { expires: number; value: any }>();
const CACHE_TTL_MS = 30_000; // 30 seconds – adjust cautiously.

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    const cacheKey = `accounts:${userId}`;
    const cached = accountsCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }
    // get banks from db
    const banks = await getBanks({ userId });

    // Check if banks exist and is an array
    if (!banks || !Array.isArray(banks) || banks.length === 0) {
      return parseStringify({ data: [], totalBanks: 0, totalCurrentBalance: 0 });
    }

    const accounts = await Promise.all(
      banks.map(async (bank: Bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          shareableId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

  const result = parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  accountsCache.set(cacheKey, { expires: Date.now() + CACHE_TTL_MS, value: result });
  return result;
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
    return parseStringify({ data: [], totalBanks: 0, totalCurrentBalance: 0 });
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    const cacheKey = `account:${appwriteItemId}`;
    const cached = accountsCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }

    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    //get transfer transactions from appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // Merge Plaid transactions with transfer transactions from Appwrite
    const allTransactions = [...transferTransactions, ...transactions].sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const result = parseStringify({
      data: account,
      transactions: allTransactions,
    });
    accountsCache.set(cacheKey, { expires: Date.now() + CACHE_TTL_MS, value: result });
    return result;
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
    return parseStringify({ data: null, transactions: [] });
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let transactions: any = [];

  try {
    // Use transactionsGet for Plaid - get last 30 days of transactions
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();

    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      options: {
        count: 250,
        offset: 0,
      },
    });

    // Helper function to format category names
    const formatCategory = (category: string) => {
      if (!category) return "Other";
      return category
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    transactions = response.data.transactions.map((transaction) => ({
      id: transaction.transaction_id,
      name: transaction.name,
      paymentChannel: transaction.payment_channel,
      type: transaction.amount > 0 ? 'debit' : 'credit',
      accountId: transaction.account_id,
      amount: Math.abs(transaction.amount),
      pending: transaction.pending,
      category: formatCategory(transaction.personal_finance_category?.primary || transaction.category?.[0] || "Other"),
      date: transaction.date,
      image: transaction.logo_url,
    }));

    return parseStringify(transactions);
  } catch (error: any) {
    console.error("An error occurred while getting the transactions:", error);
    console.error("Plaid error details:", error.response?.data);
    return parseStringify([]);
  }
};

// Create Transfer
export const createTransfer = async () => {
  // Pull sensitive sandbox values from environment variables instead of hardcoding.
  const {
    PLAID_SANDBOX_ACCESS_TOKEN,
    PLAID_SANDBOX_ACCOUNT_ID,
    PLAID_SANDBOX_FUNDING_ACCOUNT_ID,
  } = process.env;

  if (
    !PLAID_SANDBOX_ACCESS_TOKEN ||
    !PLAID_SANDBOX_ACCOUNT_ID ||
    !PLAID_SANDBOX_FUNDING_ACCOUNT_ID
  ) {
    throw new Error(
      "Missing Plaid sandbox environment variables. Please set PLAID_SANDBOX_ACCESS_TOKEN, PLAID_SANDBOX_ACCOUNT_ID and PLAID_SANDBOX_FUNDING_ACCOUNT_ID."
    );
  }

  const transferAuthRequest: TransferAuthorizationCreateRequest = {
    access_token: PLAID_SANDBOX_ACCESS_TOKEN,
    account_id: PLAID_SANDBOX_ACCOUNT_ID,
    funding_account_id: PLAID_SANDBOX_FUNDING_ACCOUNT_ID,
    type: "credit" as TransferType,
    network: "ach" as TransferNetwork,
    amount: "10.00",
    ach_class: "ppd" as ACHClass,
    user: {
      legal_name: "Sandbox User",
    },
  };
  try {
    const transferAuthResponse =
      await plaidClient.transferAuthorizationCreate(transferAuthRequest);
    const authorizationId = transferAuthResponse.data.authorization.id;

    const transferCreateRequest: TransferCreateRequest = {
      access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
      account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
      description: "payment",
      authorization_id: authorizationId,
    };

    const responseCreateResponse = await plaidClient.transferCreate(
      transferCreateRequest
    );

    const transfer = responseCreateResponse.data.transfer;
    return parseStringify(transfer);
  } catch (error) {
    console.error(
      "An error occurred while creating transfer authorization:",
      error
    );
  }
};