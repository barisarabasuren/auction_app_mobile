import { useCallback, useEffect, useState } from "react"
import { httpGetGalleries } from "./requests"

const useGalleries = () => {
    const [galleries, setGalleries] = useState(undefined)

    const getGalleries = useCallback(async () => {
        try {
            const fetchedGalleries = await httpGetGalleries();
            setGalleries(fetchedGalleries) 
        } catch(err) {
            console.log(err)
        }
        
    }, []) 

    useEffect(() => {
        getGalleries()
    }, [getGalleries])

    return galleries
}

export default useGalleries;