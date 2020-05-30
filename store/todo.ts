import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Todo } from '~/types/todo'

export const state = () => ({
  todoList: [] as Todo[],
  selectedTab: 0
})

export type TodoState = ReturnType<typeof state>

export const getters: GetterTree<TodoState, TodoState> = {
  getTodoList: (state) => {
    if (state.selectedTab === 1) {
      return state.todoList.filter((todo) => todo.important)
    }
    if (state.selectedTab === 2) {
      return state.todoList.filter((todo) => !todo.done)
    }
    if (state.selectedTab === 3) {
      return state.todoList.filter((todo) => todo.done)
    }
    return state.todoList
  },
  getSelectedTab: (state) => state.selectedTab
}

export const actions: ActionTree<TodoState, TodoState> = {
  async fetchTodo({ commit }) {
    const response = await this.$axios.$get('/todo')
    commit('FETCH_TODO', response)
  },
  async addTodo({ commit }, todo: Todo) {
    const response = await this.$axios.$post('/todo', todo)
    commit('ADD_TODO', response)
  },
  async updateTodo({ commit }, todo: Todo) {
    const response = await this.$axios.$put(`/todo/${todo.id}`, todo)
    commit('UPDATE_TODO', response)
  },
  setSelectedTab({ commit }, selectedTab: number) {
    commit('SET_SELECTED_TAB', selectedTab)
  }
}

export const mutations: MutationTree<TodoState> = {
  FETCH_TODO: (state, todoList: Todo[]) => {
    state.todoList.push(...todoList)
  },
  ADD_TODO: (state, todo: Todo) => {
    state.todoList.push(todo)
  },
  UPDATE_TODO: (state, todo: Todo) => {
    const index = state.todoList.findIndex((value) => value.id === todo.id)
    if (index >= 0) {
      state.todoList.splice(index, 1, todo)
    }
  },
  SET_SELECTED_TAB: (state, selectedTab: number) => {
    state.selectedTab = selectedTab
  }
}
