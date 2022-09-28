import { getterTree, mutationTree, actionTree } from 'typed-vuex'
// import { Buffer } from 'buffer'

// const client_id = process.env.VUE_APP_CLIENT_ID
// const client_secret = process.env.VUE_APP_CLIENT_SECRET
// const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

// type SearchType = 'track' | 'artist'

export const state = () => ({
  isLogin: false as boolean,
  userToken: ''! as string,
})

type LoginState = ReturnType<typeof state>

export const getters = getterTree(state, {
  getIsLogin: (state: LoginState) => state.isLogin,
  getUserToken: (state: LoginState) => state.userToken,
})

export const mutations = mutationTree(state, {
  setIsLogin(state: LoginState, value: boolean) {
    state.isLogin = value
  },

  setUserToken(state: LoginState, newToken: string) {
    state.userToken = newToken
  },
})

export const actions = actionTree({ state, mutations }, {})
