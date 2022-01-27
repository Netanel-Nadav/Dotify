
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import {httpService} from './http.service'


const gStations = require('../data/station.json')


const STORAGE_KEY = 'station'

const debouncedSearch = utilService.debounce(searchYouTube, 500)

export const stationService = {
    query,
    remove,
    getById,
    getStationsGenre,
    searchYouTube,
    addSongToStation,
    save,
    getStationByGenre
}




async function addSongToStation(station, song) {
    song.addedBy = {
        _id: userService.getLogedinUser()?._id || utilService.makeId(),
        fullname: userService.getLogedinUser()?.username || 'Guest',
        imgUrl: userService.getLogedinUser()?.imgUrl || '#'
    }
    const updatedStation = await save(station,song)
    return Promise.resolve(updatedStation)
}


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
            "x-rapidapi-key": 'b96f369518msh9ee702858af51c3p17b02ajsn51c6ed765bf1'
        }
    });
    const body = await response.json();
    const searchRes = {
        songs: body.items.filter(item => item.type === 'video'),
        recommendations: body.refinements
    }
    return searchRes
}


async function getStationByGenre(stations,genre) {
    if(!stations) return
    let stationsByGenre = stations.filter(station => station.tags.includes(genre))
    stationsByGenre = _shuffleStations(stationsByGenre)
    return stationsByGenre
}

function _shuffleStations(stations) {
    const shuffledStations = stations.slice()
    for (let i = shuffledStations.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffledStations[i], shuffledStations[rand]] = [shuffledStations[rand], shuffledStations[i]];
    }
    return shuffledStations
};


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





