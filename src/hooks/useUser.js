import { useCallback, useEffect, useState } from "react"
import { httpGetUser } from "./requests"

const useUser = () => {
    const [user, setUser] = useState(undefined)

  const getUser = useCallback(async() => {
    const fetchedUser = await httpGetUser()
    setUser(fetchedUser)
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  return user
}

export default useUser;