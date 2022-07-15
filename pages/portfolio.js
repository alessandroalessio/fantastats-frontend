import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"
// import FancyboxImage from '../components/FancyboxImage'

import { Fancybox } from "@fancyapps/ui"
import '@fancyapps/ui/dist/fancybox.css'

Fancybox.bind("[data-fancybox]");



const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // delayChildren: 2,
      staggerChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-16">
        <Hero 
          title="Portfolio"
          desc=""
          btnLabel=""
          btnURL=""
          />

          <section>
            <AnimatePresence>
              <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4"
                >
                  <motion.li><a data-fancybox href="https://picsum.photos/id/238/1200/950"><img src="https://picsum.photos/id/238/600/450" /></a></motion.li>
                  <motion.li><a data-fancybox href="https://picsum.photos/id/239/1200/950"><img src="https://picsum.photos/id/239/600/450" /></a></motion.li>
                  <motion.li><a data-fancybox href="https://picsum.photos/id/240/1200/950"><img src="https://picsum.photos/id/240/600/450" /></a></motion.li>
                  <motion.li><a data-fancybox href="https://picsum.photos/id/241/1200/950"><img src="https://picsum.photos/id/241/600/450" /></a></motion.li>
                  <motion.li><a data-fancybox href="https://picsum.photos/id/242/1200/950"><img src="https://picsum.photos/id/242/600/450" /></a></motion.li>
                  <motion.li><a data-fancybox href="https://picsum.photos/id/243/1200/950"><img src="https://picsum.photos/id/243/600/450" /></a></motion.li>
                  <motion.li><a data-fancybox href="https://picsum.photos/id/244/1200/950"><img src="https://picsum.photos/id/244/600/450" /></a></motion.li>
              </motion.ul>
            </AnimatePresence>
          </section>
      </main>

    </div>
  )
}
