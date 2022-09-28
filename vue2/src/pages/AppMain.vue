<template>
  <div>
    <img src="../assets/img.webp" alt="main_image" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState('common', ['myState', 'token']),
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
</style>
