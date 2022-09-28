<template>
  <div>
    <ul v-if="playlists">
      <li class="card" v-for="item in playlists" v-bind:key="item?.id">
        <PlaylistItem :name="item.name" :id="item.id" :imageUrl="item.images[0].url" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import PlaylistItem from './PlaylistItem.vue';

export default {
  data() {
    return {
      playlists: null,
    };
  },

  components: {
    PlaylistItem,
  },

  computed: {
    ...mapState('login', ['userToken']),
  },
  mounted() {
    this.getPlaylists();
  },

  methods: {
    async getPlaylists() {
      let res = null;
      try {
        res = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${this.userToken}`,
          },
        });
        this.playlists = res.data?.items;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
