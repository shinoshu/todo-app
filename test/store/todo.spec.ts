import { Todo } from '~/types/todo'

import { state, getters, actions, mutations } from '~/store/todo'

const todo = {
  id: '1',
  name: 'name',
  done: true,
  important: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

const todoList: Todo[] = [
  {
    id: '1',
    name: 'name',
    done: false,
    important: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'name',
    done: true,
    important: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'name',
    done: false,
    important: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'name',
    done: true,
    important: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const expected: Todo[] = [
  {
    id: '1',
    name: 'name',
    done: true,
    important: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'name',
    done: true,
    important: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'name',
    done: false,
    important: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'name',
    done: true,
    important: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

describe('getters', () => {
  test('getTodoList', () => {
    let result

    result = (getters as any).getTodoList({ todoList, selectedTab: 0 })
    expect(result).toEqual(todoList)

    result = (getters as any).getTodoList({ todoList, selectedTab: 1 })
    expect(result).toEqual(todoList.filter((todo) => todo.important))

    result = (getters as any).getTodoList({ todoList, selectedTab: 2 })
    expect(result).toEqual(todoList.filter((todo) => !todo.done))

    result = (getters as any).getTodoList({ todoList, selectedTab: 3 })
    expect(result).toEqual(todoList.filter((todo) => todo.done))
  })

  test('getSelectedTab', () => {
    const result = (getters as any).getSelectedTab({ todoList, selectedTab: 0 })
    expect(result).toEqual(0)
  })
})

describe('actions', () => {
  test('fetchTodo', async () => {
    const $axios = { $get: jest.fn(() => todoList) }
    const commit = jest.fn()

    const fetchTodo = (actions as any).fetchTodo.bind({ $axios })
    await fetchTodo({ commit })

    expect(commit).toHaveBeenCalledWith('FETCH_TODO', todoList)
  })

  test('addTodo', async () => {
    const $axios = { $post: jest.fn(() => todo) }
    const commit = jest.fn()

    const addTodo = (actions as any).addTodo.bind({ $axios })
    await addTodo({ commit })

    expect(commit).toHaveBeenCalledWith('ADD_TODO', todo)
  })

  test('updateTodo', async () => {
    const $axios = { $put: jest.fn(() => todo) }
    const commit = jest.fn()

    const addTodo = (actions as any).updateTodo.bind({ $axios })
    await addTodo({ commit }, todo)

    expect(commit).toHaveBeenCalledWith('UPDATE_TODO', todo)
  })

  test('setSelectedTab', async () => {
    const commit = jest.fn()

    const setSelectedTab = (actions as any).setSelectedTab
    await setSelectedTab({ commit }, 1)

    expect(commit).toHaveBeenCalledWith('SET_SELECTED_TAB', 1)
  })
})

describe('mutations', () => {
  test('FETCH_TODO', () => {
    const _state = state()

    const FETCH_TODO = (mutations as any).FETCH_TODO
    FETCH_TODO(_state, todoList)

    expect(_state).toEqual({ selectedTab: 0, todoList })
  })

  test('ADD_TODO', () => {
    const _state = state()

    const ADD_TODO = (mutations as any).ADD_TODO
    ADD_TODO(_state, todo)

    expect(_state).toEqual({ selectedTab: 0, todoList: [todo] })
  })

  test('UPDATE_TODO', () => {
    const _state = { ...state(), todoList: todoList.concat() }

    const UPDATE_TODO = (mutations as any).UPDATE_TODO
    UPDATE_TODO(_state, todo)

    expect(_state).toEqual({ selectedTab: 0, todoList: expected })
  })

  test('SET_SELECTED_TAB', () => {
    const _state = state()

    const SET_SELECTED_TAB = (mutations as any).SET_SELECTED_TAB
    SET_SELECTED_TAB(_state, 1)

    expect(_state).toEqual({ selectedTab: 1, todoList: [] })
  })
})
