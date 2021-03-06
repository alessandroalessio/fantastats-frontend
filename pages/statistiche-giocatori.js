import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '../components/Hero'
import Breadcrumbs from '../components/Breadcrumbs'
import DataTable, { createTheme } from 'react-data-table-component';

const commonData = require('../data/common.json')

const perPage = 25;
export async function getStaticProps(context) {
    const res = await fetch('http://admin.fantastats.net/admin/public/api/v2/player-stats-data/?page=1&per_page=1000')
    const players = await res.json()
    const data = players.data
    const totalRows = players.total

    // console.log(data)
    const dataParsed = []
    /// Provare a riparsare i dati con id invece che fid
    data.forEach(element => {
        dataParsed.push({
            'id': element.fid,
            'name': element.name,
            'role': element.role,
            'team': element.team,
            'pg': element.pg,
            'mv': element.mv,
            'mf': element.mf,
            'gf': element.gf,
            'gs': element.gs,
            'rp': element.rp,
            'rc': element.rc,
            'rf': element.rf,
            'rs': element.rs,
            'ass': element.ass,
            'amm': element.amm,
            'esp': element.esp,
            'gt': element.gt,
        })
    });
    console.log(dataParsed)

    return {
      props: {
        dataParsed,
        totalRows
      },
    }
}


const columns = [
    {
        name: 'NOME',
        selector: row => row.name,
        cell: ( row => (
            <>
                <Link href={"/giocatore/" + row.id }>
                    <a>
                        {row.name}
                    </a>
                </Link>
            </>
        ) )
    },
    {
        name: 'R',
        selector: row => row.role,
        center: true,
    },
    {
        name: 'Sq.',
        selector: row => row.team,
        center: true,
    },
    {
        name: 'PG',
        selector: row => row.pg,
        center: true,
        // sortable: true,
    },
    {
        name: 'MV',
        selector: row => row.mv,
        center: true,
        // sortable: true,
    },
    {
        name: 'FM',
        selector: row => row.mf,
        center: true,
        // sortable: true,
    },
    {
        name: 'GF',
        selector: row => row.gt,
        center: true,
        // sortable: true,
    },
    {
        name: 'GS',
        selector: row => row.gs,
        center: true,
        // sortable: true,
    },
    {
        name: 'Ass.',
        selector: row => row.ass,
        center: true,
        // sortable: true,
    },
    {
        name: 'Amm.',
        selector: row => row.amm,
        center: true,
        // sortable: true,
    },
    {
        name: 'Esp.',
        selector: row => row.esp,
        center: true,
        // sortable: true,
    },
    // {
    //     name: 'Dettaglio',
    //     center: true,
    //     cell: ( row => (
    //         <>
    //             <Link href={"/giocatore/" + row.fid }>
    //                 <a className="btn btn-sm">
    //                     Vedi 
    //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    //                         <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    //                     </svg>
    //                 </a>
    //             </Link>
    //         </>
    //     ) )
    // }
];

// https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page

export default function StatsGiocatori(props) {

    const [dataTable, setDataTable] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(25);
	const [roleField, setRoleField] = useState('ALL');

    useEffect(() => {
		// fetchUsers(1); // fetch page 1 of users
        // setDataTable(props.data)
	}, []);

    return (
        <div>
        <Head>
            <title>Statistiche Giocatori Fantacalcio | {commonData.SiteName}</title>
            <meta name="description" content="Analisi di dati statistici dei giocatori di Serie A negli ultimi anni" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="pt-16">
            <Hero
                title="Statistiche giocatori Fantacalcio"
                desc="Analisi di dati statistici dei giocatori di Serie A negli ultimi anni"
                />

            <div className="container mx-auto px-4 pb-4">
                <div className="overflow-x-auto">

                    {/* <div className="filters mb-4">
                        <div className="tabs roles-filter justify-center mb-2">
                            <a className="tab tab-active tab-bordered" data-role="ALL" onClick={ () => { handleRole('ALL') } }>Tutti</a> 
                            <a className="tab tab-bordered" data-role="P" onClick={ () => { handleRole('P') } }>Portieri</a> 
                            <a className="tab tab-bordered" data-role="D" onClick={ () => { handleRole('D') } }>Difensori</a> 
                            <a className="tab tab-bordered" data-role="C" onClick={ () => { handleRole('C') } }>Centrocampisti</a>
                            <a className="tab tab-bordered" data-role="A" onClick={ () => { handleRole('A') } }>Attaccanti</a>
                        </div>
                        <div className="search-filter text-center">
                            <input id="searchField" type="text" placeholder="Quale giocatore stai cercando?" className="input input-bordered w-full max-w-lg" onChange={handleSearch} />
                        </div>
                    </div> */}

                    <DataTable
                        // pagination
                        paginationPerPage={25}
                        columns={columns}
                        data={props.dataParsed}
                    />
                </div>
            </div>

            {/* <div className="px-4 pb-4">
                <div className="overflow-x-auto">

                    <div className="filters mb-4">
                        <div className="tabs roles-filter justify-center mb-2">
                            <a className="tab tab-active tab-bordered" data-role="ALL" onClick={ () => { handleRole('ALL') } }>Tutti</a> 
                            <a className="tab tab-bordered" data-role="P" onClick={ () => { handleRole('P') } }>Portieri</a> 
                            <a className="tab tab-bordered" data-role="D" onClick={ () => { handleRole('D') } }>Difensori</a> 
                            <a className="tab tab-bordered" data-role="C" onClick={ () => { handleRole('C') } }>Centrocampisti</a>
                            <a className="tab tab-bordered" data-role="A" onClick={ () => { handleRole('A') } }>Attaccanti</a>
                        </div>
                        <div className="search-filter text-center">
                            <input id="searchField" type="text" placeholder="Quale giocatore stai cercando?" className="input input-bordered w-full max-w-lg" onChange={handleSearch} />
                        </div>
                    </div>


                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th><div className="cursor-pointer tooltip tooltip-right z-40" data-tip="Ruolo">R</div></th>
                            <th><div className="cursor-pointer tooltip tooltip-right z-40" data-tip="Squadra">Sq.</div></th>
                            <th><div className="cursor-pointer tooltip tooltip-right z-50" data-tip="Partite medie giocate in un anno">PG</div></th>
                            <th><div className="cursor-pointer tooltip tooltip-right z-40" data-tip="Media voto">MV</div></th>
                            <th><div className="cursor-pointer tooltip tooltip-right z-30" data-tip="Fanta Media Voto">FM</div></th>
                            <th className="text-center"><div className="cursor-pointer tooltip tooltip-right z-20">Dettaglio</div></th>
                        </tr>
                        </thead>
                        <tbody>
                            {props.data.map(function (player) {
                                return (
                                    <>
                                    <tr>
                                        <td>
                                            <Link href={"/giocatore/" + player.fid }>
                                                <a>
                                                    {player.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td>{player.role}</td>
                                        <td>{player.team}</td>
                                        <td>{player.pg}</td>
                                        <td>{player.mv.toFixed(2)}</td>
                                        <td>{player.mf.toFixed(2)}</td>
                                        <td className="text-center">
                                            <Link href={'/giocatore/' + player.fid}>
                                                <a className="btn btn-sm">
                                                    Vedi 
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div> */}

        </main>

        </div>
    )
}
