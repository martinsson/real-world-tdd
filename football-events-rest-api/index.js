#!/usr/bin/env node

const { createEventsApp } = require('./FootBallExternalService');
createEventsApp().listen(5010)

console.log("Events Api started on 5010, you can open http://localhost:5010/events in a navigator" +
    " and you'll get the list of events for the day.")
