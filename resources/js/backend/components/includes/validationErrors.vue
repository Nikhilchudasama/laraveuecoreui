<template>
    <div class="alert alert-danger" v-if="errors.length ? true : false">
        <h5 class="alert-heading">The given data was invalid:</h5>

        <ul>
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "validationErrors",

        props: {
            errors: Array
        }
    }
</script>

<style>

</style>
