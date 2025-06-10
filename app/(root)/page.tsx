import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: 'Ivy', lastName:'Mwikali', email: "ivymwikali@gmail.com"}
  return (
    <section className='home'>

      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext='Easily view and manage your accounts and transactions.'
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
      user ={loggedIn}
      transactions={[]}
      banks={[{currentBalance : 230.50}, { currentBalance: 500.50}]}
      
      
      
      />
     


    </section>
  )
}

export default Home