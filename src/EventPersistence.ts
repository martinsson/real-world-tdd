import {MongoClient} from "mongodb"

export class EventPersistence {
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
