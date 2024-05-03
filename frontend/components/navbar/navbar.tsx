'use client'

import Image from 'next/image';
import {
  UserGroupIcon,
  HomeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import ProfileButton from '@/components/navbar/profilebtn';
import { getUser } from '@/lib/getUser';

const links = [
  { name: 'Home', 
    href: '/', 
    icon: HomeIcon },
    { name: 'Community',
    href: '/community',
    icon: UserGroupIcon,
    },
    { name: 'Playground', 
      href: '/playground',
      icon: SparklesIcon },
];

export default function NavBar() {
  const user = getUser();
  const pathname = usePathname();
    return (
<header className="flex h-[3rem] md:h-[60px] justify-between items-center">
      <Link href="/" className="flex w-2/5 md:w-1/2 shrink-0">
        <Image src="/groovy_header/5964585.jpg" alt="Cover Image" className="bg-img w-[50%]" width={100} height={16}/>
        <Image src="/logo.png" alt='logo' height={30} width={100} priority className="w-[30rem] md:w-[30%] h-[2rem] md:h-auto ml-2 md:ml-4"/>
      </Link>
    <ul className="flex flex-row gap-2 md:gap-4 items-center text-gray-800">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.name}>
          <Link
            href={link.href}
            className={clsx('flex md:h-[60px] h-[3rem] grow items-center justify-center md:gap-2 rounded-md p-1 md:p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:px-3',
                      {'bg-indigo-100 text-indigo-600': pathname === link.href,},)}
          >
            <LinkIcon className="w-6 md:w-8" />
            <p className="hidden md:block">{link.name}</p>
          </Link></li>
        );
      })}
      <li key="profile">
        {user ? <ProfileButton/> : <Link href="/sign-in" className="'flex md:h-[60px] h-[3rem] grow items-center justify-center md:gap-2 rounded-md p-1 md:p-3 text-sm font-medium md:flex-none md:justify-start md:px-3'"><p className="pr-2">Sign In</p></Link>}
      </li>
    </ul>
  </header>
  );
}