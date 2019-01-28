const request = require('supertest-as-promised')
const express = require('express')

describe('LeaderBoard', () => {
    it('should display a leaderboard with the state of all games', async () => {

        const app = express()
        app.get('/leaderboard', (req, res) => {
            res.send([])
        })
        // [
        // {home: equipeA, visitors: equipeB, score: [0, 1], state: playing}
        // {home: equipeC, visitors: equipeD, score: [0, 0], state: finished}

        await request(app)
            .get('/leaderboard')
            .expect([
                {home: 'lyon', visitors: 'amiens', score: [3, 2], state: 'playing'}
            ])

    });

});
