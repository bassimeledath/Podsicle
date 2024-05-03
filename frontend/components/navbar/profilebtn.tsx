import { useState } from 'react';
import { PowerIcon, ChevronDownIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { getUser } from '@/lib/getUser';
import { signOut } from "@/lib/firebase/auth";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push("/");
  };
  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center mt-2 focus:outline-none">
        <div className="bg-violet-600 rounded-full w-6 h-6 md:w-8 md:h-8">
        {user ? <Image src={user.photoURL} alt="User Avatar" className="rounded-full" width={32} height={32} /> : null}
        </div>
        <ChevronDownIcon className="w-4 text-gray-800 ml-1" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-3 w-32 md:w-36 bg-white rounded-lg shadow-lg z-10">
          <ul>
            <li><Link href="/history" onClick={() => setIsOpen(!isOpen)}>
              <button className="flex items-center w-full p-2 hover:bg-gray-100">
                <DocumentDuplicateIcon className="w-4 md:w-6 text-gray-800" />
                <p className="ml-2 text-sm">History</p>
              </button></Link>
            </li>
            <li><Link href="/community" onClick={() => setIsOpen(!isOpen)}>
              <button className="flex items-center w-full p-2 hover:bg-gray-100" onClick={handleSignOut}>
              <PowerIcon className="w-4 md:w-6 text-gray-800" />
                <p className="ml-2 text-sm">Sign Out</p>
              </button></Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
