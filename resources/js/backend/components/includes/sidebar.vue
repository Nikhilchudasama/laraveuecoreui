<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-title">
                    General
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'Dashboard' }">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        Dashboard
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'User' }">
                        <i class="nav-icon fas fa-user"></i>
                        User
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "sidebar"
    }
</script>
