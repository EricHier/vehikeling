import { auth } from '~/services/firebase.js'

export default context => {
  const { store } = context;

  return new Promise((resolve) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.commit('setUser', user))
      }
      return resolve()
    })
  })
}
