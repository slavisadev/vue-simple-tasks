<template>
    <div>
        <h2>Tasks backlog</h2>

        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Assignee</th>
                    <th>remove</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(task, i) in allTasks" :key="task._id">
                    <td>{{ i+1 }}</td>
                    <td>{{task.name}}</td>
                    <td>{{task.description}}</td>
                    <td>Slavisa</td>
                    <td><a href="#" @click.prevent="removeTask(task._id)">x</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
  import {apiUrl} from '@/consts';
  import axios from 'axios';
  import {mapGetters} from 'vuex';

  export default {
    name: 'TaskList',
    data() {
      return {};
    },
    computed: {
      ...mapGetters('tasks', [
        'allTasks'
      ])
    },
    created() {
      this.$store.dispatch('tasks/initAll');
    },
    methods: {
      removeTask(id) {
        axios.delete(apiUrl + 'tasks/' + id)
          .then((response) => {
            this.$store.dispatch('tasks/initAll');
          }, (error) => {
            console.log(error);
          });
      }
    },
  };
</script>