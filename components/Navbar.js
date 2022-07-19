import Link from 'next/link'
import Image from 'next/image'

const commonData = require('../data/common.json');

function Navbar (){
    return(
        <>
        <div className="navbar bg-base-100 fixed py-5 shadow-xl z-50">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href="/stats-giocatori"><a>Statistiche giocatori</a></Link></li>
                </ul>
                </div>
                <Link href="/">
                    <a className="normal-case">
                        <p className="block text-4xl font-bold tracking-tighter leading-7">{commonData.SiteName}</p>
                        <span className="block text-2xs font-semibold italic text-accent leading-3 text-center sm:text-left">{commonData.Slogan}</span>
                    </a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li className="m-2"><Link href="/stats-giocatori"><a className="p-2">Statistiche giocatori</a></Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {/* <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button> */}
                <div className="hidden sm:inline-block">
                    <a className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar