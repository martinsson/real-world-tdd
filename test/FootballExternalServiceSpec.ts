import {createEventsApp} from "../src/eventsApp"

const request = require('supertest-as-promised')


describe('FootballExternalService', () => {
    it('sends some football events over http', async () => {
        const app = createEventsApp()


        await request(app)
            .get('/events')
            .expect([
                {type: 'game-start', gameId: 'lyon-marseille'},
                {type: 'goal', gameId: 'lyon-marseille', team: 'lyon'},
                {type: 'goal', gameId: 'lyon-marseille', team: 'marseille'},
                {type: 'game-end', gameId: 'lyon-marseille'},
                {type: 'game-start', gameId: 'paris-monaco'},
            ])

    });

});
