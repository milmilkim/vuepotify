<template>
  <div>
    <div class="card" @click="openModal">
      <img :src="imageUrl" width="50px" />
      <ul class="meta">
        <li class="title">{{ name }}</li>
      </ul>
    </div>

    <div v-if="modal">
      <MyModal @close="closeModal">
        <!-- default 슬롯 콘텐츠 -->
        <div v-if="!isLoading">
          <p>{{ name }}</p>
          <ul v-if="item">
            <li class="card" v-for="item in item.tracks.items" :key="item.id">
              <img :src="item.track.album.images[0].url" width="50px" />
              <router-link v-bind:to="`/detail/${item.track.id}`">
                <ul class="meta">
                  <li>{{ item.track.name }}</li>
                </ul>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else>loading...</div>
        <template slot="footer"> </template>
        <!-- /footer -->
      </MyModal>
    </div>
  </div>
</template>

<script lang="ts">
import MyModal from './MyModal.vue'
//   import axios from 'axios';
//   import { mapState } from 'vuex';

import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

@Component({
  components: {
    MyModal,
  },
})
export default class PlaylistItem extends Vue {
  @Prop({ type: String, required: true }) name!: string
  @Prop({ default: '', required: false }) imageUrl!: string
  @Prop({ type: String, required: true }) id!: string
  //   export default {
  //     props: {
  //       name: {
  //         requre: true,
  //         type: String,
  //       },
  //       imageUrl: {
  //         type: String,
  //         requre: false,
  //       },
  //       id: {
  //         require: true,
  //         type: String,
  //       },
  //     },

  public modal: boolean = false
  public item: any = null
  public isLoading: boolean = false

  //     data() {
  //       return {
  //         modal: false,
  //         item: null,
  //       };
  //     },

  //     mounted() {},

  openModal() {
    this.modal = true
    this.getPlaylist()
  }

  closeModal() {
    this.modal = false
  }
  //     methods: {
  //       openModal() {
  //         this.modal = true;
  //         this.getPlaylist();
  //       },

  //       closeModal() {
  //         this.modal = false;
  //       },

  async getPlaylist() {
    let res = null

    try {
      this.isLoading = true
      res = await this.$axios.$get(
        'https://api.spotify.com/v1/playlists/' + this.id,
        {
          headers: {
            Authorization: `Bearer ${
              this.$accessor.common.getToken || this.$accessor.login.userToken
            }`,
          },
        }
      )

      this.item = res
    } catch (err) {
      console.error(err)
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0.2rem;
  }
}
.card {
  border: 1px solid #eee;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;

  img {
    vertical-align: bottom;
  }
}

a {
  text-decoration: none;
  color: #000;
}
.meta {
  margin: 0;
  overflow: hidden;
  margin-left: 1rem;

  .title,
  .artist {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .title {
    font-weight: bolder;
  }

  .artist {
    font-size: 0.8rem;
  }
}
</style>
