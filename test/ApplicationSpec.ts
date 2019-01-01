import {expect} from 'chai';
import {createApplication} from "../src/restApp"
import request = require('supertest-as-promised')


describe('Application', () => {
    describe('GET /job-list', () => {

        let mongoHost = 'mongodb://localhost'
        let {persistence, app} = createApplication(mongoHost)

        // several events for one job => single entry
        describe('returns all jobs corresponding to the given id, one entry per job', () => {
            it('no entries', async () => {
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

                await persistence.deleteAllEvents()
                await persistence.addEvent({type: 'start', data: {id: '1'}})
                await persistence.addEvent({type: 'start', data: {id: '2'}})

                var contextId = "someId"
                await request(app).get('/job-list/' + contextId)
                    .expect(200)
                    .expect(response => {
                        expect(response.body).lengthOf(2)
                        expect(response.body).eql([
                            {jobId: '1', progress: 'started'},
                            {jobId: '2', progress: 'started'}])
                    })

            });

            it('returns only one entry per job-id', async () => {
                await persistence.deleteAllEvents()

                await persistence.addEvent({type: 'start', data: {id: '1'}})
                await persistence.addEvent({type: 'paused', data: {id: '1'}})

                var contextId = "someId"
                await request(app).get('/job-list/' + contextId)
                    .expect(200)
                    .expect(response => {
                        expect(response.body).lengthOf(1)
                    })
            });


        });

    });
});
