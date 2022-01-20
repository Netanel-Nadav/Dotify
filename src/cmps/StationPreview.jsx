import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'





export function StationPreview({ station }) {

    if(!station.songs.length) return <React.Fragment></React.Fragment>
    return (
        <Link to='#'>
            <section className='station-preview card'>
                <img src={station.songs[0].imgUrl} />
                <h1>{station.name}</h1>
                <h3>{station.createdBy.fullname}</h3>
                <span>{station.likesCount}</span>
                {/* <span>{station.songs.map(song => <p key={song._id}>{song.url}</p>)}</span> */}
            </section>
        </Link>
    )
}

