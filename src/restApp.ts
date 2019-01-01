import {EventPersistence} from "./EventPersistence"
import {JobService} from "./JobService"
import express = require('express')


export function createApplication(mongoHost: string) {
    let persistence = new EventPersistence(mongoHost)
    let jobService = new JobService(persistence)
    let app = express()

    app.get('/job-list/:contextId', async (req, res) => {
        let jobsList = await jobService.getJobStatus()
        res.send(jobsList)
    })
    return {persistence, app}
}
