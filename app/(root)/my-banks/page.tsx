import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { Ban } from 'lucide-react';

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });
  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title = "My Bank Accounts"
          subtext = "Effortlessly manage and monitor all your Bank accounts."
          
        />
        <div className='space-y-4 '>
          <h2 className='header-2'>
            Your Cards

          </h2>
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((a:Account) => (
              <BankCard 
              key={a.appwriteItemId} 
              account={a} 
              userName={loggedIn?.firstName}
              showBalance={true} />
            ))}

          </div>

        </div>

      </div>

    </section>
  )
}

export default MyBanks