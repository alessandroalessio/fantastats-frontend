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
    const res = await fetch('https://api.fantastats.net/api/v2/player-stats-data/?page=1&perPage=1000')
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
            'gxp': element.gxp,
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
        minWidth: '160px',
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
        maxWidth: '25px',
        center: true,
        cell: ( row => (
            <>
                <span className={'role-sm role-' + row.role}>
                    {row.role}
                </span>
            </>
        ) )
    },
    {
        name: 'Sq.',
        selector: row => row.team,
        center: true,
        sortable: true,
        cell: ( row => (
            <>
                <span className={'team-sm team-' + row.team.toLowerCase()}>
                    {row.team}
                </span>
            </>
        ) )
    },
    {
        name: 'PG',
        selector: row => row.pg,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'MV',
        selector: row => row.mv,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'FM',
        selector: row => row.mf,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'GxP',
        selector: row => row.gxp,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'GF',
        selector: row => row.gt,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'GS',
        selector: row => row.gs,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'Ass.',
        selector: row => row.ass,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'Amm.',
        selector: row => row.amm,
        maxWidth: '30px',
        center: true,
        sortable: true,
    },
    {
        name: 'Esp.',
        selector: row => row.esp,
        maxWidth: '30px',
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
        // console.log('All:'+newDataTable.length)

        if ( args.role!='ALL' ) {
            newDataTable.forEach( (element, k) => {
                if ( element.role==args.role ) {
                    // console.log(args.role)
                    dataTableForOutput.push(element);
                }
            })
            // console.log('Filtered 1:'+dataTableForOutput.length)
            // console.log('Filtered:'+newDataTable.length)
        } else {
            newDataTable.forEach( (element, k) => {
                dataTableForOutput.push(element);
            })
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
                    // console.log(args.presence)
                    dataTableForOutput.push(elementPrs);
                 }
             });
            //  console.log('Filtered After Presence:'+dataTableForOutput.length)
            //  console.log(newDataTable)
        }

        /** Filter by Search */
        let searchField = document.getElementById('searchField').value;
        if ( searchField.length>=3 ){
            const tmpDataTableForOutput2 = dataTableForOutput
            dataTableForOutput = []

            tmpDataTableForOutput2.forEach( (elementName, kName) => {
                var strSearch = elementName.name.substring(0, searchField.length)
                // console.log(strSearch.toLowerCase())
                // console.log(searchField.toLowerCase())
                if (  strSearch.toLowerCase()==searchField.toLowerCase() ) {
                    dataTableForOutput.push(elementName);
                }
            });
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

    const handleSearch = () => {   
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
                            <a className="tab tab-active tab-bordered" data-role="ALL" onClick={ () => { handleRole('ALL') } }>
                                <span className="md:hidden">Tutti</span>
                                <span className="hidden md:inline">Tutti</span>
                            </a> 
                            <a className="tab tab-bordered" data-role="P" onClick={ () => { handleRole('P') } }>
                                <span className="md:hidden">P</span>
                                <span className="hidden md:inline">Portieri</span>
                            </a> 
                            <a className="tab tab-bordered" data-role="D" onClick={ () => { handleRole('D') } }>
                                <span className="md:hidden">D</span>
                                <span className="hidden md:inline">Difensori</span>
                            </a> 
                            <a className="tab tab-bordered" data-role="C" onClick={ () => { handleRole('C') } }>
                                <span className="md:hidden">C</span>
                                <span className="hidden md:inline">Centrocampisti</span>
                            </a>
                            <a className="tab tab-bordered" data-role="A" onClick={ () => { handleRole('A') } }>
                                <span className="md:hidden">A</span>
                                <span className="hidden md:inline">Attaccanti</span>
                            </a>
                        </div>
                        {/* <div className="search-filter text-center">
                            <input id="searchField" type="text" placeholder="Quale giocatore stai cercando?" className="input input-bordered w-full max-w-lg" onChange={handleSearch} />
                        </div> */}
                        <div className="presence-filter flex gap-x-4 justify-center text-sm pt-2">
                            <span className="italic opacity-75">Presenze:</span>
                            <ul className="flex gap-x-4">
                                <li><a style={ presenceStyleAttr } data-percentile="0%" onClick={ () => { handlePresence('0%') } }>
                                <span className="md:hidden">-</span>
                                <span className="hidden md:inline">Non impostato</span>
                            </a></li>
                                <li><a style={ presenceStyleAttr } data-percentile="25%" onClick={ () => { handlePresence('25%') } }>&gt;25%</a></li>
                                <li><a style={ presenceStyleAttr } data-percentile="50%" onClick={ () => { handlePresence('50%') } }>&gt;50%</a></li>
                                <li><a style={ presenceStyleAttr } data-percentile="75%" onClick={ () => { handlePresence('75%') } }>&gt;75%</a></li>
                            </ul>
                        </div>
                        <div className="search-filter mt-4 px-10 md:px-0 text-center">
                            <input id="searchField" type="text" placeholder="Quale giocatore stai cercando?" className="input input-bordered w-full max-w-lg" onChange={handleSearch} />
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
