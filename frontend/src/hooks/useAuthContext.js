import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!AuthContext) {
        throw Error('useBlogsContext needs to be used inside BlogContextProvider')
    }

    return context
}