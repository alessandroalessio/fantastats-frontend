'use client';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Hero from '../components/Hero';
import Link from 'next/link';
import { useState } from 'react';
import Select from 'react-select';

const commonData = require('../data/common.json');

export async function getStaticProps(context) {
	const res = await fetch(
		'https://api.fantastats.net/api/v2/player-stats-data/?page=1&perPage=1000'
	);
	const players = await res.json();
	const data = players.data;

	const options = [];
	const allPlayers = [];
	data.forEach((element, k) => {
		options.push({
			value: element.fid,
			label: element.name.replace("'", '´'),
		});
		allPlayers[element.fid] = {
			fid: element.fid,
			name: element.name.replace("'", '´'),
			role: element.role,
			mf: element.mf,
		};
	});

	return {
		props: {
			options,
			allPlayers,
		},
	};
}

// const options = [
// 	{ value: 1, label: 'Immobile' },
// 	{ value: 2, label: 'Savicevic' },
// 	{ value: 3, label: 'Vanilla' },
// ];

function findLabelByValue(matrix, searchValue) {
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i].value === parseInt(searchValue)) {
			return matrix[i].label;
		}
	}
	return null; // Restituisce null se il valore non viene trovato nella matrice
}

export default function CalcolaPotenziale({ options, allPlayers }) {
	const [playersList, setPlayer] = useState([]);
	const [ptiTotal, setPtiTotal] = useState(0);
	const [addDisabled, setAddDisabled] = useState('');

	const addPlayer = function (event) {
		event.preventDefault();
		let playerOption = document.querySelector('input[name="player"]');
		let playerId = playerOption.value;
		let playerVote = Math.floor(Math.random() * 10);
		setPlayer((playersList) => [
			...playersList,
			{
				name: findLabelByValue(options, playerId),
				mf: allPlayers[playerId].mf,
				role: allPlayers[playerId].role,
			},
		]);
		let ptiTotalRounded =
			parseFloat(ptiTotal) + parseFloat(allPlayers[playerId].mf);
		setPtiTotal(ptiTotalRounded.toFixed(2));
		if (playersList.length >= 10) {
			setAddDisabled('disabled');
		}
	};

	const handleRemoveItem = (id) => {
		let ptiPlayerRem = playersList.filter((item) => item.name === id);
		let ptiTotalRounded =
			parseFloat(ptiTotal) - parseFloat(ptiPlayerRem[0].mf);
		setPtiTotal(ptiTotalRounded.toFixed(2));
		const updatedList = playersList.filter((item) => item.name !== id);
		setPlayer(updatedList);
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
							<button className="btn btn-primary" disabled={addDisabled}>
								Aggiungi Giocatore
							</button>
						</form>
					</div>
					<div className="mx-auto container max-w-xl mt-8">
						<div className="block text-sm text-center">
							Giocatori {playersList.length}
						</div>
						<ul>
							{playersList.map((item, i) => {
								return (
									<li
										key={item.name}
										className="flex justify-between border-b py-2"
									>
										<p>
											<span
												className={
													'role-sm text-sm mr-2 role-' + item.role
												}
											>
												{item.role}
											</span>
											{item.name}
										</p>
										<span className="flex items-center gap-2">
											FM {item.mf}
											<span
												onClick={() => handleRemoveItem(item.name)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</span>
										</span>
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
