import {createLeaderBoardApp} from "./LeaderBoard"

const request = require('supertest-as-promised')
const got = require('got')
import { assert, expect } from 'chai';

describe('LeaderBoard', () => {
    it('should display a leaderboard with the state of all games', async () => {
        const app = createLeaderBoardApp()

        // [
        // {home: equipeA, visitors: equipeB, score: [0, 1], state: playing}
        // {home: equipeC, visitors: equipeD, score: [0, 0], state: finished}

        await request(app)
            .get('/leaderboard')
            .expect({board: [
                {home: 'lyon', visitors: 'amiens', score: [3, 2], state: 'playing'}
            ]})

    });



});
