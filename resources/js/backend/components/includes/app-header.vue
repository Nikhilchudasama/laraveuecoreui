<template>
        <header class="app-header navbar">
            <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link class="nav-link" :to="{ name: 'Dashboard' }">
                <img class="navbar-brand-full" src="/images/backend/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
                <img class="navbar-brand-minimized" src="/images/backend/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
            </router-link>
            <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
                <span class="navbar-toggler-icon"></span>
            </button>

            <ul class="nav navbar-nav d-md-down-none">
                <li class="nav-item px-3">
                    <a class="nav-link" href=""><i class="fas fa-home"></i></a>
                </li>

                <li class="nav-item px-3">
                    <router-link class="nav-link" :to="{ name: 'Dashboard' }">
                        Dashboard
                    </router-link>
                </li>
            </ul>

            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item d-md-down-none">
                    <a class="nav-link" href="#">
                        <i class="fas fa-bell"></i>
                    </a>
                </li>
                <li class="nav-item d-md-down-none">
                    <a class="nav-link" href="#">
                        <i class="fas fa-list"></i>
                    </a>
                </li>
                <li class="nav-item d-md-down-none">
                    <a class="nav-link" href="#">
                        <i class="fas fa-map-marker-alt"></i>
                    </a>
                </li>
                <li class="nav-item dropdown mr-4">
                    <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src="/images/backend/assets/img/avatars/1.jpg" class="img-avatar" alt="">
                        <span class="d-md-down-none">John</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div class="dropdown-header text-center">
                            <strong>Account</strong>
                        </div>
                        <a class="dropdown-item" @click.stop.prevent="logout">
                            <i class="fas fa-lock"></i> Logout
                        </a>
                    </div>
                </li>
            </ul>
        </header>
</template>

<script>
    import { UserService } from '../../services/storage'

    export default {
        name: "app-header",
        methods: {
            logout() {
                let self = this
                this.$api.post('admin/logout')
                    .then(function () {
                        UserService.removeUser()
                        self.$root.notify('success', 'Logged out successfully.');
                        self.$router.push({name: 'Login'});
                        location.reload();
                    })
                    .catch(function () {
                        self.$root.notify('error', 'An error occurred.');
                    })
            }
        }
    }
</script>
