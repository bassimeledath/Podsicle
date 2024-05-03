import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/components/ui/fonts';
import Image from 'next/image';
import '@/app/globals.css';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52" style={{position: "relative",}}>
        <Image src="/groovy_header/5964585.jpg" alt="Cover Image" className="bg-img" width={100}
            height={30}
            priority/>
        <Image src="/logo.png" alt='Podsicle Logo'
            height={100}
            width={540}
            className="pt-4"
          />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white px-6 py-10 md:w-2/5 md:px-20">
          <h1 className={`${lusitana.className} text-black text-6xl font-bold`}>Welcome to Podsicle</h1>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Let Speak Research!</strong>
          </p>
          <p className={`${lusitana.className} typing-animation text-xl text-gray-800 md:text-3xl md:leading-normal`}>Generate the podcast you want!</p>
          <Link href="/community" className="flex items-center gap-5 self-start rounded-lg bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-400 md:text-base">
            <span>Let's get started!</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center md:w-4/5 p-6 md:px-14"> 
        {/* p-6  md:px-28 md:py-12 */}
          <Image src="/frontpage.jpg"
            width={6000}
            height={4000}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
