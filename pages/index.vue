<template>
  <v-layout column justify-center align-center>
    <TodoTabs @selected="setSelectedTab" />
    <div class="mt-8">
      <AddTask @added="addTask" />
      <template v-for="todo in getTodoList">
        <TodoItem
          :key="todo.id"
          :todo="todo"
          @toggleDone="toggleDone"
          @toggleImportant="toggleImportant"
        />
      </template>
    </div>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import TodoTabs from '~/components/TodoTabs'
import AddTask from '~/components/AddTask'
import TodoItem from '~/components/TodoItem'

export default {
  components: { TodoTabs, AddTask, TodoItem },
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
    addTask(task) {
      const todo = {
        id: uuidv4(),
        name: task,
        done: false,
        important: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.addTodo(todo)
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
