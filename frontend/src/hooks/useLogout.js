import { useAuthContext } from '../hooks/useAuthContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {

        // remove from state
        dispatch({type: 'LOGOUT'})

        // remove from local storage
        localStorage.removeItem('user')
    }
    return {logout}
}