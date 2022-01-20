import React, { useState, useEffect } from 'react';

import { stationService } from '../services/station.service';

export function Search() {

    const [genres, setGenres] = useState(null)
    const [query, setQuery] = useState('');
    const [list, setList] = useState(null)

    useEffect(async () => {
        const allGenres = await stationService.getStationsGenre()
        setGenres(allGenres)
    }, [])

    const search = (ev) => {
        ev.preventDefault();
        stationService.searchYouTube(query).then(setList);
    };



    return (
        <section className='search-container'>
            <section className='search-by-text'>
                <form onSubmit={search}>
                    <input autoFocus value={query} onChange={ e => setQuery(e.target.value)} />
                    <button>search</button>
                </form>
                {list && <section>
                    {list.map((item, idx) => {
                        return (
                            <section key={item.id}>
                                <section>
                                    <span>{idx + 1}</span>
                                    <img src={item.bestThumbnail.url} />
                                    <span>{item.title}</span>
                                </section>
                                <section>
                                    <span>{item.duration}</span>
                                    <button>like</button>
                                </section>
                            </section>
                        )
                    })}
                </section>
                }

                {genres && !list &&
                    <section className='stations-by-genre'>
                        {genres.map(genre => {
                            return (
                                <section key={genre.name}>
                                    <h1>{genre.name}</h1>
                                    {/* <img src={genre.imgUrl} /> */}
                                </section>
                            )
                        })}
                    </section>}
            </section>
        </section>
    )
}