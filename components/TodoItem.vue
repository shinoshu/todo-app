<template>
  <v-card :key="todo.id" class="todo d-flex px-4 mb-4">
    <v-icon v-if="!todo.done" color="green" @click="toggleDone(todo)"
      >radio_button_unchecked</v-icon
    >
    <v-icon v-if="todo.done" color="green" @click="toggleDone(todo)"
      >check_circle</v-icon
    >

    <v-card-title>{{ todo.name }}</v-card-title>
    <span class="mr-auto"></span>

    <v-icon v-if="!todo.important" color="red" @click="toggleImportant(todo)"
      >favorite_border</v-icon
    >
    <v-icon v-if="todo.important" color="red" @click="toggleImportant(todo)"
      >favorite</v-icon
    >
  </v-card>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleDone(todo) {
      this.$emit('updated', { ...todo, done: !todo.done })
    },
    toggleImportant(todo) {
      this.$emit('updated', { ...todo, important: !todo.important })
    }
  }
}
</script>

<style scoped>
.todo {
  width: 960px;
}
</style>
