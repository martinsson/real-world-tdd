
const express = require('express')

let events = [
    {type: 'game-start', gameId: 'lyon-marseille'},
    {type: 'goal', gameId: 'lyon-marseille', team: 'lyon'},
    {type: 'goal', gameId: 'lyon-marseille', team: 'marseille'},
    {type: 'game-end', gameId: 'lyon-marseille'},

    {type: 'game-start', gameId: 'paris-monaco'},
]
async function getEventsSlowly() {
    await new Promise((resolve) => {
        setTimeout(resolve, 4000)
    })
    return events

}

function scoreGoalRegularly() {
    let tenMinutes = 10 * 60 * 1000
    setInterval(() => {
        events.push({type: 'goal', gameId: 'lyon-marseille', team: 'lyon'})
    }, tenMinutes)
}

function createRestApp() {
    const app = express();
    app.get('/events', async (req, res, next) => {
        let results = await getEventsSlowly()
        res.send(results)
    })
    return app
}

export function createEventsApp() {
    scoreGoalRegularly()

    return createRestApp()
}
