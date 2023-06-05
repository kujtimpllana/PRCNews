import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createCreate()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async(formInput) => {
        const res = await axios.post("http://localhost:9000/api/auth/login", formInput)
        setCurrentUser(res.data)
    }

    const logout = async(formInput) => {
        await axios.post("http://localhost:9000/api/auth/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}