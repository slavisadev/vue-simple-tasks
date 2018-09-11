<template>
    <div>
        <form>
            <div class="form-group">
                <label for="task_name">Task name</label>
                <input
                    type="text"
                    class="form-control"
                    id="task_name"
                    v-model="task.name"
                    aria-describedby="emailHelp"
                    placeholder="Enter name">
            </div>
            <div class="form-group">
                <textarea
                    v-model="task.description"
                    class="form-control" id="task_description" placeholder="Enter description"></textarea>
            </div>
            <button
                type="submit"
                @click.prevent="addTask"
                class="btn btn-primary"
            >Submit
            </button>
        </form>
    </div>
</template>
<script>
/* eslint-disable no-console */
import { apiUrl } from '@/consts';
import axios from 'axios';

export default {
    name: 'AddTask',
    data() {
        return {
            task: {
                name: '',
                description: '',
            },
        };
    },
    created() {

    },
    methods: {
        addTask() {
            let url = apiUrl + 'tasks';
            let data = {
                name: this.task.name,
                description: this.task.description,
            };
            let headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            };

            axios.post(url, data, headers).then((response) => {
                this.$store.dispatch('tasks/initAll');
                this.task = {
                    name: '',
                    description: '',
                };
            }, (error) => {
                console.log(error);
            });
        },
    },
};
</script>