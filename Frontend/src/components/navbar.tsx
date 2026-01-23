'use client';
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
    
    <div className="navbar sticky top-0 bg-[#FCF8F2] bg-opacity-30 z-50 shadow-sm">
  <div className="navbar-start pl-20">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/resources">Resources</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        </ul>
    </div>
    <Link href="/">
      <Image src="/logo.svg" alt="UniShare Logo" width={120} height={40} />
    </Link>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-black">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/resources">Resources</Link></li>
      <li><Link href="/about">About</Link></li>
      <li><Link href="/contact">Contact</Link></li>
    </ul>
  </div>
  <div className="navbar-end pr-20">
    <Link href="/login" className="btn px-6 py-4 bg-black text-white rounded-full">Log in</Link>
  </div>
</div>
</>
  );
}