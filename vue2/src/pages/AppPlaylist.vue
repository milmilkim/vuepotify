<template>
  <div>
    <div v-if="!isLogin">
      <a :href="url">로그인</a>
    </div>
    <div v-else>
      <MyProfile />
      <MyPlaylist />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MyProfile from '@/components/MyProfile.vue';
import MyPlaylist from '@/components/MyPlaylist.vue';

const client_id = process.env.VUE_APP_CLIENT_ID;
const redirect_url = process.env.VUE_APP_REDIRECT_URL + 'playlist';
const scope = 'user-read-private user-read-email user-top-read';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_url);

export default {
  data() {
    return {
      url,
      userToken: null,
    };
  },
  computed: {
    ...mapState('login', ['isLogin']),
  },
  created() {
    const { hash } = this.$route;
    if (hash) {
      const query = {};
      hash
        .split('#')[1]
        .split('&')
        .forEach((v) => (query[v.split('=')[0]] = v.split('=')[1]));
      this.userToken = query.access_token;
      this.login(this.userToken);
    }
  },
  mounted() {},
  methods: {
    ...mapActions('login', ['login']),
  },
  comments: {
    MyProfile,
  },
  components: { MyProfile, MyPlaylist },
};
</script>

<style lang="scss" scoped></style>
