import { useCallback, useEffect, useState } from "react"
import { httpGetBidHistory } from "./requests"

const useBidHistory = () => {
    const [bidHistory, setBidHistory] = useState(undefined)

    const getBidHistory = useCallback(async() => {
        const fetchedBidHistory = await httpGetBidHistory()
        setBidHistory(fetchedBidHistory)
    }, [])

    useEffect(() => {
        getBidHistory()
    }, [getBidHistory])

    return bidHistory
}

export default useBidHistory;