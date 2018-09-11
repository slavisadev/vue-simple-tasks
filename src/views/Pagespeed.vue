<template>
    <div class="home">
        <Navigation></Navigation>
        
        <div class="container-fluid">
            <div class="row">
                
                <Sidebar></Sidebar>
                
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Pagespeed</h1>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <form>
                                <div class="form-group">
                                    <label for="website_url">Website URL</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="website_url"
                                        v-model="websiteUrl"
                                        placeholder="Enter Website Url">
                                </div>
                                
                                <button
                                    type="submit"
                                    @click.prevent="getPagespeed"
                                    class="btn btn-primary"
                                >
                                    Get Insights
                                </button>
                            </form>
                        </div>
                        <div class="col-md-12" v-if="checkedSites.length > 0">
                            <ul>
                                <li v-for="(site, i) in checkedSites" :key="i">
                                    <strong>{{site.name}}: </strong> <span>grade: {{site.grade}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import AddTask from '@/components/forms/AddTask.vue';
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue';
import TaskList from '@/components/sections/TaskList.vue';
import Sidebar from '@/components/Sidebar.vue';
import { apiUrl } from '@/consts';
import axios from 'axios';

export default {
    name: 'pagespeed',
    components: {
        Navigation,
        Sidebar,
        TaskList,
        AddTask,
    },
    data() {
        return {
            API_URL: 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?',
            API_KEY: 'AIzaSyCJ4oqVMXUlDzN6HPaggp8hHiJ-mvgHgRY',
            optimizationResponse: null,
            optimizationData: null,
            optimizationPerformed: false,
            websiteUrl: '',
            speedGrade: 0,
            checkedSites: [],
            websites: [
                {
                    name: 'youqueen',
                    url: 'http://youqueen.com',
                },
                {
                    name: 'toposiguranje',
                    url: 'https://toposiguranje.rs',
                },
                {
                    name: 'scorpiomansecrets',
                    url: 'https://scorpiomansecrets.com',
                },
                {
                    name: 'capricornmansecrets',
                    url: 'https://capricornmansecrets.com',
                },
                {
                    name: 'aries',
                    url: 'https://ariesmansecrets.com',
                },
            ],
        };
    },
    created() {

    },
    methods: {
        
        getPagespeed() {
            
            this.websites.forEach(async site => {
                let url = apiUrl + 'pagespeed';
                let data = {
                    api_url: this.API_URL,
                    api_key: this.API_KEY,
                    website_url: site.url,
                };
                let headers = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                };

                await axios.post(url, data, headers).then((response) => {
                    this.optimizationPerformed = true;
                    let speedGrade = response.data.ruleGroups.SPEED.score;
                    this.checkedSites.push({
                        'name': site.name,
                        'grade': speedGrade,
                    });
                }, (error) => {
                    console.log(error);
                });
            });
        },
    },
};
</script>
