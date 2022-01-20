import React, { useState, useEffect } from 'react';

import { stationService } from '../services/station.service';

export function Search() {

    const [genres, setGenres] = useState(null)

    useEffect(async () => {
        const allGenres = stationService.getStationsGenre()
        setGenres(allGenres)
    }, [])


    return (
        <section className='search-container'>
            <section className='search-by-text'>

            </section>

            {genres &&
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
    )
}