import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const commonData = require('../../data/common.json')

export async function getStaticPaths() {
    const res = await fetch('https://admin.fantastats.net/api/v2/player-stats-data?perPage=1000')
    const players = await res.json()
    // console.log(players.data)

    const paths = players.data.map(item => {
        if ( item.fid ) {
            return{
                params: {
                    id: `${item.fid}`
                }
            }
        }
    })

    // console.log(paths)

    return {
      paths: paths,
      fallback: 'blocking' // false or 'blocking'
    };
}

export async function getStaticProps(context) {

    const { params } = context

    const res = await fetch('https://admin.fantastats.net/api/v2/player-stats-data?id=' + params.id)
    const player = await res.json()

    const resData = await fetch('https://admin.fantastats.net/api/v2/single-player-stats-data/' + params.id)
    const playerStats = await resData.json()

    // Manipulate Yearly Data
    const labelYears = [];
    const valueMv = [];
    const valueFM = [];
    const valueGol = [];
    const valueAssist = [];
    const valuePresence = [];
    playerStats.forEach(element => {
        labelYears.push(element.year + ' - ' + element.team)
        valueMv.push(element.mv)
        valueFM.push(element.mf)
        valueGol.push(element.gt)
        valueAssist.push(element.ass)
        valuePresence.push(element.pg)
    });
    // console.log(player)
    // console.log(playerStats) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(labelYears) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(valueFM) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(valueGol) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(valueAssist) // Non lo vedi nella console ma nel CMD dove esegui next

    return {
        props: {
            playerData: player.data[0],
            statsForCharts: {
                'labelYears': labelYears.reverse(),
                'valueMv': valueMv.reverse(),
                'valueFM': valueFM.reverse(),
                'valueGol': valueGol.reverse(),
                'valueAssist': valueAssist.reverse(),
                'valuePresence': valuePresence.reverse(),
            }
        }
    }
}


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Andamento annuale',
      },
    },
  };
  

function StatsGiocatoriSingle(props) {

    const router = useRouter();
    const fId = router.query.id

    const roleExtended = []
    roleExtended['P'] = 'Portiere'
    roleExtended['D'] = 'Difensore'
    roleExtended['C'] = 'Centrocampista'
    roleExtended['A'] = 'Attaccante'
  
    const labels = props.statsForCharts.labelYears;
    // const labels = [ '2019-21', '2020', '2021' ]
    const dataForChart = {
        labels,
        datasets: [
          {
            label: 'Media',
            data: props.statsForCharts.valueMv,
            borderColor: 'rgb(50, 125, 168)',
            backgroundColor: 'rgba(50, 125, 168, 0.5)',
          },
          {
            label: 'Fanta Media',
            data: props.statsForCharts.valueFM,
            borderColor: 'rgb(57,78,106)',
            backgroundColor: 'rgba(57,78,106, 0.5)',
          },
          {
            label: 'Goal',
            data: props.statsForCharts.valueGol,
            borderColor: 'rgb(193, 73, 173)',
            backgroundColor: 'rgba(193, 73, 173, 0.5)',
          },
          {
            label: 'Assist',
            data: props.statsForCharts.valueAssist,
            borderColor: 'rgb(70, 58, 161)',
            backgroundColor: 'rgba(70, 58, 161, 0.5)',
          },
          {
            label: 'Presenze',
            data: props.statsForCharts.valuePresence,
            borderColor: 'rgb(147, 230, 251)',
            backgroundColor: 'rgba(147, 230, 251, 0.5)',
          },
        ],
    };

    // https://react-chartjs-2.js.org/examples/line-chart

    return (
        <div>
        <Head>
            <title>Statistiche Fantacalcio {props.playerData.name} | {commonData.SiteName}</title>
            <meta name="description" content={ 'Statistiche per il fantacalcio di' + props.playerData.name } />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="pt-16">

            <div className="m-auto mt-4">
                <div className="hero rounded-md">
                    <div className="hero-content text-center">
                        <div className="w-full p-8">
                            <span className="text-xs block mb-5">
                                <Link href="/statistiche-giocatori">
                                    <a className="inline-flex items-center opacity-75 hover:opacity-100 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        <span className="ml-2">Tutti i giocatori</span>
                                    </a>
                                </Link>
                            </span>
                            <h1 className="text-3xl color-secondary-focus font-bold">{ props.playerData.name}</h1>
                            {/* <div className="rating">
                                <input type="radio" name="rating-1" className="mask mask-star" />
                                <input type="radio" name="rating-1" className="mask mask-star" checked />
                                <input type="radio" name="rating-1" className="mask mask-star" />
                                <input type="radio" name="rating-1" className="mask mask-star" />
                                <input type="radio" name="rating-1" className="mask mask-star" />
                            </div> */}
                            <div className="uppercase leading-4 tracking-wide mt-2 text-sm">
                                Ruolo: <strong>{ roleExtended[ props.playerData.role ] }</strong> <span className="mx-2">→</span> Squadra: <strong>{ props.playerData.team }</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="w-full text-center">
                <div className="stats shadow hidden sm:inline-grid">
                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Fanta Media</div>
                        <div className="stat-value text-accent">{ props.playerData.mf }</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Media Voto</div>
                        <div className="stat-value text-secondary">{ props.playerData.mv }</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Partite giocate</div>
                        <div className="stat-value">{ props.playerData.pg }</div>
                        {/* <div className="stat-desc text-secondary">31 tasks remaining</div> */}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-4">
                    <Line options={options} data={dataForChart} />
                </div>
            </section>

        </main>

        </div>
    )
}


export default StatsGiocatoriSingle