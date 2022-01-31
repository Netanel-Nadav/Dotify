import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import {clearUserMsg} from "../store/user.action"



function _Msg({ msg, clearUserMsg }) {


    let timeoutId;
    
    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            clearUserMsg()
        }, 2000)
    }, [msg])


    if(!msg) return <React.Fragment></React.Fragment>
    return (
        <section className={`user-msg`}  style={{ backgroundColor: msg.type === 'error' ? '#cf000f' : '#2e77d0' }}>
            {msg.txt}
        </section>
    )
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