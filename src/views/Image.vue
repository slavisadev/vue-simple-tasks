<template>
    <div class="home">
        <Navigation></Navigation>
        
        <div class="container-fluid">
            <div class="row">
                
                <Sidebar></Sidebar>
                
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div class="row">
                        <div class="col-12">
                            
                            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                        
                        
                        </div>
                        <div class="col-12">
                            <web-cam ref="webcam"
                                     width="100%"
                                     :deviceId="deviceId"
                                     @started="onStarted"
                                     @stopped="onStopped"
                                     @error="onError"
                                     @cameras="onCameras"
                                     @camera-change="onCameraChange"/>
                        </div>
                    </div>
                    
                    
                    <div class="row">
                        <div class="col-md-12">
                            <select v-model="camera">
                                <option>-- Select Device --</option>
                                <option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">{{
                                    device.label }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
                            <button type="button" class="btn btn-danger" @click="onStop">Stop Camera</button>
                            <button type="button" class="btn btn-success" @click="onStart">Start Camera</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h2>Captured Image</h2>
                            <figure class="figure">
                                <img :src="img" class="img-responsive"/>
                            </figure>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import { WebCam } from 'vue-web-cam';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import {find, head} from 'lodash';

export default {
    name: 'home',
    components: {
        Navigation,
        Sidebar,
        vueDropzone: vue2Dropzone,
        WebCam,
    },
    data: function () {
        return {
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { 'My-Awesome-Header': 'header value' },
            },
            img: null,
            camera: null,
            deviceId: null,
            devices: []
        };
    },
    computed: {
        device: function() {
            return find(this.devices, n => n.deviceId == this.deviceId);
        }
    },
    watch: {
        camera: function(id) {
            this.deviceId = id;
        },
        devices: function() {
            // Once we have a list select the first one
            let first = head(this.devices);
            if(first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
    methods: {
        onCapture() {
            this.img = this.$refs.webcam.capture();
        },
        onStarted(stream) {
            console.log('On Started Event', stream);
        },
        onStopped(stream) {
            console.log('On Stopped Event', stream);
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error, stream) {
            console.log('On Error Event', error, stream);
        },
        onCameras(cameras) {
            this.devices = cameras;
            console.log('On Cameras Event', cameras);
        },
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId
            console.log('On Camera Change Event', deviceId);
        }
    }
};
</script>
