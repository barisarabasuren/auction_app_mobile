const API_URL = 'https://cryptic-beyond-14688.herokuapp.com'
import * as SecureStore from "expo-secure-store";

export const httpUserSignup = async (user) => {
    const response = await fetch(`${API_URL}/auth/user/signup`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    return response;
}

export const httpUserGetToken = async (user) => {
    const response = await fetch(`${API_URL}/auth/user/token`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    return response;
}

export const httpGetRefreshToken = async (refreshToken) => {
    const requestBody = {
        refreshToken: refreshToken
    }
    const response = await fetch(`${API_URL}/auth/user/refresh`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    });

    return response;
}

export const httpGetGalleries = async() => {
    const response = await fetch(`${API_URL}/galleries`)
    return await response.json()
}

export const httpGetCollections = async(gallery_id) => {
    const response = await fetch(`${API_URL}/collections/${gallery_id}`)
    return await response.json()
}

export const httpGetArtworks = async(collection_id) => {
    const response = await fetch(`${API_URL}/artworks/${collection_id}`)
    return await response.json()
}

export const httpGetArtwork = async(artwork_id) => {
    const response = await fetch(`${API_URL}/artworks/artwork/${artwork_id}`)
    return await response.json()
}

export const httpBidOnArtwork = async(artwork_id, bidPrice) => {
    const accessToken = await SecureStore.getItemAsync('accessToken')

    const requestOptions = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({"price": bidPrice})
    }
    const response = await fetch(`${API_URL}/bid/${artwork_id}`, requestOptions)
    return response
}

export const httpGetUser = async() => {
    const accessToken = await SecureStore.getItemAsync('accessToken')

    const requestOptions = {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await fetch(`${API_URL}/auth/user`, requestOptions)
    return await response.json()
}

export const httpGetBidHistory = async() => {
    const accessToken = await SecureStore.getItemAsync('accessToken')

    const requestOptions = {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await fetch(`${API_URL}/bid/history`, requestOptions)
    return await response.json()
}

