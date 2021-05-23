import api from '../utils/API';

const check = async (lang: string, content: string) => {
    return api.post('check', {
        lang: lang, content: content
    })
}

export const checkApi = {
    check
}