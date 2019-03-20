
const express = require('express')

type GameEvent = { type: string, gameId: string, team?: string }

let events: GameEvent[] = [
    {type: 'game-start', gameId: 'lyon-marseille'},

    {type: 'game-start', gameId: 'paris-monaco'},
    {type: 'game-end', gameId: 'paris-monaco'},
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
        if (Math.random() < 0.1) {
            res.send(JSON.stringify(results).substr(0, 20))
        } else {
            res.send(results)
        }
    })
    return app
}

export function createEventsApp() {
    scoreGoalRegularly()

    return createRestApp()
}
