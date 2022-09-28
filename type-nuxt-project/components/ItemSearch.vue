<template>
  <form @submit.prevent="onSubmit">
    <select @change="onChange">
      <option value="track">track</option>
      <option value="artist">artist</option>
    </select>
    <input type="text" placeholder="query" name="textArea" />
    <button type="submit">search</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ItemSearch extends Vue {
  onSubmit(e: any) {
    const { value: query } = e.target.textArea

    if (query) {
      this.$accessor.common.setQuery(query)
      this.$emit('onSearch')
    }
  }

  onChange(e: any) {
    const { value: newType } = e.target
    this.$accessor.common.setSearchType(newType)
  }
}
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
