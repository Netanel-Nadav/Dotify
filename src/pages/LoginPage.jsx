import { Component } from 'react'
import { connect } from 'react-redux'
import { login, signup } from '../store/user.action.js'


class _LoginPage extends Component {

    state = {
        credentials: {
            fullname: '',
            username: '',
            password: '',
        },
        isSignup: false
    }


    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onSignup = (ev) => {
        ev.preventDefault()
        const newUser = this.state.credentials
        this.props.signup(newUser);
        this.onGoBack()
    }

    onLogin = (ev) => {
        ev.preventDefault()
        const user = this.state.credentials
        this.props.login(user)
        this.onGoBack()
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    onGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        const { fullname, username, password } = this.state.credentials
        const { isSignup } = this.state

        return (
            <section className='login-page flex justify-center align-center'>

                <div className='signup-section'>
                    {isSignup && <form onSubmit={this.onSignup} className='flex column justify-center align-center'>

                        <div className='input-container flex column'>
                            <label htmlFor='fullname'>
                                Enter fullname:</label>
                            <input type="text" value={fullname}
                                name='fullname' placeholder='Enter fullname'
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className='input-container flex column'>
                            <label htmlFor='username'>Enter username:</label>
                            <input type="text" value={username}
                                name='username' placeholder='Enter username'
                                onChange={this.handleChange}
                            />

                        </div>

                        <div className='input-container flex column'>
                            <label htmlFor='password'>Enter Password</label>
                            <input type="password" value={password}
                                name='password' placeholder='Password'
                                onChange={this.handleChange}
                            />
                        </div>

                        <button className='signup-btn'>Sign Up</button>
                        <button className='switch-btn' onClick={this.toggleSignup}>Allready have a user? Login Now!</button>

                    </form>}
                    {!isSignup && <form onSubmit={this.onLogin} className='flex column justify-center align-center'>

                        <div className='input-container flex column'>
                            <label htmlFor='username'>Enter username:</label>
                            <input type="text" value={username}
                                name='username' placeholder='Enter username'
                                onChange={this.handleChange}
                            />

                        </div>

                        <div className='input-container flex column justify-center align-center'>
                            <label htmlFor='password'>Enter Password</label>
                            <input type="password" value={password}
                                name='password' placeholder='Password'
                                onChange={this.handleChange}
                            />
                        </div>

                        <button className='login-btn'>Login</button>
                        <div>
                            <button className='switch-btn' onClick={this.toggleSignup}>Not a User? SignUp Now!</button>
                        </div>
                    </form>}

                </div>


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
    login,
    signup
}


export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(_LoginPage)