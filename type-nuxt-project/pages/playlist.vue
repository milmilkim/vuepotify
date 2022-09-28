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

<script lang="ts">
import MyProfile from '../components/MyProfile.vue'
import MyPlaylist from '../components/MyPlaylist.vue';

const client_id: string = process.env.VUE_APP_CLIENT_ID as string
const redirect_url: string = process.env.VUE_APP_REDIRECT_URL + 'playlist'
const scope: string = 'user-read-private user-read-email user-top-read'

let url: string = 'https://accounts.spotify.com/authorize'
url += '?response_type=token'
url += '&client_id=' + encodeURIComponent(client_id)
url += '&scope=' + encodeURIComponent(scope)
url += '&redirect_uri=' + encodeURIComponent(redirect_url)

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    MyProfile,
    MyPlaylist
  },
})

export default class Playlist extends Vue {
  public url: string = url
  get userToken() {
    return this.$accessor.login.userToken
  }

  get isLogin() {
    return this.$accessor.login.isLogin
  }

  mounted() {
    const { hash }: any = this.$route
    if (hash) {
      console.log('here')
      const query: any = {}
      hash
        .split('#')[1]
        .split('&')
        .forEach((v: any): any => (query[v.split('=')[0]] = v.split('=')[1]))

      this.$accessor.login.setUserToken(query.access_token)
      this.$accessor.login.setIsLogin(true)
    }
  }
}
</script>

</style>
