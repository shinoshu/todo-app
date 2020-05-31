<template>
  <v-card class="task d-flex px-4 mb-4">
    <v-icon @click="addTask()">add</v-icon>
    <v-text-field
      v-model="task"
      class="px-4"
      label="タスクを追加する"
      autocomplete="off"
      @keydown.enter="onEnter"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      task: ''
    }
  },
  methods: {
    onEnter(event) {
      if (event.keyCode === 13) {
        this.addTask()
      }
    },
    addTask() {
      if (this.task) {
        this.$emit('added', this.task)
        this.task = ''
      }
    }
  }
}
</script>

<style scoped>
.task {
  width: 960px;
}
</style>
