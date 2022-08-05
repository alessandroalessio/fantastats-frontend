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
    const res = await fetch('http://admin.fantastats.net/api/v2/player-stats-data/?page=1&perPage=1000')
    const players = await res.json()
    const data = players.data
    const totalRows = players.total

    const dataParsed = []
    data.forEach((element, k) => {
        dataParsed.push({
            'id': k+1,
            'fid': element.fid,
            'name': element.name.replace("'", '´'),
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
                <Link href={"/giocatore/" + row.fid }>
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
        sortable: true,
    },
    {
        name: 'PG',
        selector: row => row.pg,
        center: true,
        sortable: true,
    },
    {
        name: 'MV',
        selector: row => row.mv,
        center: true,
        sortable: true,
    },
    {
        name: 'FM',
        selector: row => row.mf,
        center: true,
        sortable: true,
    },
    {
        name: 'GF',
        selector: row => row.gt,
        center: true,
        sortable: true,
    },
    {
        name: 'GS',
        selector: row => row.gs,
        center: true,
        sortable: true,
    },
    {
        name: 'Ass.',
        selector: row => row.ass,
        center: true,
        sortable: true,
    },
    {
        name: 'Amm.',
        selector: row => row.amm,
        center: true,
        sortable: true,
    },
    {
        name: 'Esp.',
        selector: row => row.esp,
        center: true,
        sortable: true,
    },
    {
        name: 'Dettaglio',
        center: true,
        cell: ( row => (
            <>
                <Link href={"/giocatore/" + row.fid }>
                    <a className="btn btn-sm" target="_blank">
                        Vedi 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </Link>
            </>
        ) )
    }
];


export default function StatsGiocatori(props) {

    const [srcDataTable, setSrcDataTable] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [fullDataTable, setFullDataTable] = useState(props.dataParsed);
	const [roleField, setRoleField] = useState('ALL');
	const [presenceField, setPresenceField] = useState('25%');

    const getSearchFilter = () => {
        setDataTable([])
        let roleFilter = document.querySelectorAll('.roles-filter a.tab-active')[0].dataset.role;
        let presenceFilter = document.querySelectorAll('.presence-filter a.tab-active')[0].dataset.percentile;

        return {
            'role': roleFilter,
            'presence': presenceFilter
        }
    }

    const filterData = ( args ) => {

        var dataTableForSearch = props.dataParsed
        var newDataTable = dataTableForSearch
        const dataTableForOutput = []
        console.log('All:'+newDataTable.length)

        if ( args.role!='ALL' ) {
            newDataTable.forEach( (element, k) => {
                if ( element.role==args.role ) {
                    console.log(args.role)
                    dataTableForOutput.push(element);
                }
            })
            // console.log('Filtered 1:'+dataTableForOutput.length)
            // console.log('Filtered:'+newDataTable.length)
        }


        /**
         * Presence Filter
         */
        if (args.presence!='0%') {
            const tmpDataTableForOutput = dataTableForOutput
            dataTableForOutput = []
             var percentileMatch = 0;
             if ( args.presence=='25%' ) percentileMatch = 38*0.25;
             if ( args.presence=='50%' ) percentileMatch = 38*0.50;
             if ( args.presence=='75%' ) percentileMatch = 38*0.75;
    
            // console.log(percentileMatch)
    
            tmpDataTableForOutput.forEach( (elementPrs, kPrs) => {
                 if ( elementPrs.pg>percentileMatch ) {
                    console.log(args.presence)
                    dataTableForOutput.push(elementPrs);
                 }
             });
            //  console.log('Filtered After Presence:'+dataTableForOutput.length)
            //  console.log(newDataTable)
        }

        //  setDataTable(newDataTable)
        //  console.log('===================')
         return dataTableForOutput

    }

    const handleRole = (role, props) => {
        // UI
        setRoleField(role);
        let rolesBtn = document.querySelectorAll('.roles-filter a');
        rolesBtn.forEach( (item, k) => {
            item.classList.remove("tab-active");
            if ( item.dataset.role==role ) {
                item.classList.add("tab-active");                
            }
        })

        let params = getSearchFilter()
        let filteredData = filterData( params )
        setDataTable(filteredData)
    }

    const presenceStyleAttr = {
        backgroundColor: 'rgba(57, 78, 106, 0.5)',
        cursor: 'pointer',
        color: '#fff',
        padding: '0.25em 1em',
        borderRadius: '1em'
    }
    const presence25 = 38*0.25
    const presence50 = 38*0.5
    const presence75 = 38*0.75

    const handlePresence = ( percentile ) => {
        let presenceBtn = document.querySelectorAll('.presence-filter a');
        // console.log(percentile)
        presenceBtn.forEach( (item, k) => {
            item.style.backgroundColor = 'rgba(57, 78, 106, 0.5)'
            item.classList.remove("tab-active");
            if ( item.dataset.percentile==percentile ) {
                item.style.backgroundColor = 'rgba(57, 78, 106, 0.75)'
                item.classList.add("tab-active");
                setPresenceField(percentile)
            }
        })
        
        let params = getSearchFilter()
        let filteredData = filterData( params )
        setDataTable(filteredData)

    }

    useEffect(() => {
        setDataTable(props.dataParsed)
        // setSrcDataTable(props.dataParsed)
        // setPresenceStyle(presenceStyleAttr)
        handlePresence('0%')
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

                    <div className="filters mb-4">
                        <div className="tabs roles-filter justify-center mb-2">
                            <a className="tab tab-active tab-bordered" data-role="ALL" onClick={ () => { handleRole('ALL') } }>Tutti</a> 
                            <a className="tab tab-bordered" data-role="P" onClick={ () => { handleRole('P') } }>Portieri</a> 
                            <a className="tab tab-bordered" data-role="D" onClick={ () => { handleRole('D') } }>Difensori</a> 
                            <a className="tab tab-bordered" data-role="C" onClick={ () => { handleRole('C') } }>Centrocampisti</a>
                            <a className="tab tab-bordered" data-role="A" onClick={ () => { handleRole('A') } }>Attaccanti</a>
                        </div>
                        {/* <div className="search-filter text-center">
                            <input id="searchField" type="text" placeholder="Quale giocatore stai cercando?" className="input input-bordered w-full max-w-lg" onChange={handleSearch} />
                        </div> */}
                        <div className="presence-filter flex gap-x-4 justify-center text-sm pt-2">
                            <span className="italic opacity-75">Presenze:</span>
                            <ul className="flex gap-x-4">
                                <li><a style={ presenceStyleAttr } data-percentile="0%" onClick={ () => { handlePresence('0%') } }>Non impostato</a></li>
                                <li><a style={ presenceStyleAttr } data-percentile="25%" onClick={ () => { handlePresence('25%') } }>&gt;25%</a></li>
                                <li><a style={ presenceStyleAttr } data-percentile="50%" onClick={ () => { handlePresence('50%') } }>&gt;50%</a></li>
                                <li><a style={ presenceStyleAttr } data-percentile="75%" onClick={ () => { handlePresence('75%') } }>&gt;75%</a></li>
                            </ul>
                        </div>
                    </div>

                    <DataTable
                        pagination
                        paginationPerPage={25}
                        columns={columns}
                        // data={props.dataParsed}
                        data={dataTable}
                    />
                </div>
            </div>

        </main>

        </div>
    )
}
