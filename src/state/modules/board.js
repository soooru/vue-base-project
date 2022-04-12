import defaultBoard from '@/data/default-board'
import uuid from '@/utils/uuid'
import Vue from 'vue'
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

const state = {
  board,
}

const getters = {
  getTask(state) {
    return (id) => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task
          }
        }
      }
    }
  },
}

const mutations = {
  CREATE_TASK(state, { tasks, name }) {
    tasks.push({
      name,
      id: uuid(),
      description: '',
    })
  },
  UPDATE_TASK(state, { task, key, value }) {
    task[key] = value
    Vue.set(task, key, value)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
