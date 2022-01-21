import React from 'react'

import { stationService } from '../services/station.service';
import { utilService } from '../services/util.service';

export class CreateStation extends React.Component {

    state = {
        newStation: null,
        query: '',
        list: null
    }

    // onSearch(ev) {
    //     ev.preventDefault()
    //     const search = utilService.debounce(this.search, 2000)
    //     search(ev)
    // }

    // search = async (ev) => {
    //     ev.preventDefault()
    //     this.setState({ query: ev.target.value }, async () => {
    //         const list = await stationService.searchYouTube(this.state.query)
    //         this.setState({ list })
    //     })
    // }

    setQuery = (ev) => {
        this.setState({ query: ev.target.value })
    }

    search = async (ev) => {
        ev.preventDefault()
        const list = await stationService.searchYouTube(this.state.query)
        this.setState({ list })

    }

    onAddSong = async (song) => {
        if (!this.state.newStation) await this.onMakeNewStation()
        const { newStation } = this.state
        const stationToEdit = { ...newStation }
        const newSong = await stationService.formatNewSong(song)
        stationToEdit.songs = [...stationToEdit.songs, newSong]
        const savedStation = await stationService.update(stationToEdit)
        this.setState({ newStation: savedStation })
    }

    onMakeNewStation = async () => {
        const newStation = await stationService.makeNewStation()
        this.setState({ newStation })
        return Promise.resolve()
    }

    render() {
        const { newStation, list, query } = this.state
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
                    <form onSubmit={this.search}>
                        <input autoFocus value={query} onChange={this.setQuery} />
                        <button>search</button>
                    </form>
                    {list &&
                        <section className='search-results flex column'>
                            {list.map((item, idx) => {
                                return (
                                    <section key={idx} className='song-container flex'>
                                        <section className='song-info flex'>
                                            <span>{idx + 1}</span>
                                            <section className='img-container'>
                                                <img src={item.bestThumbnail.url} />
                                            </section>
                                            <span>{item.title}</span>
                                        </section>
                                        <section className='flex space-between'>
                                            <section className='song-duration'>
                                                <span>{item.duration}</span>
                                            </section>
                                            <section className='add-song-btn'>
                                                <button onClick={() => this.onAddSong(item)}>Add</button>
                                            </section>
                                        </section>
                                    </section>
                                )
                            })}
                        </section>}
                </section>
            </section>
        )

    }

}