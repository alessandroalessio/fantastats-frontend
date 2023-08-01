import Link from 'next/link';
const commonData = require('../data/common.json');

function Footer() {
	return (
		<>
			<div className="block w-full text-center p-8 text-sm border-t mt-20">
				<span className="block">
					<strong>{commonData.SiteName}</strong> -{' '}
					<i>{commonData.Slogan}</i>
				</span>
				<small className="flex gap-1 justify-center mt-2">
					<span>Fantastats è un progetto di </span>
					<Link href="https://www.alessandroalessio.dev">
						<a className="underline">Alessandro Alessio</a>
					</Link>
				</small>
			</div>
		</>
	);
}

export default Footer;
