
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import {httpService} from './http.service'


const gStations = require('../data/station.json')

// const stationsGenre = [
//     {
//         name: 'All',
//         imgUrl: '#',
//         backgroundColor: '#A239EA'
//     },
//     {
//         name: 'Pop',
//         imgUrl: '#',
//         backgroundColor: '#8B8B8B'

//     },
//     {
//         name: 'Hip Hop',
//         imgUrl: '#',
//         backgroundColor: '#77E4D4'
//     },
//     {
//         name: 'Rock',
//         imgUrl: '#',
//         backgroundColor: '#77D970'
//     },
//     {
//         name: 'Metal',
//         imgUrl: '#',
//         backgroundColor: '#FF8E00'
//     },
//     {
//         name: 'Jazz',
//         imgUrl: '#',
//         backgroundColor: '#FF1700'
//     }
// ]


const STORAGE_KEY = 'station'

const debouncedSearch = utilService.debounce(searchYouTube, 500)

export const stationService = {
    query,
    remove,
    // update,
    getById,
    // makeNewStation,
    // formatNewSong,
    getStationsGenre,
    searchYouTube,
    addSongToStation,
    // deleteSongFromStation,
    save
}


// async function query() {
//     let stations = await storageService.query(STORAGE_KEY)
//     if (!stations) {
//         storageService._save(STORAGE_KEY, gStations)
//         return gStations
//     }
//     return stations
// }

// async function getById(stationId) {
//     const station = await storageService.get(STORAGE_KEY, stationId)
//     return station
// }

// async function remove(stationId) {
//     await storageService.remove(STORAGE_KEY, stationId)
//     return console.log('Station has Been Removed');
// }

// function update(station) {
//     return storageService.put(STORAGE_KEY, station)
// }

async function addSongToStation(station, song) {
    // const editedStation = { ...station }
    // const newSong = await formatNewSong(song)
    song.addedBy = {
        _id: userService.getLogedinUser()?._id || utilService.makeId(),
        fullname: userService.getLogedinUser()?.username || 'Guest',
        imgUrl: userService.getLogedinUser()?.imgUrl || '#'
    }
    // editedStation.songs = [...editedStation.songs, song]
    // editedStation.totalDuration = getFullduration(editedStation)
    // const updatedStation = await update(editedStation)
    console.log('station',station)
    const updatedStation = await save(station,song)
    return Promise.resolve(updatedStation)
}

// async function deleteSongFromStation(station, songId) {
//     const editedStation = { ...station }
//     editedStation.songs = editedStation.songs.filter(song => song._id !== songId)
//     station.totalDuration = getFullduration(station)
//     const updatedStation = await save(station, null, songId)
//     const updatedStation = await update(editedStation)
//     return Promise.resolve(updatedStation)
// }


function query() {
    return httpService.get('station/')
}

function save(station, song = null, songId = null) {
    if(!station._id){
        station.createdBy = {
            _id: userService.getLogedinUser()?._id || utilService.makeId(),
            fullname: userService.getLogedinUser()?.username || 'Guest',
            imgUrl: '#'
        }
        return httpService.post('station/', station)
    }
    else {
        return httpService.put('station/', {station, song, songId})
    } 
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

function remove(stationId){
    return httpService.remove(`station/${stationId}`)
}


function getStationsGenre() {
    return httpService.get('station/genres')
}


async function searchYouTube(q) {
    q = encodeURIComponent(q);
    const response = await fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
            "x-rapidapi-key": '6f5320ed11msh859c70eb983b0edp158967jsnc3a93be7fd34'
        }
    });
    const body = await response.json();
    const searchRes = {
        songs: body.items.filter(item => item.type === 'video'),
        recommendations: body.refinements
    }
    return searchRes
}


// function formatNewSong(song) {
//     const newSong = {
//         _id: song.id,
//         title: song.title,
//         url: song.url,
//         imgUrl: song.bestThumbnail.url,
//         addedBy: {
//             _id: userService.getLogedinUser()?._id || utilService.makeId(),
//             fullname: userService.getLogedinUser()?.username || 'Guest',
//             imgUrl: '#'
//         },
//         duration: song.duration,
//         addedAt: Date.now(),
//         likesCount: 0
//     }
//     return Promise.resolve(newSong)
// }

// function makeNewStation() {
//     let station = {
//         name: 'New Playlist',
//         imgUrl: null,
//         likesCount: utilService.getRandomIntInclusive(300, 2000),
//         tags: 'Rock',
//         createdAt: Date.now(),
//         createdBy: {
//             _id: userService.getLogedinUser()?._id || utilService.makeId(),
//             fullname: userService.getLogedinUser()?.username || 'Guest',
//             imgUrl: '#'
//         },
//         likedByUsers: [
//             {
//                 _id: 'a2',
//                 fullname: 'Netanel Nadav',
//                 imgUrl: '#'
//             }
//         ],
//         songs: [],
//         backgroundColor: '#e6e6e64b'
//     }
//     station = storageService.post(STORAGE_KEY, station)
//     return Promise.resolve(station)
// }

// function getFullduration(station) {
//     const { songs } = station

//     let durations = songs.map(song => song.duration)
//     durations = durations.map(duration => {
//         duration = duration.split(':')
//         let hour;
//         let min;
//         let sec;
//         if (duration.length === 3) {
//             hour = duration[0]
//             min = duration[1]
//             sec = duration[2]
//         } else {
//             hour = 0
//             min = duration[0]
//             sec = duration[1]
//         }
//         return [hour, min, sec]
//     })

//     let hours = durations.map(duration => +duration[0])
//     let minutes = durations.map(duration => +duration[1])
//     let seconds = durations.map(duration => +duration[2])

//     hours = hours.reduce((a, b) => a + b, 0)
//     minutes = minutes.reduce((a, b) => a + b, 0)
//     seconds = seconds.reduce((a, b) => a + b, 0)

//     while (seconds >= 60) {
//         minutes++
//         seconds -= 60
//     }
//     while (minutes >= 60) {
//         hours++
//         minutes -= 60
//     }
//     const extraHours = Math.floor(minutes / 60)
//     const extraMin = Math.floor(seconds / 60)

//     let totalTime;

//     if (hours + extraHours >= 1 && hours + extraHours < 2) totalTime = `${hours + extraHours} hour, ${minutes + extraMin} minutes and ${seconds % 60} seconds`
//     else if (hours + extraHours >= 2) totalTime = `${hours + extraHours} hours, ${minutes + extraMin} minutes and ${seconds % 60} seconds`
//     else totalTime = `${minutes + extraMin} minutes and ${seconds % 60} seconds`

//     return totalTime

// }





