<template>
  <form @submit.prevent="onSubmit">
    <select @change="onChange">
      <option value="track">track</option>
      <option value="artist">artist</option>
    </select>
    <input type="text" v-model="newItem" placeholder="query" name="textArea" />
    <button type="submit">search</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    searchType: String,
  },
  data() {
    return {
      newItem: null,
    };
  },

  methods: {
    ...mapMutations('common', ['setSearchType', 'setQuery']),

    onSubmit(e) {
      const { value: query } = e.target.textArea;

      if (query) {
        this.setQuery(query);
        this.$emit('onSearch');
        this.newItem = null;
      }
    },

    onChange(e) {
      const { value: newType } = e.target;
      this.setSearchType(newType);
    },
  },
};
</script>

<style scoped>
form {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

form input {
  width: 300px;
  margin-right: 10px;
  padding: 10px;
}

form select {
  margin-right: 10px;
}

form button {
  border: 1px;
  background-color: #000;
  color: #fff;
}
</style>
