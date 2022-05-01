import React, {useEffect} from 'react';

import * as SecureStore from "expo-secure-store";
import { httpGetRefreshToken } from './requests';


export const CheckLoggedIn = (handleLoggedIn) => {
  const refreshAccessToken = async() => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken')

    if(refreshToken) {
      try{
        const response = await httpGetRefreshToken(refreshToken)
        if(response.status === 200) {
          const responseData = await response.json();
          await SecureStore.setItemAsync(
            "accessToken", 
            responseData.accessToken
          );
        } else {
          handleLoggedIn(false)
        }
      } catch {
        handleLoggedIn(false)
      }
    } else {
      handleLoggedIn(false)
    }
  }

  useEffect(async() => {
    await refreshAccessToken()
    const interval = setInterval(async() => {
      await refreshAccessToken();
    }, 840000);
    return () => clearInterval(interval);
  }, [])
}
