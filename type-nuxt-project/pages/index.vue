<template>
  <div>
    <img src="@/assets/image/img.webp" alt="main_image" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ItemSearch from '../components/ItemSearch.vue'

@Component({
  components: {
    ItemSearch,
  },
})
export default class Main extends Vue {
  public get query(): String {
    return this.$accessor.common.query
  }
}
</script>

<style>
img {
  max-width: 100%;
}
</style>
