import ApiService from '../components/common/api.service';
import { API_URL } from '../components/config';

function initialState() {
  return {
    tasks: []
  };
}

const tasks = {
  namespaced: true,
  state: {
    initialState: initialState,
    tasks: initialState().tasks
  },
  getters: {
    allTasks: state => {
      return state.tasks;
    },
    task: state => {
      return state.task;
    },
    tasksCount(state) {
      return state.tasksCount;
    },
    istaskValid(state) {
      return state.validtask;
    },
  },
  mutations: {
    'INIT_TASK'(state, id) {
      return new Promise((resolve) => {
        
        ApiService
          .get(API_URL + '/tasks/' + id)
          .then(response => {
            if (response.status === 200) {
              state.task = response;
            }
          });
      });
    },
    'INIT_ALL'(state) {
      return new Promise((resolve) => {
        ApiService
          .get(API_URL + '/tasks')
          .then(response => {
            if (response.status === 200) {
              state.tasks = response.data;
            }
          });
      });
    },
    'EDIT_TASK'(state, task) {
      return new Promise((resolve) => {

        ApiService
          .put(API_URL + '/tasks/' + task._id , {
            ...task
          })
          .then(response => {
            if (response.status === 200) {
              state.task = response.data;
            }
          });
      });
    },
    'DELETE_TASK'(state, task) {
      return new Promise((resolve) => {

        ApiService
          .delete(API_URL + '/tasks/' + task._id)
          .then(response => {
            if (response.status === 200) {
              console.log('task edited');
            }
          });
      });
    },
    'VALIDATE_TASK'(state, taskData) {
      state.validtask = taskData.title !== '';
      if (!state.validtask) {
        state.errorMessages.push('Title is not valid');
      } else {
        state.errorMessages = [];
      }
    },
    'SET_TASKS_NULL'(state) {
      state.tasks = initialState().tasks;
    },
  },
  actions: {
    addtask: ({ commit, dispatch }, taskData) => {
      commit('ADD_task', taskData);
      dispatch('setModalState', false, { root: true });
    },
    edittask: ({ commit, dispatch }, taskData) => {
      commit('EDIT_task', taskData);
      dispatch('setModalState', false, { root: true });
    },
    deletetask: ({ commit, dispatch }, taskData) => {
      commit('DELETE_task', taskData);
      dispatch('setModalState', false, { root: true });
    },
    validatetask: ({ commit }, taskData) => {
      commit('VALIDATE_task', taskData);
    },
    initAll: ({ commit}) => {
      commit('INIT_ALL');
    },
    resettasks: ({commit}) => {
      commit('SET_tasks_NULL');
    }
  },
};
export default tasks;
