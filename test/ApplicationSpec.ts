import { assert, expect } from 'chai';
import express = require('express');
import request = require('supertest-as-promised');

describe('Application', () => {
    describe('GET /job-list', () => {
        it('returns all jobs corresponding to the given id, one entry per job', async () => {

            let app = express()
            app.get('/job-list/:contextId', (req, res) => {
                res.send([])
            })

            let contextId = 'someId'
            await request(app).get('/job-list/' + contextId)
                .expect(200)
                .expect(response => {
                    expect(response.body).eql([])
                })


        });

    });
});