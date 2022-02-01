
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


async function getStationByGenre(stations, genre) {
    if (!stations) return
    let stationsByGenre = stations.filter(station => station.tags.includes(genre))
    return stationsByGenre
}









