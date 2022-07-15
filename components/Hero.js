import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"

function Hero(props) {
    let desc = ( props.desc!="" ) ? '<p className="mt-5">' + props.desc + '</div>' : ''
    let btn = ( props.btnURL!="" && props.btnLabel ) ? '<Link href=' +  props.btnURL + '><a className="btn capitalize mt-5 mb-5">' + props.btnLabel + '</a></Link>' : ''
    
    
    let heroWrapClasses = ''
    let heroOverlayClasses = 'hero-overlay bg-opacity-60'
    if ( props.fullHeight=='true' ) {
        heroWrapClasses = 'flex w-full items-center h-screen'
        heroOverlayClasses += ' rounded-md'
    }

    return(
        <>
        <AnimatePresence>
            <motion.div 
                exit={{ opacity: 0, y: -10 }} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                >
                <div className={heroWrapClasses}>
                    <div className="text-center m-auto">
                        <div className="hero rounded-md">
                            <div className={heroOverlayClasses}></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="w-full p-8">
                                    <h1 className="text-3xl">{ props.title }</h1>
                                    {props.desc}
                                    {props.btn}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
        </>
    )
}

export default Hero