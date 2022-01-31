
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service'




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
    const updatedStation = await save(station, song)
    return Promise.resolve(updatedStation)
}


async function query() {
    return httpService.get('station/')
}

function save(station, song = null, songId = null) {
    if (!station._id) {
        station.createdBy = {
            _id: userService.getLogedinUser()?._id || utilService.makeId(),
            fullname: userService.getLogedinUser()?.fullname || 'Guest',
            imgUrl: '#'
        }
        return httpService.post('station/', station)
    }
    else {
        return httpService.put('station/', { station, song, songId })
    }
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

function remove(stationId) {
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
            "x-rapidapi-key": '45b8fe1454msh8ced5fc6319b729p107c5bjsne585d331b323'
        }
    });
    const body = await response.json();
    // console.log(body)
    const searchRes = {
        songs: body.items.filter(item => item.type === 'video' && !item.title.toLowerCase().includes('full','album')),
        recommendations: body.refinements
    }
    return searchRes
}


async function getStationByGenre(stations, genre) {
    if (!stations) return
    let stationsByGenre = stations.filter(station => station.tags.includes(genre))
    // stationsByGenre = _shuffleStations(stationsByGenre)
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








