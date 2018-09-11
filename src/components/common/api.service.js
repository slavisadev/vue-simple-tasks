import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';

Vue.axios = axios;
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = 'https://najblizibankomat.com/';
  },
  setHeader() {
    let tokenData = JSON.parse(window.localStorage.getItem('authUser'));
    Vue.axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + tokenData.access_token;
    Vue.axios.defaults.headers.common[ 'Accept' ] = 'application/json';
  },
  query(resource, params) {
    return Vue.axios
      .get(resource, params)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },
  get(resource, params = {}) {
    return Vue.axios
      .get(`${resource}`, {
        params: params,
      })
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },
  put(resource, params) {
    return Vue.axios
      .put(`${resource}`, params);
  },
  delete(resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },
};
export default ApiService;