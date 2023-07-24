import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const commonData = require('../data/common.json');

export async function getStaticProps(context) {
	const resP = await fetch(
		'https://api.fantastats.net/api/v2/players/top10/P'
	);
	const por = await resP.json();

	const resD = await fetch(
		'https://api.fantastats.net/api/v2/players/top10/D'
	);
	const dif = await resD.json();

	const resC = await fetch(
		'https://api.fantastats.net/api/v2/players/top10/C'
	);
	const cen = await resC.json();

	const resA = await fetch(
		'https://api.fantastats.net/api/v2/players/top10/A'
	);
	const att = await resA.json();

	return {
		props: {
			por,
			dif,
			cen,
			att,
		},
	};
}

export default function Home({ por, dif, cen, att }) {
	return (
		<div>
			<Head>
				<title>
					{commonData.SiteName} | Statistiche per il Fantacalcio
				</title>
				<meta
					name="description"
					content="Analizza le statitstiche per migliorare il tuo Fantacalcio"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="pt-16">
				<section className="text-gray-600 body-font">
					<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
						<div className="rounded-full p-0 m-0 shadow-lg overflow-hidden pt-1.5 pl-1.5 pr-1.5 mb-8">
							<Image
								src="/main.jpg"
								alt={commonData.SiteName}
								width={320}
								height={320}
								className="block object-cover w-32 h-32 rounded-full"
							/>
						</div>

						<div className="text-center lg:w-2/3 w-full">
							<h1 className="sm:text-4xl text-3xl mb-4 font-bold text-secondary text-primary">
								Il Fantacalcio è questione di numeri
							</h1>
							<p className="mb-8 leading-relaxed">
								Metti da parte la tua squadra del cuore o il tuo
								calciatore preferito. Analizza le statistiche
								complessive dei giocatori negli ultimi anni e rendi
								&quot;solido&quot; il tuo fantacalcio scegliendo
								giocatori sulla base delle loro statistiche o dei loro
								andamenti.
							</p>
							{/* <div className="flex justify-center">
                <button className="btn">Inizia, è gratis</button>
              </div> */}
						</div>
					</div>
				</section>
				<section className="container mx-auto text-gray-600 mt-12 md:flex gap-4 justify-center">
					<div className="border md:w-1/4 mx-4 md:mx-auto shadow-lg mb-2 md:shadow-none">
						<h2 className="font-bold border-b p-4">Top 10 Portieri</h2>
						<ul className="m-4">
							{por.map((item) => {
								return (
									<li key={item.fid} className="border-b p-2">
										{item.name} <small>FM {item.mf}</small>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="border md:w-1/4 mx-4 md:mx-auto shadow-lg mb-2 md:shadow-none">
						<h2 className="font-bold border-b p-4">Top 10 Difensori</h2>
						<ul className="m-4">
							{dif.map((item) => {
								return (
									<li key={item.fid} className="border-b p-2">
										{item.name} <small>FM {item.mf}</small>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="border md:w-1/4 mx-4 md:mx-auto shadow-lg mb-2 md:shadow-none">
						<h2 className="font-bold border-b p-4">
							Top 10 Centrocampisti
						</h2>
						<ul className="m-4">
							{cen.map((item) => {
								return (
									<li key={item.fid} className="border-b p-2">
										{item.name} <small>FM {item.mf}</small>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="border md:w-1/4 mx-4 md:mx-auto shadow-lg mb-2 md:shadow-none">
						<h2 className="font-bold border-b p-4">Top 10 Attaccanti</h2>
						<ul className="m-4">
							{att.map((item) => {
								return (
									<li key={item.fid} className="border-b p-2">
										{item.name} <small>FM {item.mf}</small>
									</li>
								);
							})}
						</ul>
					</div>
				</section>
				<div className="container mx-auto text-center">
					<small>
						ATTENZIONE: I dati mostrati sono relativi alle medie degli
						ultimi 5 anni
					</small>
				</div>
			</main>
		</div>
	);
}
