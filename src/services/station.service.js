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
    editedStation.totalDuration = getFullduration(editedStation)
    const updatedStation = await update(editedStation)
    return Promise.resolve(updatedStation)
}

async function deleteSongFromStation(stationId,songId) {
    const station = await getById(stationId)
    const editedStation = { ...station }
    editedStation.songs = editedStation.songs.filter(song => song._id !== songId)
    editedStation.totalDuration = getFullduration(editedStation)
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
        likesCount: utilService.getRandomIntInclusive(300,2000),
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


function getFullduration(station) {
    const {songs} = station

    let durations = songs.map(song => song.duration)
    durations = durations.map(duration => {
      duration = duration.split(':')
      let hour;
      let min;
      let sec;
      if(duration.length ===3) { 
        hour = duration[0]
        min = duration[1]
        sec = duration[2]
      }else {
        hour = 0
        min = duration[0]
        sec = duration[1]
      }
      return [hour,min,sec]
    })
  
    let hours = durations.map(duration => +duration[0])
    let minutes = durations.map(duration => +duration[1])
    let seconds = durations.map(duration => +duration[2])
  
    hours = hours.reduce((a, b) => a + b, 0)
    minutes = minutes.reduce((a, b) => a + b, 0)
    seconds = seconds.reduce((a, b) => a + b, 0)
    
    while(seconds >= 60) {
        minutes ++
        seconds = seconds - 60
    } 
    while(minutes >= 60) {
        hours ++
        minutes = minutes - 60
    }
    const extraHours = Math.floor(minutes/60)
    const extraMin = Math.floor(seconds/60)
  
    let totalTime;

    if(hours + extraHours >= 1 && hours + extraHours < 2) totalTime = `${hours + extraHours} hour, ${minutes + extraMin} minutes and ${seconds % 60} seconds`
    else if (hours + extraHours >= 2) totalTime = `${hours + extraHours} hours, ${minutes + extraMin} minutes and ${seconds % 60} seconds`
    else totalTime = `${minutes + extraMin} minutes and ${seconds % 60} seconds`
  
    return totalTime
  
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








