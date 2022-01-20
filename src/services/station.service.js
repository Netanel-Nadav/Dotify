import { storageService } from './async-storage.service.js'


const gStations = require('../data/station.json')




const STORAGE_KEY = 'station'


export const stationService = {
    query,
    remove,
    save,
    getById,
}


async function query() {
    let stations = await storageService.query(STORAGE_KEY)
    if (!stations) {
        storageService._save(STORAGE_KEY, gStations)
        return gStations
    }
    return stations
}

async function getById(stationId) {
    const station = await storageService.get(STORAGE_KEY, stationId)
    return station
}

async function remove(stationId) {
    const removedStation = storageService.remove(STORAGE_KEY, stationId)
    return console.log('Station has Been Removed');
}

function save(station) {
    if (station._id) {
        return storageService.put(STORAGE_KEY, station)
    } else {
        return storageService.post(STORAGE_KEY, station)
    }
}





