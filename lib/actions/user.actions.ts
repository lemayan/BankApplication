'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify, capitalizeFirstName } from "../utils";
import { email } from "zod/v4-mini";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { Languages } from "lucide-react";
import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { create } from "domain";
import { id } from "zod/v4/locales";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,

} = process.env;
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try{
    const {database} = await createAdminClient();
    const user= await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,   
      [Query.equal("userId", [userId])],


    )

    return parseStringify(user.documents[0]);
  }catch (error) {
    console.log("An error occurred while getting the banks:", error);
  }

}

export const signIn = async ({ email , password } : signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
           
        });
        const user = await getUserInfo({userId: session.userId});
     
        return parseStringify(user);
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
};
export const signUp = async ({password , ...userData}: SignUpParams) => {
    let newUserAccount;

    try {
        const { email , firstName , lastName} = userData;
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }
        
        // Capitalize firstName
        const capitalizedFirstName = capitalizeFirstName(firstName);
        
        const { account , database } = await createAdminClient();    
            // Check if user already exists in our database
        
        try {
            const existingUsers = await database.listDocuments(
                DATABASE_ID!,
                USER_COLLECTION_ID!,
                [
                    Query.equal('email', email)
                ]
            );
            
            if (existingUsers.documents.length > 0) {
                throw new Error("User with this email already exists");
            }
        } catch (dbError: any) {
            // If it's not a "user already exists" error, continue with signup
            if (dbError.message !== "User with this email already exists") {
                console.log("Database query error (continuing with signup):", dbError);
            } else {
                throw dbError;
            }
        }

        const newUserAccount= await account.create(ID.unique(),
        email, 
        password, 
        `${capitalizedFirstName} ${lastName}`
        );

        if (!newUserAccount) throw new Error ("Error creating user ")

        const dwollaCustomerUrl= await createDwollaCustomer({
            ...userData,
            firstName: capitalizedFirstName,
            type: "personal"
        })
        if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

        const dwollaCustomerId = extractCustomerIdFromUrl (dwollaCustomerUrl);        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                email: userData.email,
                firstName: capitalizedFirstName,
                lastName: userData.lastName,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl,
                address1: userData.address1,
                city: userData.city,
                state: userData.state,
                postalCode: userData.postalCode,
                dateOfBirth: userData.dateOfBirth,
                ssn: userData.ssn
            }

        )

        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
           
        });
        return parseStringify(newUser);    } catch (error) {
        console.error("Error during sign-up:", error);
        throw error;
    }
};

// ... your initialization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();
        const user = await getUserInfo({ userId: result.$id });
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession('current');
        (await cookies()).delete('appwrite-session');
        return true;
    } catch (error) {
        return null;
        
    }
}

export const createLinkToken = async (user : User) =>{
    try{
        const tokenParams = {
            user :{
                client_user_id: user.$id
            },
            client_name: `${capitalizeFirstName(user.firstName)} ${user.lastName}'s Bank Account`,
            products: ['auth'] as Products[],
            country_codes: ['US'] as CountryCode[],
            language: 'en',
            
        }

        const response = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({linkToken: response.data.link_token}); 

    }
    catch(error){
        console.error("Error creating link token:", error);
        throw error;
    }
}


export const createBankAccount = async({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
}: createBankAccountProps) => {
    try{
        const {database} = await createAdminClient();
        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }

        )

        return parseStringify(bankAccount);
       

    } catch (error) {

    }
}

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

     // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
     const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    
    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
}
export const getBanks = async ({userId}:
getBanksProps) => {
  try{
    const {database} = await createAdminClient();
    const banks= await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,   
      [Query.equal("userId", [userId])],


    )

    return parseStringify(banks.documents);
  }catch (error) {
    console.log("An error occurred while getting the banks:", error);
  }
};
export const getBank = async ({documentId}:
getBankProps) => {
  try{
    const {database} = await createAdminClient();
    const bank= await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,   
      [Query.equal("$id", [documentId])],


    )

    return parseStringify(bank.documents[0]);
  }catch (error) {
    console.log("An error occurred while getting the banks:", error);
  }
};