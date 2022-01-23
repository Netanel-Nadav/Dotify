import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const gStations = require('../data/station.json')

const stationsGenre = [
    {
        name: 'All',
        imgUrl: '#',
        backgroundColor: '#A239EA'
    },
    {
        name: 'Pop',
        imgUrl: '#',
        backgroundColor: '#8B8B8B'

    },
    {
        name: 'Hip Hop',
        imgUrl: '#',
        backgroundColor: '#77E4D4'
    },
    {
        name: 'Rock',
        imgUrl: '#',
        backgroundColor: '#77D970'
    },
    {
        name: 'Metal',
        imgUrl: '#',
        backgroundColor: '#FF8E00'
    },
    {
        name: 'Jazz',
        imgUrl: '#',
        backgroundColor: '#FF1700'
    }
]


const STORAGE_KEY = 'station'

const debouncedSearch = utilService.debounce(searchYouTube, 500)

export const stationService = {
    query,
    remove,
    update,
    getById,
    makeNewStation,
    formatNewSong,
    getStationsGenre,
    searchYouTube,
    addSongToStation,
    deleteSongFromStation
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
    await storageService.remove(STORAGE_KEY, stationId)
    return console.log('Station has Been Removed');
}

function update(station) {
    return storageService.put(STORAGE_KEY, station)
}

async function addSongToStation(stationId, song) {
    const station = await getById(stationId)
    const editedStation = { ...station }
    const newSong = await formatNewSong(song)
    editedStation.songs = [...editedStation.songs, newSong]
    const updatedStation = await update(editedStation)
    return Promise.resolve(updatedStation)
}

async function deleteSongFromStation(stationId,songId) {
    const station = await getById(stationId)
    const editedStation = { ...station }
    editedStation.songs = editedStation.songs.filter(song => song._id !== songId)
    const updatedStation = await update(editedStation)
    return Promise.resolve(updatedStation)
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
        duration: song.duration,
        addedAt: Date.now(),
        addedAtForShow: utilService.formatTime(),
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
            _id:userService.getLogedinUser()?._id || utilService.makeId() ,
            fullname: userService.getLogedinUser()?.username || 'Guest',
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

async function searchYouTube(q) {
    q = encodeURIComponent(q);
    const response = await fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
            "x-rapidapi-key": '6600944e0amsh06bd5834aeedf3ap12c401jsn549127d55af9'
        }
    });
    const body = await response.json();
    console.log(body);
    const searchRes = {
        songs: body.items.filter(item => item.type === 'video'),
        recommendations: body.refinements
    }
    return searchRes
}








