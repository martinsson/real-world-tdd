const request = require('supertest-as-promised')
const express = require('express')
const got = require('got')
import {assert, expect} from 'chai';

describe('LeaderBoard', () => {

    it('should display a  leaderboard with the state of all games', async () => {
        const app = express() // this is the start of the actual production code
        // You'll have to change this route and do something sensible in order
        // for the test to pass. Eventually you'll have to move this into "Production" code
        app.get('/foo', (req, res) => {
            res.send('bar')
        })

        let response = await request(app)
            .get('/leaderboard')
            .expect(200)

        expect(1).equal(2) // assert something on the response

    });


});
