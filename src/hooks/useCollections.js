import { useCallback, useEffect, useState } from "react"
import { httpGetCollections } from "./requests"

const useCollections = (galleryId) => {
    const [collections, setCollections] = useState(undefined)

    const getCollections = useCallback(async () => {
        try {
            const fetchedCollections = await httpGetCollections(galleryId);
            setCollections(fetchedCollections) 
        } catch(err) {
            console.log(err)
        }
    }, []) 

    getCollections()

    return collections
}

export default useCollections;