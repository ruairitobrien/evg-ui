import netlifyIdentity from 'netlify-identity-widget'

export const init = () => {
  netlifyIdentity.init()
  return netlifyIdentity
}

export const onLogout = () => {
  return new Promise(resolve => {
    netlifyIdentity.on('logout', () => {
      console.log('logout')
      resolve()
    })
  })
}

export const openLoginModal = () => {
  netlifyIdentity.open()
}

export const logout = () => {
  netlifyIdentity.logout()
}

export const differ = () => {
  netlifyIdentity.on('logout', () => console.log('Logged out'))
  netlifyIdentity.open('login') // open the modal to the login tab
  netlifyIdentity.open('signup') // open the modal to the signup tab

  // Close the modal
  netlifyIdentity.close()

  // Log out the user
  netlifyIdentity.logout()
}
