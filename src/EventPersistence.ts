import {MongoClient} from "mongodb"
import {ProgressEvent} from "./ProgressEvent"

export class EventPersistence {
    private readonly mongoUrl: string

    constructor(mongoUrl: string) {
        this.mongoUrl = mongoUrl
    }

    async addEvent(event: any) {
        let collection = await this.getCollection()
        let eventDocument: ProgressEvent = {jobId: event.data.id, progress: 'started'}
        await collection.insertOne(eventDocument)
    }

    async getEvents(): Promise<ProgressEvent[]> {
        let collection = await this.getCollection()
        let events = await collection.find().toArray()
        events.forEach(e => {
            delete e._id
        })
        return events

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
