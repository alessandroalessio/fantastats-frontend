/**
 * Rate Limiter
 */
export async function avoidRateLimit() {
    // if (process.env.NODE_ENV === 'production') {
        await sleep()
    // }
}
  
function sleep(ms = 500) {
    return new Promise((res) => setTimeout(res, ms))
}

/**
 * Get geneal Player Info
 */
export async function getPlayerInfo(playerId) {
    await avoidRateLimit(500)
    const res = await fetch('https://api.fantastats.net/api/v2/player-stats-data?id=' + playerId)
    const data = await res.json()
    return data.data[0]
}

/**
 * Get stat Player for every Year
 */

 export async function getPlayerStatsYearly(playerId) {
    await avoidRateLimit(1000)
    const labelYears = [];
    const valueMv = [];
    const valueFM = [];
    const valueGol = [];
    const valueAssist = [];
    const valueAmm = [];
    const valueEsp = [];
    const valuePresence = [];

    const res = await fetch('https://api.fantastats.net/api/v2/single-player-stats-data/' + playerId)
    const playerStats = await res.json()
    
    playerStats.forEach(element => {
        labelYears.push(element.year + ' - ' + element.team)
        valueMv.push(element.mv)
        valueFM.push(element.mf)
        valueGol.push(element.gt)
        valueAssist.push(element.ass)
        valueAmm.push(element.amm)
        valueEsp.push(element.esp)
        valuePresence.push(element.pg)
    });
    
    // console.log(playerStats) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(labelYears) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(valueFM) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(valueGol) // Non lo vedi nella console ma nel CMD dove esegui next
    // console.log(valueAssist) // Non lo vedi nella console ma nel CMD dove esegui next

    
    return {
        'labelYears': labelYears.reverse(),
        'valueMv': valueMv.reverse(),
        'valueFM': valueFM.reverse(),
        'valueGol': valueGol.reverse(),
        'valueAssist': valueAssist.reverse(),
        'valueAmm': valueAmm.reverse(),
        'valueEsp': valueEsp.reverse(),
        'valuePresence': valuePresence.reverse(),
    }
}
