"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
function createEventsApp() {
    const app = express();
    app.get('/events', (req, res, next) => {
        res.send([
            { type: 'game-start', gameId: 'lyon-marseille' },
            { type: 'goal', gameId: 'lyon-marseille', team: 'lyon' },
            { type: 'goal', gameId: 'lyon-marseille', team: 'marseille' },
            { type: 'game-end', gameId: 'lyon-marseille' },
            { type: 'game-start', gameId: 'paris-monaco' },
        ]);
    });
    return app;
}
exports.createEventsApp = createEventsApp;
