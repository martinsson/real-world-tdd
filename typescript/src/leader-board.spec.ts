import express from "express"
import {assert, expect} from 'chai';
import request from "supertest-as-promised"
import got from "got"

describe('LeaderBoard', () => {

    it('should display a  leaderboard with  the state of all games', async () => {
        const app = express() // this is the start of the actual production code
        // You'll have to change this route and do something sensible in order
        // for the test to pass. Eventually you'll have to move this into "Production" code
        app.get('/foo', (req, res) => {
            res.send('bar')
        })

        let {status, body} = await request(app).get('/leaderboard')

        expect(status).eq(200)
        // then assert something on the response body

    }).timeout(6000);


});
