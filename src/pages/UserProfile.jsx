import React from "react";
import { connect } from "react-redux";
import { UserHero } from "../cmps/UserHero";
import { stationService } from "../services/station.service"
import { StationList } from "../cmps/StationList";


export class _UserProfile extends React.Component {

    state = {
        stations: null
    }

    componentDidMount = async () => {
        this.loadStations()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.likedStations !== this.props.user.likedStations) {
            this.loadStations()
        }
    }

    loadStations = () => {
        const stations = this.props.stations.filter(station => this.props.user.likedStations.includes(station._id))
        this.setState({ stations })
    }



    render() {
        const { user } = this.props
        const { stations } = this.state

        return (
            <section className="user-profile">
                <UserHero user={user} />
                {user.likedStations.length > 0 ? 
                <section>
                    <h2>Your Liked Stations:</h2>
                    <StationList stations={stations} />
                </section> : <h2>No Liked Stations</h2>}
            </section>
        )
    }
}



function mapStateToProps({ userModule, stationModule }) {
    return {
        user: userModule.user,
        stations: stationModule.stations

    }
}

const mapDispatchToProps = {

};


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)