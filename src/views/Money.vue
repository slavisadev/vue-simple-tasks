<template>
    <div class="home">
        <Navigation></Navigation>
        
        <div class="container-fluid">
            <div class="row">
                
                <Sidebar></Sidebar>
                
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div class="row">
                        <div class="col-6">
                            <MoneyIn></MoneyIn>
                        </div>
                        <div class="col-6">
                            <MoneyOut></MoneyOut>
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
import MoneyIn from '@/components/sections/MoneyIn.vue'
import MoneyOut from '@/components/sections/MoneyOut.vue'

export default {
    name: 'money',
    components: {
        Navigation,
        MoneyOut,
        MoneyIn,
        Sidebar
    },
};
</script>
