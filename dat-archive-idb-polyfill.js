// Setup storage to indexdb
const DefaultManager = DatArchive.DefaultManager
class PersistantManager extends DefaultManager {
    constructor () {
        // super('http://gateway.mauve.moe:3000')
        // super()
        super('http://127.0.0.1:3000')
    }

    getStorage (key) {
        return randomAccessIdb(`dat://${key}/`)
    }

    queryStorage() {
        return 'idb'
    }
}

// Only patch global if it doesn't exist
// Makes this a polyfill!
// if (!window.DatArchive) {
    DatArchive.setManager(new PersistantManager())
    window.DatArchive = DatArchive
// }