<template>
    <div class="home">
        <Navigation></Navigation>
        
        <div class="container-fluid">
            <div class="row">
                
                <Sidebar></Sidebar>
                
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Dashboard</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="btn-group mr-2">
                                <button class="btn btn-sm btn-outline-secondary">Share</button>
                                <button class="btn btn-sm btn-outline-secondary">Export</button>
                            </div>
                            <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                                <span data-feather="calendar"></span>
                                This week
                            </button>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-3">
                            <AddTask></AddTask>
                        </div>
                        <div class="col-9">
                            <TaskList></TaskList>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import Sidebar from '@/components/Sidebar.vue'
import AddTask from '@/components/forms/AddTask.vue'
import TaskList from '@/components/sections/TaskList.vue'

export default {
    name: 'home',
    components: {
        Navigation,
        Sidebar,
        TaskList,
        AddTask
    },
};
</script>
