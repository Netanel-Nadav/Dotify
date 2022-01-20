import React from "react";
import { connect } from "react-redux";
import { UserHero } from "../cmps/UserHero";


export class _UserProfile extends React.Component {



    render() {
        const { user } = this.props
        return (
            <section className="user-profile">
                <UserHero user={user} />

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