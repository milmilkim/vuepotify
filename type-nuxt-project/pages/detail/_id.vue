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
  <div v-else>아무일도 없었습니다</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  async asyncData({ params, $axios, $accessor }: any): Promise<any> {
    let res = null
    try {
      console.log('async Data')
      res = await $axios.$get(
        'https://api.spotify.com/v1/tracks/' + params.id,
        {
          headers: {
            Authorization: `Bearer ${$accessor.common.getToken}`,
          },
        }
      )

      return { trackInfo: res }
    } catch (err) {
      console.error(err)
    }
  },
})
export default class Detail extends Vue {
  public trackInfo: any | null = null

  get millisToMinutesAndSeconds(): String {
    const millis: number = this.trackInfo.duration_ms
    const minutes: number = Math.floor(millis / 60000)
    const seconds: number = Number(((millis % 60000) / 1000).toFixed(0))
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
}
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
