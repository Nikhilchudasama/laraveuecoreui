<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <validation-errors :errors="errors"></validation-errors>

                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form  @submit.prevent="loginSubmit">
                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input v-model="loginDetails.email" type="email" class="form-control" value="" required autocomplete="email" autofocus>

                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input v-model="loginDetails.password" type="password" class="form-control" required autocomplete="current-password">

                                </div>
                            </div>


                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

<!--                                    <a class="btn btn-link" href="">-->
<!--                                        Forgot Password?-->
<!--                                    </a>-->
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { UserService } from '../../services/storage'
    import  validationErrorMixin from '../../mixins/validationErrorMixin'
    import  ValidationErrors from '../includes/validationErrors'
    export default {
        name: "login",

        mixins: [
            validationErrorMixin
        ],

        components: {
            ValidationErrors
        },

        data() {
            return {
                errors: [],
                loginDetails: {
                    email: '',
                    password: '',
                }
            }
        },

        methods:{
            loginSubmit() {
                var self = this;

                this.$api.post(
                    'admin/login',
                    this.loginDetails
                ).then(function (response) {
                    self.loginDetails.email = "";
                    self.loginDetails.password = "";
                    UserService.saveUser(response.data.user)
                    self.$root.notify('success', 'Logged in successfully.');
                    window.location = 'dashboard';
                }).catch(function (error) {
                    if (error.response) {
                        if (error.response.status == 422) {
                            self.pushToErrors(error.response.data.errors)
                        } else if (error.response.status == 401) {
                            self.errors = [],
                            self.errors.push(error.response.data.message)
                        }
                    }
                });

            }
        },

        mounted() {
            if (this.$route.query.action == 'session-expired') {
                this.$toasted.error(
                    'Your session has expired. Please login again.',
                    { icon: 'times', duration: 5000 }
                )
            }
        }
    }
</script>

<style>

</style>
