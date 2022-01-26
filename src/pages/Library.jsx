import { connect } from 'react-redux'
import { StationList } from '../cmps/StationList';


function _Library({ stations }) {


    return (
        <section>
            <StationList stations={stations}/>
        </section>
    )
}


function mapStateToProps({ stationModule }) {
    return {
        stations: stationModule.stations
    }
}

const mapDispatchToProps = {
  
}


export const Library = connect(mapStateToProps, mapDispatchToProps)(_Library)