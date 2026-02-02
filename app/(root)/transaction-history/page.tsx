import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionTable from '@/components/TransactionTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react'


const TransactionHistory = async ({searchParams}:SearchParamProps) => {
  
  // Await searchParams in Next.js 15+
  const { id, page } = await searchParams;
  
  const CurrentPage = Number (page as string) || 1;
  
  // Parallel data fetching for better performance
  const loggedIn = await getLoggedInUser();
  const [accounts] = await Promise.all([
    getAccounts({ userId: loggedIn?.$id })
  ]);
  
  if (!accounts) return;
  const accountsData = accounts?.data;
  const  appwriteItemId = (id as string) || accountsData?.[0]?.appwriteItemId;
  
  // Fetch account data with caching
  const account = await getAccount({appwriteItemId});
  
  const rowsPerPage = 10;
  const totalPages = Math.ceil((account?.transactions?.length || 0) / rowsPerPage);
  const indexOfLastTransaction = CurrentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = account?.transactions?.slice(indexOfFirstTransaction, indexOfLastTransaction) || [];
  
  console.log('Total transactions:', account?.transactions?.length);
  console.log('Total pages:', totalPages);
  console.log('Current page:', CurrentPage);
  
  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
        title='Transaction History'
        subtext='See your bank details and transactions'
        
        />



      </div>
      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-bold text-white'>

              {account?.data.name }
              <p className='text-14 text-blue-25'>
                {account?.data.officialName}
              </p>
              <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                            ●●●● ●●●● ●●●● {account?.data.mask}
                        </p>
            </h2>

          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>
              Current Balance

            </p>
            <p className='text-24 text-center font-bold'>
              {formatAmount(account?.data.currentBalance)}

            </p>


          </div>

        </div>
        <section className='flex w-full flex-col gap-6'>
          <TransactionTable
            transactions={currentTransactions}
          
          />
          <div className='my-4 w-full'>
            <Pagination
              page={CurrentPage}
              totalPages={totalPages}
            />
          </div>

        </section>

      </div>

    </div>
  )
}

export default TransactionHistory