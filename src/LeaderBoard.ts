const express = require('express')
const got = require('got')

export function createLeaderBoardApp() {
    const app = express()
    app.get('/leaderboard', async (req, res) => {
        let leaderBoard = [{home: 'lyon', visitors: 'amiens', score: [3, 2], state: 'playing'}]
        let backendresponse = await got('http://localhost:5010/events')

        let body = JSON.parse(backendresponse.body)
        res.send({board: body})
    })
    return app
}
