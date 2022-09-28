<template>
  <div v-if="token">
    <ItemSearch @onSearch="getItemList" />
    <ItemList />
  </div>
  <div v-else>🤔</div>
</template>

<script lang="ts">
import ItemList from '../components/ItemList.vue'
import ItemSearch from '~/components/ItemSearch.vue'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  components: {
    ItemSearch,
    ItemList,
  },
})
export default class Search extends Vue {
  public get token(): String {
    return this.$accessor.common.token
  }

  public get searchType(): String {
    return this.$accessor.common.searchType
  }

  @Watch('searchType')
  public changeSearchType() {
    this.getItemList()
  }

  async getItemList() {
    if (this.$accessor.common.query) {
      try {
        const res = await this.$axios.$get(
          'https://api.spotify.com/v1/search',
          {
            params: {
              q: this.$accessor.common.query,
              type: this.$accessor.common.searchType,
              limit: 10,
            },
            headers: {
              Authorization: `Bearer ${this.$accessor.common.token}`,
            },
          }
        )

        let items = null
        if (res.tracks) {
          items = res.tracks.items
        } else {
          items = res.artists.items
        }

        this.$accessor.common.setSearchList(items)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
