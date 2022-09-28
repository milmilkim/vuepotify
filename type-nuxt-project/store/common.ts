import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { Buffer } from 'buffer'

const client_id = process.env.VUE_APP_CLIENT_ID
const client_secret = process.env.VUE_APP_CLIENT_SECRET
const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

type SearchType = 'track' | 'artist'

export const state = () => ({
  token: ''! as String,
  searchList: [],
  searchType: 'track' as SearchType,
  query: ''! as String,
})

type CommonState = ReturnType<typeof state>

export const getters = getterTree(state, {
  getToken: (state: CommonState) => state.token,
  getSearchList: (state: CommonState) => state.searchList,
  getSearchType: (state: CommonState) => state.searchType,
  getQuery: (state: CommonState) => state.query,
})

export const mutations = mutationTree(state, {
  setToken(state: CommonState, newToken: String) {
    state.token = newToken
  },

  setSearchList(state: CommonState, list: []) {
    state.searchList = list
  },

  setSearchType(state: CommonState, type: SearchType) {
    state.searchType = type
  },

  setQuery(state: CommonState, query: String) {
    state.query = query
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async postAuth({ commit }): Promise<void> {
      let res = null
      console.log(client_id)
      console.log(client_secret)

      try {
        res = await this.$axios.post(
          'https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: 'Basic ' + auth,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        const token = res.data.access_token
        commit('setToken', token)
      } catch (err) {
        console.error(err)
      }
    },
  }
)
