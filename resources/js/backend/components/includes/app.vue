<template>
    <div class="app-skeleton">
        <app-header></app-header>
        <div class="app-body">
            <sidebar></sidebar>
            <main class="main">
                <div class="container-fluid">
                    <div class="animated fadeIn">
                        <div class="content-header mt-5">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    import Sidebar from "./sidebar";
    import AppHeader from "./app-header";
    export default {
        name: "app",
        components: {AppHeader, Sidebar}
    }
</script>
<style>
    .app-skeleton{
        display: contents;
    }
</style>

