import Head from 'next/head'
import { useRouter } from 'next/router'

const commonData = require('../../data/common.json')

export async function getStaticPaths() {
    const res = await fetch('http://admin.fantastats.net/admin/public/api/v2/player-stats-data?limit=50')
    const players = await res.json()
    // console.log(players.data)

    const paths = players.data.map(item => {
        return{
            params: {
                id: `${item.fid}`
            }
        }
    })

    return {
      paths: paths,
      fallback: 'blocking' // false or 'blocking'
    };
}

export async function getStaticProps(context) {

    const { params } = context

    const res = await fetch('http://admin.fantastats.net/admin/public/api/v2/player-stats-data?id=' + params.id)
    const player = await res.json()

    const resData = await fetch('http://admin.fantastats.net/admin/public/api/v2/single-player-stats-data/' + params.id)
    const playerStats = await resData.json()

    // Manipulate Yearly Data
    const labelYears = [];
    playerStats.forEach(element => {
        labelYears.push(element.year)
    });
    // console.log(player)
    // console.log(playerStats) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(labelYears) // Non lo vedi nella console ma nel CMD dove esegui next

    return {
        props: {
            playerData: player.data[0]
        }
    }
}

function StatsGiocatoriSingle(props) {

    const router = useRouter();
    const fId = router.query.id

    const roleExtended = []
    roleExtended['P'] = 'Portiere'
    roleExtended['D'] = 'Difensore'
    roleExtended['C'] = 'Centrocampista'
    roleExtended['A'] = 'Attaccante'

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
                <div className="stats shadow">
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
                        <div className="stat-value">{ props.playerData.mv }</div>
                        {/* <div className="stat-desc text-secondary">31 tasks remaining</div> */}
                    </div>
                </div>
            </section>

        </main>

        </div>
    )
}


export default StatsGiocatoriSingle