<template>
  <div>
    <div v-if="!isLoading">
      <ul v-if="playlists">
        <li class="card" v-for="item in playlists" v-bind:key="item?.id">
          <PlaylistItem
            :name="item.name"
            :id="item.id"
            :imageUrl="item.images[0].url"
          />
        </li>
      </ul>
    </div>
    <div v-if="isLoading">loading....</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PlaylistItem from './PlaylistItem.vue'

@Component({
  components: {
    PlaylistItem,
  },
})
export default class MyPlaylist extends Vue {
  public playlists: any = null
  public isLoading: boolean = false

  async getPlaylists() {
    let res = null
    try {
      this.isLoading = true
      res = await this.$axios.$get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${this.$accessor.login.userToken}`,
        },
      })
      this.playlists = res?.items
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }

  mounted() {
    this.getPlaylists()
  }
}
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
