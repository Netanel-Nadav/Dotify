
import { storageService } from "./async-storage.service";


const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'logedinUser';


export const userService = {
    login,
    logout,
    signup,
    getLogedinUser,
    setUser,
    update,
}


async function login(credentials) {
    const users = await storageService.query(STORAGE_KEY)
    let user = users.find(user => user.username === credentials.username && user.password === credentials.password)
    if (user) {
        user = { ...user }
        delete user.password
        _setLogedinUser(user)
    }
    return user
}


async function setUser() {
    storageService._save(STORAGE_KEY, [])
    await signup({ username: 'nati', password: '123' })
    await signup({ username: 'sahar', password: '123' })
    await signup({ username: 'rotem', password: '123' })
}

function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}


async function signup(userInfo) {
    const users = await storageService.query()
    if (!users) storageService._save(STORAGE_KEY, [])
    let user = _createUser()
    user.username = userInfo.username;
    user.password = userInfo.password;

    console.log(user);
    const newUser = await storageService.post(STORAGE_KEY, user)
    _setLogedinUser(newUser)
    return newUser
}

async function update(user) {
    const updatedUser =  await storageService.put(STORAGE_KEY, user)
    _setLogedinUser(updatedUser)
    return updatedUser
}

function getLogedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLogedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


function _createUser() {
    const user = {
        imgUrl: '/assets/img/user-img.svg',
        likedSongs: [],
        lastPlayedArtists: [],
    }
    return user
}