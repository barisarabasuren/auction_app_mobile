import { useCallback, useEffect, useState } from "react"
import { httpGetArtworks } from "./requests"

const useArtworks = () => {
    const [artworks, setArtworks] = useState(undefined)

    const getArtworks = useCallback(async () => {
        try {
            const fetchedArtworks = await httpGetArtworks();
            setArtworks(fetchedArtworks) 
        } catch(err) {
            console.log(err)
        }
    }, []) 

    useEffect(() => {
        getArtworks()
    }, [getArtworks])

    return artworks
}

export default useArtworks;