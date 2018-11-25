import { assert, expect } from 'chai';
import express = require('express');
import request = require('supertest-as-promised');

function createApp() {
    let app = express()
    app.get('/job-list/:contextId', (req, res) => {
        res.send([])
    })
    return app
}

let persistence = {
    addEvent(event) {

    }
}

describe('Application', () => {
    describe('GET /job-list', () => {


        // several events for one job => single entry

        describe('returns all jobs corresponding to the given id, one entry per job', () => {
            it('no entries', async () => {
                let app = createApp()

                let contextId = 'someId'
                await request(app).get('/job-list/' + contextId)
                    .expect(200)
                    .expect(response => {
                        expect(response.body).eql([])
                    })
            });
            // several entries
            it('several entries', () => {
                let app = createApp();

                persistence.addEvent({type:'start', data: {id:'1'}})
                persistence.addEvent({type:'start', data: {id:'2'}})
            });

        });

    });
});