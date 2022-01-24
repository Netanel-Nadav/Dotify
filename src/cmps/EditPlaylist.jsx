import React from "react"


export class EditPlaylist extends React.Component {

    state = {
        station: null,
    }


    componentDidMount() {
        this.setState({ station: this.props.station })
        document.body.style.overflow = "hidden"
    }


    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        this.setState((prevState) => ({ station: { ...prevState.station, [field]: value } }))
    }


    onChooseColor = (color) => {
        this.setState({ color })
    }

    uploadImg = (ev) => {
        const CLOUD_NAME = 'dvxuxsyoe'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append('file', ev.target.files[0])
        formData.append('upload_preset', 'mx6fvrvl');

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const img = res.url

                // Return or setState
                // return img

                // this.setState({})

            })
            .catch(err => console.error(err))

    }


    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.updateStation(this.state.station)
        this.props.setIsModalShown(false)
    }

    render() {

        const { station } = this.state
        if (!station) return <React.Fragment></React.Fragment>
        const { name, imgUrl } = station
        return (
            <section className='edit-playlist flex justify-center align-center'>
                <form className='edit-info flex column justify-center' onSubmit={this.handleSubmit}>
                    <button className="close-btn" onClick={() => this.props.setIsModalShown(false)}>X</button>
                    <div className='wrraper flex justify-center align-center'>
                        <div className='img-upload'>
                            <input type="file" onChange={this.uploadImg} />
                        </div>
                        <div className='input-container flex column'>
                            <label>Enter Playlist Name</label>
                            <input type="text" name="name" value={name} onChange={this.handleChange} />
                            <div className='color-container flex justify-center align-center'>
                                <div className='color red' onClick={() => this.onChooseColor('ff0000')}></div>
                                <div className='color blue' onClick={() => this.onChooseColor('0000ff')}></div>
                                <div className='color green' onClick={() => this.onChooseColor('008000')}></div>
                                <div className='color yellow' onClick={() => this.onChooseColor('ffff00')}></div>
                                <div className='color purple' onClick={() => this.onChooseColor('800080')}></div>
                            </div>
                            <button>Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        )

    }
}
