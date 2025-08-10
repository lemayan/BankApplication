import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { capitalizeFirstName } from '@/lib/utils'
import { get } from 'http'
import React from 'react'

const Home = async ({searchParams} : SearchParamProps) => {
  const { id, page } = await searchParams;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });
  if (!accounts) return;
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  return (
    <section className='home'>

      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={capitalizeFirstName(loggedIn.firstName) || 'Guest'}
            subtext='Easily view and manage your accounts and transactions.'
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
      user ={loggedIn}
      transactions={[]}
      banks= {accountsData?.slice (0, 2)}
      
      
      />
     


    </section>
  )
}

export default Home