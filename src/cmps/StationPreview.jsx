import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadStation } from '../store/station.action.js'



function _StationPreview({ loadStation, station }) {

    return (
        <Link to="#">
            <section className='station-preview card'>
                <img src={station.songs[0].imgUrl} />
                <h1>{station.name}</h1>
                <h3>{station.createdBy.fullname}</h3>
                <span>{station.likesCount}</span>
                {/* <span>{station.songs.map(song => <p>{song.url}</p>)}</span> */}
            </section>
        </Link>
    )
}

function mapStateToProps({ }) {
    return {}
}

const mapDispatchToProps = {
    loadStation
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview)