import { Buffer } from 'buffer';
import axios from 'axios';

const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;
const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const state = () => ({
  myState: { id: 2 },
  token: null,
  searchList: null,
  searchType: 'track',
  query: null,
});

const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },

  setSearchList(state, payload) {
    state.searchList = payload;
  },

  setSearchType(state, payload) {
    state.searchType = payload;
  },

  setQuery(state, payload) {
    state.query = payload;
  },
};

const actions = {
  async getToken({ commit }) {
    let res = null;

    try {
      res = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          Authorization: 'Basic ' + auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const token = res.data.access_token;
      commit('setToken', token);
    } catch (err) {
      console.error(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
