import { storageService } from './async-storage.service.js'


const gStations = require('../data/station.json')

const stationsGenre = [
    {
        name: 'All',
        imgUrl: '#'
    },
    {
        name: 'Pop',
        imgUrl: '#'
    },
    {
        name: 'Hip Hop',
        imgUrl: '#'
    },
    {
        name: 'Rock',
        imgUrl: '#'
    },
    {
        name: 'Metal',
        imgUrl: '#'
    },
    {
        name: 'Jazz',
        imgUrl: '#'
    }
]


const STORAGE_KEY = 'station'


export const stationService = {
    query,
    remove,
    update,
    getById,
    makeNewStation,
    formatNewSong,
    getStationsGenre
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

function update(station) {
    return storageService.put(STORAGE_KEY, station)
}

function getStationsGenre() { 
    return Promise.resolve(stationsGenre)
}

function formatNewSong(song) {
    const newSong = {
        _id: song.id,
        title: song.title,
        url: song.url,
        imgUrl: song.bestThumbnail.url,
        addedBy: {
            _id: 'a1',
            fullname: 'Sahar Gar Onne',
            imgUrl: '#'
        },
        addedAt: Date.now(),
        likesCount: 0
    }
    return Promise.resolve(newSong)
}

function makeNewStation() {
    let station = {
        name: 'New Playlist',
        imgUrl: null,
        likesCount: 0,
        tags: 'Rock',
        createdAt: Date.now(),
        createdBy: {
            _id: 'a1',
            fullname: 'Sahar Gar Onne',
            imgUrl: '#'
        },
        likedByUsers: [
            {
                _id: 'a2',
                fullname: 'Netanel Nadav',
                imgUrl: '#'
            }
        ],
        songs: []
    }
    station = storageService.post(STORAGE_KEY, station)
    return Promise.resolve(station)
}





