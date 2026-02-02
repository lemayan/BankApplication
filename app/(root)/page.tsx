import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccounts , getAccount } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { capitalizeFirstName } from '@/lib/utils'
import React from 'react'

const Home = async ({searchParams} : SearchParamProps) => {
  // Await searchParams in Next.js 15+
  const { id, page } = await searchParams;
  
  // Only read params you actually need; avoiding unnecessary awaits/work.
  const CurrentPage = Number (page as string) || 1;
  
  // Parallel data fetching for better performance
  const loggedIn = await getLoggedInUser();
  const [accounts] = await Promise.all([
    getAccounts({ userId: loggedIn?.$id })
  ]);
  
  if (!accounts) return;
  const accountsData = accounts?.data;
  const  appwriteItemId = (id as string) || accountsData?.[0]?.appwriteItemId;
  
  // Fetch account data in parallel with rendering
  const account = await getAccount({appwriteItemId});

  return (
    <section className='home'>

      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName ? capitalizeFirstName(loggedIn.firstName) : 'Guest'}
            subtext='Easily view and manage your accounts and transactions.'
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions 
        accounts = {accountsData}
        transactions = {account?.transactions || []}
        appwriteItemId = {appwriteItemId}
        page = {CurrentPage}
        />
        
      </div>
      <RightSidebar 
      user ={loggedIn}
      transactions={account?.transactions}
      banks= {accountsData?.slice (0, 2)}
      
      
      />
     


    </section>
  )
}

export default Home