import React from 'react'

import { stationService } from '../services/station.service';

export class CreateStation extends React.Component {

    state = {
        newStation: null,
        query: '',
        list: null
    }

    search = async (ev) => {
        ev.preventDefault()
        this.setState({query: ev.target.value })
        const list = await this.searchYouTube(this.state.query)
        this.setState({list})
    }

    onAddSong = async (song) => {
        if (!this.state.newStation) await this.onMakeNewStation()
        const {newStation} = this.state
        const stationToEdit = { ...newStation }
        const newSong = await stationService.formatNewSong(song)
        stationToEdit.songs = [...stationToEdit.songs, newSong]
        console.log(stationToEdit)
        const savedStation = await stationService.update(stationToEdit)
        this.setState({newStation: savedStation})
    }

    onMakeNewStation = async () => {
        const newStation = await stationService.makeNewStation()
        this.setState({newStation})
        return Promise.resolve()
    }


    searchYouTube = async (q) => {
        q = encodeURIComponent(q);
        const response = await fetch("https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
                "x-rapidapi-key": '45b8fe1454msh8ced5fc6319b729p107c5bjsne585d331b323'
            }
        });
        const body = await response.json();
        // console.log(body);
        return body.items.filter(item => item.type === 'video');
    }



    render () {
        const {newStation, list, query} = this.state
        return (
            <section className="new-station">
                {newStation && newStation.songs.length && <section className='song-list'>
                    {newStation.songs.map(song => {
                        return (
                            <section key={song._id} className='song'>
                                <span>{song.title}</span>
                            </section>
                        )
                    })}
                </section>}
                <section className='new-station-search'>
                    <form >
                        <input autoFocus value={query} onChange={this.search} />
                    </form>
                    {list &&
                        <section className='search-results'>
                            {list.map((item, idx) => {
                                return (
                                    <section key={idx}>
                                        <span>{item.title}</span>
                                        <button onClick={() => this.onAddSong(item)}>Add</button>
                                    </section>
                                )
                            })}
                        </section>}
                </section>
            </section >
        )
        
    }
    
}