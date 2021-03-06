import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chi sono</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-16">
        <Hero 
          title="Chi sono"
          desc=""
          btnLabel=""
          btnURL=""
          />
        <div className="text-center container m-auto flex align-middle mt-4">
            <div className="avatar w-1/4">
              <div className="w-64 mask mask-triangle">
                  <img src="https://api.lorem.space/image/face?hash=60857" />
              </div>
            </div>
            <div className="w-3/4 text-left p-4">
                <h2 className="text-3xl font-bold">Simone</h2>
                <p className="uppercase mb-4 tracking-widest">Painter, Designer</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adip inc.
                  Lorem ipsum dolor sit amet, consectetur adip inc.
                  Lorem ipsum dolor sit amet, consectetur adip inc.
                  Lorem ipsum dolor sit amet, consectetur adip inc.
                </p>
            </div>
        </div>
      </main>

    </div>
  )
}
