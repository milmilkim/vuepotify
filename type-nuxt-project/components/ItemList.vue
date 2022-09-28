<template>
  <div v-if="searchList">
    <!--트랙-->
    <ul v-if="searchType === 'track'">
      <li class="card" v-for="item in searchList" v-bind:key="item?.id">
        <img :src="item?.album?.images[2].url" width="50px" />
        <ul class="meta">
          <NuxtLink v-bind:to="`/detail/${item.id}`">
            <li class="title">
              {{ item?.name }}
            </li>
            <li class="artist">
              {{
                item?.artists
                  ?.map((v) => v.name)
                  .join(', ')
                  .toString()
              }}
            </li>
            <li class="duration">
              {{ millisToMinutesAndSeconds(item?.duration_ms) }}
            </li>
          </NuxtLink>
        </ul>
      </li>
    </ul>
    <!--아티스트-->
    <ul v-if="searchType === 'artist'">
      <li class="card" v-for="item in searchList" v-bind:key="item?.id">
        <div v-if="item.images">
          <img :src="item?.images[2]?.url" width="50px" />
        </div>
        <ul class="meta">
          <NuxtLink to="/">
            <li class="title">
              {{ item.name }}
            </li>
          </NuxtLink>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else>😴</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ItemList extends Vue {
  public get searchList() {
    return this.$accessor.common.searchList
  }

  public get searchType(): String {
    return this.$accessor.common.searchType
  }

  public millisToMinutesAndSeconds(millis: number): String {
    const minutes: number = Math.floor(millis / 60000)
    const seconds: string = ((millis % 60000) / 1000).toFixed(0)
    return (
      minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds.toString()
    )
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.card {
  border: 1px solid #eee;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  img {
    vertical-align: bottom;
  }
}

.meta {
  margin-left: 1rem;
  overflow: hidden;

  a {
    text-decoration: none;
    color: #000;
  }

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

  .duration {
    font-size: 0.5rem;
  }
}
</style>
