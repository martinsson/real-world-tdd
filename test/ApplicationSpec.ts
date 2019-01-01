import {expect} from 'chai';
import {EventPersistence} from "../src/EventPersistence"
import express = require('express')
import request = require('supertest-as-promised')

function createApp(persistence: EventPersistence) {
    let app = express()
    app.get('/job-list/:contextId', async (req, res) => {
        let jobList = await persistence.getEvents()
        res.send(jobList)
    })
    return app
}

let persistence = new EventPersistence('mongodb://localhost')


describe('Application', () => {
    describe('GET /job-list', () => {

        // several events for one job => single entry

        describe('returns all jobs corresponding to the given id, one entry per job', () => {
            it('no entries', async () => {
                let app = createApp(persistence)
                await persistence.deleteAllEvents()

                let contextId = 'someId'
                await request(app).get('/job-list/' + contextId)
                    .expect(200)
                    .expect(response => {
                        expect(response.body).eql([])
                    })
            });

            // several entries
            it('several entries', async () => {
                let app = createApp(persistence);

                await persistence.deleteAllEvents()
                await persistence.addEvent({type: 'start', data: {id: '1'}})
                await persistence.addEvent({type: 'start', data: {id: '2'}})

                var contextId = "someId"
                await request(app).get('/job-list/' + contextId)
                    .expect(200)
                    .expect(response => {
                        expect(response.body).lengthOf(2)
                    })

            });

        });

    });
});
