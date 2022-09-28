<template>
  <div class="track_container" v-if="trackInfo">
    <img :src="trackInfo.album?.images[1].url" />
    <ul>
      <button @click="() => $router.go(-1)">◀︎ back</button>
      <li>{{ trackInfo.name }}</li>
      <li>{{ trackInfo.album?.artists?.map((v) => v.name).join(', ') }}</li>
      <li>{{ millisToMinutesAndSeconds }}</li>
      <li>{{ trackInfo.album?.release_date }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
const token = window.localStorage.getItem('token');
let trackInfo = null;

export default {
  data() {
    return {
      token,
      trackInfo,
    };
  },

  mounted() {
    this.getItemList();
  },

  computed: {
    millisToMinutesAndSeconds() {
      const millis = this.trackInfo.duration_ms;
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    },
  },

  methods: {
    async getItemList() {
      let res = null;
      try {
        res = await axios.get('https://api.spotify.com/v1/tracks/' + this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.trackInfo = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.track_container {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  img {
    width: 250px;
  }
}
</style>
