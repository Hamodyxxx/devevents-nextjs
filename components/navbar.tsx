import { cacheLife } from 'next/cache';
import Image from 'next/image'
import Link from 'next/link'
import { SearchEventsBar } from './search-events-bar/search-events-bar';

const Navbar = async () => {
  "use cache";
  cacheLife("max");

  return (
    <header className='sticky top-0 z-50 py-2'>
      <nav className='container flex flex-row rounded-full justify-between items-center sm:px-10 px-5 py-4 mx-auto glass border-none relative'>
        <Link href="/" className='flex items-center gap-2 flex-row'>
          <Image
            src="/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
          />
          <p className='text-xl font-bold italic max-sm:hidden'>DevEvent</p>
        </Link>

        <SearchEventsBar/>

        <ul className= "flex flex-row items-center gap-6">
          {/* <ThemeToggle/> */}
          <li className='list-none'>
            <Link href="/">Home</Link>
          </li>
          <li className='list-none'>
            <Link href="/">Events</Link>

          </li>
          <li className='list-none'>
            <Link href="/events/create">Create Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar