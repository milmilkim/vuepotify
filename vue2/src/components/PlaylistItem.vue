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
        <template slot="footer"> </template>
        <!-- /footer -->
      </MyModal>
    </div>
  </div>
</template>

<script>
import MyModal from './MyModal.vue';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  props: {
    name: {
      requre: true,
      type: String,
    },
    imageUrl: {
      type: String,
      requre: false,
    },
    id: {
      require: true,
      type: String,
    },
  },

  data() {
    return {
      modal: false,
      item: null,
    };
  },

  mounted() {},

  methods: {
    openModal() {
      this.modal = true;
      this.getPlaylist();
    },

    closeModal() {
      this.modal = false;
    },

    async getPlaylist() {
      let res = null;

      try {
        res = await axios.get('https://api.spotify.com/v1/playlists/' + this.id, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.item = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },

  computed: {
    ...mapState('common', ['token']),
  },

  components: {
    MyModal,
  },
};
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
