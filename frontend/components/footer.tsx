export default function Footer() {
    return (
      <footer className="flex h-[3rem] md:h-[60px] bg-white md:flex md:items-center md:justify-between gap-1 px-4 sm:px-8 font-medium border-black border-solid border-t md:px-8">

            <span className="text-sm text-black sm:text-center ">© 2024 <a href="https://flowbite.com/" className="hover:underline">Podsicle™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center text-sm text-black ">
                <li>
                    <a href="/" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="/" className="mr-4 hover:underline md:mr-6">Feedback</a>
                </li>
                <li>
                    <a href="/" className="hover:underline">Demo</a>
                </li>
            </ul>

          </footer>
    );
}