import {EventPersistence} from "./EventPersistence"
import {ProgressEvent} from "./ProgressEvent"

export class JobService {

    constructor(private persistence: EventPersistence) {

    }

    async getJobStatus() {
        let events: ProgressEvent[] = await this.persistence.getEvents()
        let jobsList = this.createJobListFrom(events)
        return jobsList
    }

    private createJobListFrom(events: ProgressEvent[]) {
        let jobs: any = {}
        events.forEach(e => {
            if (!jobs[e.jobId]) {
                jobs[e.jobId] = []
            }
            jobs[e.jobId] = {jobId: e.jobId, progress: e.progress}
        })
        let jobsList = Object.values(jobs)
        return jobsList
    }
}
