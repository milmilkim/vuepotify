<template>
  <div class="container">
    <header>
      <h1 class="cd">💿</h1>
    </header>
    <nav>
      <router-link to="/">main</router-link>
      <router-link to="/search">search</router-link>
      <router-link to="/playlist">playlist</router-link>
    </nav>

    <div v-if="token">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      artistList: null,
    };
  },

  create() {},
  mounted() {
    this.getToken();
  },

  computed: {
    ...mapState('common', ['token']),
  },

  methods: {
    ...mapActions('common', ['getToken']),
  },

  components: {},
};
</script>

<style lang="scss" scoped>
.container {
  header {
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
