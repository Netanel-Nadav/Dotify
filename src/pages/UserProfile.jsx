import React from "react";
import { connect } from "react-redux";
import { UserHero } from "../cmps/UserHero";
import { stationService } from "../services/station.service"
import {StationPreview} from "../cmps/StationPreview"


export class _UserProfile extends React.Component {

    state = {
        stations: null
    }

    componentDidMount = async () => {
        const stations = await stationService.query()
        this.setState({ stations })
    }



    render() {
        // console.log(this.props.history.goBack);
        const { user } = this.props
        const { stations } = this.state

        return (
            <section className="user-profile">
                <UserHero user={user} />
                {
                   stations && stations.map(station => (
                        <StationPreview key={station._id} station={station}/>
                    ))
                }
            </section>
        )
    }
}



function mapStateToProps({ userModule }) {
    return {
        user: userModule.user

    }
}

const mapDispatchToProps = {

};


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)