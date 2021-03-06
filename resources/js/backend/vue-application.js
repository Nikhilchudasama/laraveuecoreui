import Vue from 'vue'
import Toasted from 'vue-toasted'
import router from "./router";
import { axiosInstance } from './services/axios'


Vue.use(Toasted, {
    iconPack : 'fontawesome',
    icon: 'check',
    theme: "bubble",
    duration: 5000
})
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import get from "bootstrap-vue/esm/utils/get";
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
    router,
    el: '#backend',
    data: {
        bodyClass : ''
    },
    methods: {
        notify(type, message) {
            const icon = type == 'success' ? 'check' : 'times';

            this.$toasted[type](message, {icon: icon});
        },
    },
});
