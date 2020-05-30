<template>
  <v-layout column justify-center align-center>
    <v-tabs @change="setSelectedTab">
      <v-tab>すべて</v-tab>
      <v-tab>重要</v-tab>
      <v-tab>未完了</v-tab>
      <v-tab>完了</v-tab>
    </v-tabs>
    <div class="mt-8">
      <v-card class="todo d-flex px-4 mb-4">
        <v-icon @click="addTask">add</v-icon>
        <v-text-field
          v-model="task"
          class="px-4"
          label="タスクを追加する"
          autocomplete="off"
          @keydown.enter="onEnter"
        ></v-text-field>
        <span class="mr-auto"></span>
      </v-card>

      <template v-for="todo in getTodoList">
        <v-card :key="todo.id" class="todo d-flex px-4 mb-4">
          <v-icon v-if="!todo.done" color="green" @click="toggleDone(todo)"
            >radio_button_unchecked</v-icon
          >
          <v-icon v-if="todo.done" color="green" @click="toggleDone(todo)"
            >check_circle</v-icon
          >

          <v-card-title>{{ todo.name }}</v-card-title>
          <span class="mr-auto"></span>

          <v-icon
            v-if="!todo.important"
            color="red"
            @click="toggleImportant(todo)"
            >favorite_border</v-icon
          >
          <v-icon
            v-if="todo.important"
            color="red"
            @click="toggleImportant(todo)"
            >favorite</v-icon
          >
        </v-card>
      </template>
    </div>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      task: '',
      todoList: [],
      selectedTab: 0
    }
  },
  computed: {
    ...mapGetters('todo', ['getTodoList'])
  },
  created() {
    this.fetchTodo()
  },
  methods: {
    ...mapActions('todo', [
      'fetchTodo',
      'addTodo',
      'updateTodo',
      'setSelectedTab'
    ]),
    onEnter(event) {
      if (event.keyCode === 13) {
        this.addTask()
      }
    },
    addTask() {
      if (!this.task) {
        return
      }

      const todo = {
        id: uuidv4(),
        name: this.task,
        done: false,
        important: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.addTodo(todo)

      this.task = ''
    },
    toggleDone(todo) {
      this.updateTodo({ ...todo, done: !todo.done })
    },
    toggleImportant(todo) {
      this.updateTodo({ ...todo, important: !todo.important })
    }
  }
}
</script>

<style scoped>
.todo {
  width: 960px;
}
</style>
