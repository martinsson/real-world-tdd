import {expect} from 'chai';
import {MongoClient} from 'mongodb'
import express = require('express')
import request = require('supertest-as-promised')

function createApp() {
    let app = express()
    app.get('/job-list/:contextId', async (req, res) => {
        let jobList = await persistence.getEvents()
        res.send(jobList)
    })
    return app
}

class EventPersistence {
    private readonly mongoUrl: string

    constructor(mongoUrl: string) {
        this.mongoUrl = mongoUrl
    }

    async addEvent(event: any) {
        let collection = await this.getCollection()
        await collection.insertOne(event)
    }

    async getEvents() {
        let collection = await this.getCollection()
        return collection.find().toArray()

    }

    async deleteAllEvents() {
        let collection = await this.getCollection()
        return collection.deleteMany({})
    }

    private async getCollection() {
        let client = await MongoClient.connect(this.mongoUrl)
        return client.db('real-world-tdd').collection('rabbitEvents')
    }

}

let persistence = new EventPersistence('mongodb://localhost')


describe('Application', () => {
    describe('GET /job-list', () => {


        // several events for one job => single entry

        describe('returns all jobs corresponding to the given id, one entry per job', () => {
            it('no entries', async () => {
                let app = createApp()
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
                let app = createApp();

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
