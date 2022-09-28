<template>
  <div class="container">
    <header>
      <h1 class="cd">💿</h1>
    </header>
    <nav>
      <NuxtLink to="/">main</NuxtLink>
      <NuxtLink to="/search">search</NuxtLink>
      <NuxtLink to="/playlist">playlist</NuxtLink>
    </nav>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
  mounted() {
    this.$accessor.common.postAuth()
  }
}
</script>

<style lang="scss" scoped>
.container {
  header {
    img {
      max-width: 100%;
    }
    h1.cd {
      text-align: center;
      width: 100%;
      animation-name: animation;
      animation-duration: 1s;
      animation-timing-function: ease;
      animation-fill-mode: backwards;
      animation-delay: 500ms;
      animation-iteration-count: infinite;
    }
  }

  @keyframes animation {
    0% {
      transform: rotateX(0);
    }

    50% {
      transform: rotateX(180deg);
    }

    100% {
      transform: rotateX(180deg);
    }
  }
  width: 500px;
  margin: auto;
  padding: 20px;
  border: solid 1px #eee;
}

nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    padding: 0.5rem;

    &:visited {
      color: #000;
    }
  }
}
</style>
