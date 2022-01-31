import React from "react"
import { connect } from 'react-redux'
import {clearUserMsg} from "../store/user.action"



class _Msg extends React.Component{


   timeoutId;
    
    componentDidUpdate(prevProps,prevState) {
        if(prevProps.msg !== this.props.msg) {
            if (this.timeoutId) clearTimeout(this.timeoutId)
                this.timeoutId = setTimeout(() => {
                    this.props.clearUserMsg()
                }, 2000)
        }
    }


    render() {
        const {msg} = this.props
        if(!msg) return <React.Fragment></React.Fragment>
        return (
            <section className={`user-msg`}  style={{ backgroundColor: msg.type === 'error' ? '#cf000f' : '#2e77d0' }}>
                {msg.txt}
            </section>
        )
    }
}


function mapStateToProps({ userModule }) {
    return {
        msg: userModule.msg
    }
}

const mapDispatchToProps = {
    clearUserMsg
}


export const Msg = connect(mapStateToProps, mapDispatchToProps)(_Msg)