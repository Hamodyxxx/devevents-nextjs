import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 glass'>
      <nav className='container flex flex-row justify-between items-center sm:px-10 px-5 py-4 mx-auto'>
        <Link href="/" className='flex items-center gap-2 flex-row'>
          <Image
            src="/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
          />
          <p className='text-xl font-bold italic max-sm:hidden'>DevEvent</p>
        </Link>

        <ul className= "flex flex-row items-center gap-6">
          {/* <ThemeToggle/> */}
          <Link href="/home">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/events/create">Create Event</Link>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar