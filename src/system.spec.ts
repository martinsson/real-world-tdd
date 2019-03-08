import express = require("express")
import request from 'supertest'
import {assert, expect} from 'chai';
import fetch from 'node-fetch'

let app = express()
app.get("/get-score", async (req, res) => {
    let response = await fetch('http://localhost:5010/events')
    let responseAsJson = await response.json()
    console.log(responseAsJson)
    res.send(responseAsJson)
})

describe('guiding test', () => {
    it('should create a score table', async () => {
        let {body, status} = await request(app).get("/get-score")
        expect(status).to.be.equal(200)
        //expect(body).to.be.eql([{"home": "Barcelona", "visitor": "Madrid", "score": [0, 1], "state": "in progress"}])
    }).timeout(6000);

});

function stuff(eventData: { gameId: string; type: string }[]) {
    let [home, visitor] = eventData[0].gameId.split("-")
    return [{
        home,
        visitor,
        "score": [0, 0],
        "state": "in progress"
    }]
}

describe('function stuff', () => {
    it('should initiate a game', () => {
        let eventData = [{"type":"game-start","gameId":"lyon-marseille"}]
        var result = stuff(eventData)
        expect(result).to.eql([{
            "home": "lyon",
            "visitor": "marseille",
            "score": [0, 0],
            "state": "in progress"
        }])
    })
});
