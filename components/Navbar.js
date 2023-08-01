import Link from 'next/link';
import Image from 'next/image';

const commonData = require('../data/common.json');

function Navbar() {
	return (
		<>
			<div className="navbar bg-base-100 fixed py-5 shadow-xl z-50">
				<div className="navbar-start md:inline-flex">
					<div className="dropdown">
						<label tabIndex="0" className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex="0"
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link href="/statistiche-giocatori">
									<a>Statistiche totali</a>
								</Link>
							</li>
							<li>
								<Link href="/fasce-asta">
									<a>Fasce per l&apos;asta</a>
								</Link>
							</li>
							<li>
								<Link href="/calcola-potenziale">
									<a>Calcola potenziale</a>
								</Link>
							</li>
							<li>
								<Link href="/compara-giocatori">
									<a>Comparatore</a>
								</Link>
							</li>
						</ul>
					</div>
					<Link href="/">
						<a className="normal-case">
							<div className="block text-xl md:text-3xl font-bold tracking-tighter inline-flex gap-2 items-start">
								{commonData.SiteName}
								<div className="badge text-white badge-accent text-xs tracking-tighter uppercase lg:translate-y-2 px-2 py-1">
									beta
								</div>
							</div>
							<span className="block text-2xs font-semibold italic text-accent leading-3 text-center sm:text-left">
								{commonData.Slogan}
							</span>
						</a>
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal p-0">
						<li className="m-2">
							<details className="dropdown">
								<summary>Statistiche</summary>
								<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
									<li>
										<Link href="/statistiche-giocatori">
											<a>Statistiche totali</a>
										</Link>
									</li>
								</ul>
							</details>
						</li>
						<li className="m-2">
							<Link href="/fasce-asta">
								<a className="p-2">Fasce per l&apos;asta</a>
							</Link>
						</li>
						<li className="m-2">
							<details className="dropdown">
								<summary>Tools</summary>
								<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
									<li>
										<Link href="/calcola-potenziale">
											<a>Calc. potenziale squadra</a>
										</Link>
									</li>
									<li>
										<Link href="/compara-giocatori">
											<a>Comparatore</a>
										</Link>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
				<div className="navbar-end hidden lg:flex">
					{/* <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button> */}
					<div className="hidden sm:inline-block">
						<Link href="/login">
							<a className="btn">Login</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
