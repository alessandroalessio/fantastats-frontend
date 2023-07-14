import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import mainImageSrc from '../public/main.jpg';

const commonData = require('../data/common.json');

export default function Home() {
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
								src={mainImageSrc}
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
			</main>
		</div>
	);
}
