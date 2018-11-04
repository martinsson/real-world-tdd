import * as r from 'amqplib';
import request = require('supertest-as-promised');
import express = require('express');
import { assert, expect } from 'chai';

describe('Application', () => {
    describe('GET /job-list', () => {
        it('lists all jobs regarding the given context, one entry per job', async () => {
            // given
            // single job, single event of type waiting

            let app = express()
            let connection = await r.connect('localhost')
            let channel = await connection.createChannel()
            await channel.assertQueue('events')
            let eventAsBuffer = Buffer.from(JSON.stringify({contextId: 123, type: 'waiting'}))
            channel.sendToQueue('events', eventAsBuffer)

            // when
            // we ask for the job-list
            var contextId = 'someId'
            const result = await request(app).get('localhost/job-list/' + contextId)

            // then
            // it should contain one job, in wating status
            expect(result).lengthOf(1)
        });


    });
});