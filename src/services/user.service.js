
import { httpService } from "./http.service";


const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'logedinUser';


export const userService = {
    login,
    logout,
    signup,
    getLogedinUser,
    update,
    getById
}


async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        _setLogedinUser(user)
        return user
    } catch(err) {
        throw err
    }
}


function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}


async function signup(userInfo) {
    const newUser = await httpService.post('auth/signup', userInfo)
    _setLogedinUser(newUser)
    return newUser
}

async function update(user) {
    const updatedUser =  await httpService.put(`user/${user._id}`, user)
    _setLogedinUser(updatedUser)
    return updatedUser
}

async function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function getLogedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLogedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}
