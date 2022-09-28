import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

// Import all your submodules
import * as common from './common'
import * as login from './login'
//keep your existing vanilla vuex code for state, getters, mutations, actions, plugins, etc.

export const state = () => ({})

export const getters = {}

export const mutations = mutationTree(state, {})

export const actions = actionTree(
  {
    state,
    mutations,
    getters,
  },
  {}
)
//this compiles to nothing and only serves to return the correct type of the accessor

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    common,
    login,
  },
})
