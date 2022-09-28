<template>
  <div v-if="profileData" class="myProfile">
    <ul>
      <li><img width="100px" :src="profileData.images[0].url" /></li>
      <li>{{ profileData.display_name }}</li>
      <li>{{ profileData.email }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      profileData: null,
    };
  },

  mounted() {
    this.getMyProfile();
  },

  computed: {
    ...mapState('login', ['userToken']),
    // myEmail() {
    //   return this.profileData.email;
    // },
  },

  methods: {
    async getMyProfile() {
      let res = null;
      try {
        res = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + this.userToken,
          },
        });
        this.profileData = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.myProfile {
  display: flex;
  justify-content: center;

  img {
    border-radius: 50px;
  }
  ul {
    list-style: none;
    text-align: center;
  }
}
</style>
