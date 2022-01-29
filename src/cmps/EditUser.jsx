import { colors } from "@material-ui/core"
import React from "react"


export class EditUser extends React.Component {

    state = {
        user: null,
        isEditShown: false,
        colorIdx: null,
        colors: [
            {
                name: 'cyan',
                value: '#49B6FF',
            },
            {
                name: 'blue',
                value: '#779BE7',
            },
            {
                name: 'magenta',
                value: '#D264B6',
            },
            {
                name: 'green',
                value: '#4FB477',
            },
            {
                name: 'sand',
                value: '#EDCBB1',
            },
        ]
    }


    componentDidMount() {
        this.setState({ user: this.props.user })
        document.body.style.overflow = "hidden"
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user })
        }
    }


    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        this.setState((prevState) => ({ user: { ...prevState.user, [field]: value } }))
    }


    onChooseColor = (color, idx) => {
        this.setState({ colorIdx: idx })
        this.setState((prevState) => ({ station: { ...prevState.station, backgroundColor: color } }))
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
                const imgUrl = res.url
                this.setState((prevState) => ({ user: { ...prevState.user, imgUrl: imgUrl } }))
            })
            .catch(err => console.error(err))
    }

    onChooseColor = (color, idx) => {
        this.setState({ colorIdx: idx })
        this.setState((prevState) => ({ user: { ...prevState.user, backgroundColor: color } }))
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const updatedUser = this.state.user
        this.props.updateUser(updatedUser)
        this.props.onEditProfile()
    }

    render() {

        const { user, colors, colorIdx } = this.state
        if (!user) return <React.Fragment></React.Fragment>
        if (!colors) return <React.Fragment></React.Fragment>
        const { username, imgUrl } = user
        return (
            <section className='edit-user flex justify-center align-center'>
                <form className='user-details flex column justify-center' onSubmit={this.handleSubmit}>
                    <button className="close-btn" onClick={() => this.props.onEditProfile()}>X</button>
                    <div className='wrraper flex justify-center align-center'>
                        <div className='img-upload' style={{ backgroundImage: user.imgUrl ? `url(${imgUrl})` : `url(${''})` }}>
                            <input type="file" onChange={this.uploadImg} />
                        </div>
                        <div className='input-container flex column'>
                            <label>Enter Name</label>
                            <input type="text" name="username" value={username} onChange={this.handleChange} />
                            <div className='color-container flex justify-center align-center'>
                                {colors.map((color, idx) => (
                                    <div key={idx} className={`color ${color.name} ${colorIdx === idx ? 'clicked' : ''}`} onClick={() => this.onChooseColor(color.value, idx)}></div>
                                ))}
                            </div>
                            <button>Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        )

    }
}
