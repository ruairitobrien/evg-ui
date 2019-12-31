import React, { useContext } from 'react'
import { IonButton } from '@ionic/react'
import { openLoginModal, logout } from './identity'
import { AuthContext } from './AuthContextProvider'

const AuthButton = () => {
  const auth = useContext(AuthContext)

  if (!!auth.user) {
    return <IonButton onClick={logout}>Logout</IonButton>
  }
  return <IonButton onClick={openLoginModal}>Login</IonButton>
}

export default AuthButton
