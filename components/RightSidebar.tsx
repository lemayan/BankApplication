import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'
import { capitalizeFirstName, countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
    const categories: CategoryCount[] = countTransactionCategories(transactions);
    
    return (
        <aside className='right-sidebar'>
            <section className='flex flex-col pb-8'>
                <div className='profile-banner' />
                <div className='profile'>
                    <div className='profile-img'>
                        <span className='text-5xl font-bold text-[#7c3aed] bg-white rounded-full px-4 py-2 shadow'>
                            {capitalizeFirstName(user.firstName)?.charAt(0).toUpperCase() || 'I'}
                        </span>
                    </div>
                    <div className='profile-details'>
                        <h1 className='profile-name text-[#7c3aed]'>
                            {capitalizeFirstName(user.firstName)} {user.lastName}
                        </h1>
                        <p className='profile-email text-[#b7aaff]'>
                            {user?.email}
                        </p>
                    </div>
                </div>
            </section>
            <section className='banks'>
                <div className='flex w-full  justify-between'>
                    <h2 className='header-2 text-[#7c3aed]'>My Banks</h2>
                    <Link href='/' className='flex gap-2'>
                        <Image
                            src='/icons/plus.svg'
                            width={20}
                            height={20}
                            alt='plus'
                        />
                        <h2 className='text-14 font-extrabold text-[#b7aaff]'>Add Bank</h2>
                    </Link>
                </div>
                {banks?.length > 0 && (
                    <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                        <div className='relative z-10'>
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${capitalizeFirstName(user.firstName)} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className='absolute right-0 top-8 z-0 w-[90%]'>
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${capitalizeFirstName(user.firstName)} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}
            </section>
            <div className='mt-10 flex flex-1 flex-col gap-6'>
                <h2 className='header-2 mb-2 pl-4'>
                    Top Categories
                </h2>
                <div className='space-y-5'>
                    {categories.slice(0, 4).map((category, index) => (
                        <Category
                        key ={category.name}
                        category = {category}
                        
                        />
                    ))}

                </div>

            </div>
        </aside>
    )
}

export default RightSidebar
