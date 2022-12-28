import * as mongoDB from 'mongodb'

export class MongoClient {
  mongoClient!: mongoDB.MongoClient
  db!: mongoDB.Db
  collectionCache: {
    [key: string]: mongoDB.Collection<mongoDB.Document>
  } = {}

  async initialize(uri: string, dbName: string) {
    /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
    this.mongoClient = new mongoDB.MongoClient(uri)
    // connect to the MongoDB cluster
    await this.mongoClient.connect()
    this.db = await this.mongoClient.db(dbName)
  }

  getCollection(collection: string): mongoDB.Collection {
    if (!this.collectionCache[collection])
      this.collectionCache[collection] = this.db.collection(collection)

    return this.collectionCache[collection]
  }

  async close() {
    return this.mongoClient.close()
  }
}
