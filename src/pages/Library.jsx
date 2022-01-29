import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { StationList } from '../cmps/StationList';
import { setStation } from "../store/media.action";
import { Loader } from '../cmps/Loader';


function _Library({ stations, user }) {

    const [stationsToRender, setStationsToRender] = useState(null)

    useEffect(() => {
        stations = stations.sort((a,b) => b.createdAt - a.createdAt)
        if(user) {
            const userStations = stations.filter(station => station.createdBy._id === user._id)
            setStationsToRender(userStations)
        }
        else setStationsToRender(stations)
    },[stations])


    if(!stationsToRender) return <Loader/>
    return (
        <section>
            <StationList stations={stationsToRender} user={user}/>
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