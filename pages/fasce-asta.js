import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Hero from '../components/Hero';
import Link from 'next/link';

const commonData = require('../data/common.json');

export async function getStaticProps(context) {
	const resP = await fetch(
		'https://api.fantastats.net/api/v2/players/fasce/P/24'
	);
	const por = await resP.json();

	const resD = await fetch(
		'https://api.fantastats.net/api/v2/players/fasce/D/56'
	);
	const dif = await resD.json();

	const resC = await fetch(
		'https://api.fantastats.net/api/v2/players/fasce/C/56'
	);
	const cen = await resC.json();

	const resA = await fetch(
		'https://api.fantastats.net/api/v2/players/fasce/A/48'
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

export default function FasceAsta({ por, dif, cen, att }) {
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
				<Hero
					title="Fasce per Asta Fantacalcio"
					desc="Scopri le fasce automatiche che consiglia FantaStats"
				/>
				<section className="text-gray-600 body-font">
					<div className="container mx-auto mb-8 text-center">
						<p>
							<b>NOTA BENE:</b> Quelli che sono esposte sono le fasce per
							un fantacalcio a 8 prendendo le medie statistiche degli
							ultimi 3 anni. Questo significa che un giocatore che è da 1
							anno in Serie A e ha fatto una grande prestazione sarà
							valutato mediamente come migliore di un giocatore che ha
							medie simili ma che ha giocato più campionati.
						</p>
					</div>
					<div className="mx-4 border mb-2">
						<h2 className="font-bold p-1 border-b">Portieri</h2>
						<div className="grid grid-cols-8">
							{por.map((item, index) => {
								return (
									<div key={item.fid} className="col-1/8 p-1 border-b">
										<Link href={'/giocatore/' + item.fid}>
											<a>
												{item.name} <small>({item.mf})</small>
											</a>
										</Link>
									</div>
								);
							})}
						</div>
					</div>

					<div className="mx-4 border mb-2">
						<h2 className="font-bold p-1 border-b">Difensori</h2>
						<div className="grid grid-cols-8">
							{dif.map((item, index) => {
								return (
									<div key={item.fid} className="col-1/8 p-1 border-b">
										<Link href={'/giocatore/' + item.fid}>
											<a>
												{item.name} <small>({item.mf})</small>
											</a>
										</Link>
									</div>
								);
							})}
						</div>
					</div>

					<div className="mx-4 border mb-2">
						<h2 className="font-bold p-1 border-b">Centrocampisti</h2>
						<div className="grid grid-cols-8">
							{cen.map((item, index) => {
								return (
									<div key={item.fid} className="col-1/8 p-1 border-b">
										<Link href={'/giocatore/' + item.fid}>
											<a>
												{item.name} <small>({item.mf})</small>
											</a>
										</Link>
									</div>
								);
							})}
						</div>
					</div>

					<div className="mx-4 border mb-2">
						<h2 className="font-bold p-1 border-b">Attaccanti</h2>
						<div className="grid grid-cols-8">
							{att.map((item, index) => {
								return (
									<div key={item.fid} className="col-1/8 p-1 border-b">
										<Link href={'/giocatore/' + item.fid}>
											<a>
												{item.name} <small>({item.mf})</small>
											</a>
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
