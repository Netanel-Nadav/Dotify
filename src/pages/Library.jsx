import { connect } from 'react-redux'
import { LikedSongsPreview } from '../cmps/LikedSongsPreview';
import { StationList } from '../cmps/StationList';


function _Library({ stations, user }) {

    return (
        <section>
            <StationList stations={stations} user={user}/>
        </section>
    )
}


function mapStateToProps({ stationModule , userModule}) {
    return {
        stations: stationModule.stations,
        user: userModule.user
    }
}

const mapDispatchToProps = {
  
}


export const Library = connect(mapStateToProps, mapDispatchToProps)(_Library)