const commonData = require('../data/common.json')

function Footer(){
    return(
        <>
            <div className="w-full text-center p-8 mt-4 text-xs">
                <span className="block"><strong>{commonData.SiteName}</strong> - <i>{commonData.Slogan}</i></span>
            </div>
        </>
    )
}

export default Footer