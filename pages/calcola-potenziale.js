'use client';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Hero from '../components/Hero';
import Link from 'next/link';
import { useState } from 'react';
import Select from 'react-select';

const commonData = require('../data/common.json');

// export async function getStaticProps(context) {
// 	const resP = await fetch(
// 		'https://api.fantastats.net/api/v2/players/fasce/P/24'
// 	);
// 	const por = await resP.json();

// 	const resD = await fetch(
// 		'https://api.fantastats.net/api/v2/players/fasce/D/56'
// 	);
// 	const dif = await resD.json();

// 	const resC = await fetch(
// 		'https://api.fantastats.net/api/v2/players/fasce/C/56'
// 	);
// 	const cen = await resC.json();

// 	const resA = await fetch(
// 		'https://api.fantastats.net/api/v2/players/fasce/A/48'
// 	);
// 	const att = await resA.json();

// 	return {
// 		props: {
// 			por,
// 			dif,
// 			cen,
// 			att,
// 		},
// 	};
// }

const options = [
	{ value: 1, label: 'Immobile' },
	{ value: 2, label: 'Savicevic' },
	{ value: 3, label: 'Vanilla' },
];

function findLabelByValue(matrix, searchValue) {
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i].value === parseInt(searchValue)) {
			return matrix[i].label;
		}
	}
	return null; // Restituisce null se il valore non viene trovato nella matrice
}

export default function CalcolaPotenziale({ por, dif, cen, att }) {
	const [playersList, setPlayer] = useState([]);
	const [ptiTotal, setPtiTotal] = useState(0);

	const addPlayer = function (event) {
		event.preventDefault();
		let playerOption = document.querySelector('input[name="player"]');
		let playerId = playerOption.value;
		let playerVote = Math.floor(Math.random() * 10);
		setPlayer((playersList) => [
			...playersList,
			{
				name: findLabelByValue(options, playerId),
				mf: playerVote,
			},
		]);
		setPtiTotal(ptiTotal + playerVote);
	};

	const onChange = function () {};

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
					title="Calcola potenziale"
					desc="Inserisci i giocatori e scopri il tuo punteggio potenziale"
				/>
				<section className="text-gray-600 body-font">
					<div className="mx-auto container">
						<form
							onSubmit={addPlayer}
							className=" flex justify-center gap-2"
						>
							<Select
								id="playerName"
								name="player"
								placeholder="Giocatore"
								options={options}
								className="w-full max-w-xs"
							/>
							<button className="btn btn-primary">
								Aggiungi Giocatore
							</button>
						</form>
					</div>
					<div className="mx-auto container max-w-xl mt-8">
						<ul>
							{playersList.map((item, i) => {
								return (
									<li
										key={item.name}
										className="flex justify-between border-b py-2"
									>
										<p>{item.name}</p>
										<span>FM {item.mf}</span>
									</li>
								);
							})}
							<li className="flex justify-between border-t pt-2 font-bold">
								<p>Totale</p>
								<span>{ptiTotal}</span>
							</li>
						</ul>
					</div>
				</section>
			</main>
		</div>
	);
}
