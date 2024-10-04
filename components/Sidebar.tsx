"use client";
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({user}: SiderbarProps) => {
  const pathName = usePathname();

  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href='/' className='mb-12 cursor-pointer flex items-denter gap-2'>
            <Image src='/icons/logo.svg' width={34} height={34} alt='Finexa Logo'
            className='size-[24px] max-xl:size-14'/>
            <h1 className='sidebar-logo'>Finexa</h1>
        </Link>

        {sidebarLinks.map((item) =>{
            const isActive = pathName === item.route || pathName.startsWith(item.route);

            return (
                <Link href={item.route} key={item.label}
                className={cn('sidebar-link', {'bg-bank-gradient':isActive})}>
                    <Image src={item.imgURL} alt={item.label} width={30} height={30}
                    className={cn({'brightness-[3] invert-0':isActive})}></Image>
                    <p className={cn('sidebar-label',{'!text-white':isActive})}>{item.label}</p>
                </Link>
            )
        })}
        USER
      </nav>

    FOOTER
    </section>
  )
}

export default Sidebar
