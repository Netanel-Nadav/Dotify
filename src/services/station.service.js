const fs = require('fs');
let gStations = require('../../data/station.json')


import {storageService} from './async-storage.service.js'


const STORAGE_KEY = 'station'


export const stationService = {
    query,
    remove,
    save,
    getById,
}


async function query() {
    const stations = await storageService.query(STORAGE_KEY) || gStations
       return stations
}

async function getById(stationId) {
   const station = await storageService.get(STORAGE_KEY, stationId)
   return station
}

async function remove(stationId){
    const removedStation = storageService.remove(STORAGE_KEY, stationId)
    return console.log('Station has Been Removed');
}







function _saveStationssToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/station.json', JSON.stringify(gStations, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!');
                resolve()
            }
        });
    })

}
