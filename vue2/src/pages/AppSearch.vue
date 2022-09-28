<template>
  <div v-if="token">
    <ItemSearch :searchType="searchType" @onSearch="getItemList" />
    <ItemList v-bind:propsData="itemList" :searchType="searchType" />
  </div>
  <div v-else>🤔</div>
</template>

<script>
import axios from 'axios';
import ItemList from '../components/ItemList.vue';
import ItemSearch from '../components/ItemSearch.vue';

import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      itemList: null,
    };
  },

  mounted() {},

  computed: {
    ...mapState('common', ['token', 'searchType', 'query']),
  },

  watch: {
    searchType() {
      this.getItemList();
    },
  },

  methods: {
    ...mapMutations('common', ['setSearchList']),

    async getItemList() {
      if (this.query) {
        try {
          const res = await axios.get('https://api.spotify.com/v1/search', {
            params: {
              q: this.query,
              type: this.searchType,
              limit: 10,
            },
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          let items = null;
          if (res.data.tracks) {
            items = res.data.tracks.items;
          } else {
            items = res.data.artists.items;
          }

          this.setSearchList(items);
        } catch (err) {
          console.error(err);
        }
      }
    },
  },

  components: {
    ItemSearch,
    ItemList,
  },
};
</script>

<style lang="scss" scoped></style>
