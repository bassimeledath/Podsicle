import Image from 'next/image';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
      <Image src="/groovy_header/5964585.jpg" alt="Cover Image" className="bg-img" width={100}
            height={30}
            priority/>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}