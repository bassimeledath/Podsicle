import NavBar from '@/components/navbar/navbar';
import Footer from '@/components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <main className="flex h-full min-h-[46rem] md:h-[48rem] 2xl:h-[60rem] flex-col items-center gap-10 px-2 md:px-6 py-2 md:py-6 background-gradient">
        {children}
      </main>
      <Footer />
    </div>
  );
}
