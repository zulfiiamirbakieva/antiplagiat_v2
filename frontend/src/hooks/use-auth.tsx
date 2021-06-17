import * as React from "react"
import { useState, useEffect, useContext, createContext } from "react"
import { userApi } from "../service/user"


interface IAuthContext {
    user?: any
    isAuthenticated: boolean
    isLoading: boolean

    signIn: (email: string, password: string) => Promise<void>
    signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext)


export function ProvideAuth({ children }: any) {
    const auth = useProvideAuth()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
    return useContext(AuthContext)
}


function useProvideAuth() {
    const [user, setUser] = useState<any>()
    const [accessToken, setAccessToken] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        loadMember()
    }, [])

    const loadMember = async () => {
        asyncLocalStorage.getItem("userData").then((storage) => {
            if(storage) {
                const userData = JSON.parse(storage)

                setUser(userData.user)
                setAccessToken(userData.accessToken)
                setIsAuthenticated(true)
            }

            setIsLoading(false)
        })
    }

    const signIn = async (email: string, password: string) => {
        setIsLoading(true)

        const userResponse = await userApi.login(email, password)

        if (userResponse.data.accessToken) {
            asyncLocalStorage.setItem("userData",
                JSON.stringify({
                    accessToken: userResponse.data.accessToken,
                    user: userResponse.data.user,
                })

            ).then(() => {

                setUser(userResponse.data.user)
                setAccessToken(userResponse.data.accessToken)
                setIsAuthenticated(true)

                window.location.href = '/'
            })
        }

        setIsLoading(false)
    }

    const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
        setIsLoading(true)

        const userResponse = await userApi.register(firstName, lastName, email, password)

        if (userResponse.data.accessToken) {
            asyncLocalStorage.setItem("userData",
                JSON.stringify({
                    accessToken: userResponse.data.accessToken,
                    user: userResponse.data.user,
                })

            ).then(() => {

                setUser(userResponse.data.user)
                setAccessToken(userResponse.data.accessToken)
                setIsAuthenticated(true)
                window.location.href = '/'
            })
        }

        setIsLoading(false)
    }

    const signOut = async () => {
        localStorage.removeItem('userData')
        window.location.href = '/login'
    }

    return {
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
    }
}


const asyncLocalStorage = {
    setItem: function (key: string, value: any) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value)
        })
    },

    getItem: function (key: string) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key)
        })
    }
};