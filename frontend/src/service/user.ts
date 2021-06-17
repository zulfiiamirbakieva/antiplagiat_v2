import api from "../utils/API"


const login = async (email: string, password: string) => {
    return api.post(`/auth/login`, { email, password })
}

const register = async (firstName: string, lastName: string, email: string, password: string) => {
    return api.post(`/auth/register`, { firstName, lastName, email, password })
}


export const userApi = {
    login,
    register
}