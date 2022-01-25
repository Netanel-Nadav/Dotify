import { userService } from "../services/user.service"


export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('Error at User.Action', err);
        }
    }
}


export function logout() {
    return async (dispatch) => {
        try {
            const user = await userService.logout();
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('Error at User Action Logout', err);
        }
    }
}

export function signup(newUser) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(newUser)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('Error at User Action signup', err);
        }
    }
}


export function updateUser(user) {
    return async (dispatch) => {
        try {
        const updatedUser = await userService.update(user)
        let action = { type: 'UPDATE_USER', updatedUser }
        dispatch(action)
      } catch (err) {
        console.log('Had an Error in updateStation', err);
      }
    }
  }