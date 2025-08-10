import Image from 'next/image';
import { logoutAccount } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import { capitalizeFirstName } from '@/lib/utils';


const Footer = ({user , type = 'desktop'}: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async() => {
    const loggedOut = await logoutAccount();
    if(loggedOut) router.push('/sign-in');
    

  }
  return (
    <footer className='footer'>
        
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className='text-xl font-bold text-gray-700'>
                {capitalizeFirstName(user?.firstName)?.[0] || 'I'}
            </p>

        </div>
        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className='text-14 truncate text-blue-600 font-semibold'>
            {capitalizeFirstName(user?.firstName)}
          </h1>
          <p className='text-14 text-gray-600 font-normal truncate'>
            {user?.email}

          </p>

        </div>
        <div className='footer_image'onClick={handleLogOut}>
          <Image src = "/icons/logout.svg" fill alt='ivy'/>
        </div>
    </footer>
  )
}

export default Footer