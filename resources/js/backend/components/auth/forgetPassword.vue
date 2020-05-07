<template>
    <div class="app flex-row align-items-center">
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <validation-errors :errors="errors"></validation-errors>

                <div class="card">
                    <div class="card-header">Forgot Password</div>

                    <div class="card-body">
                        <form  @submit.prevent="forgotPasswordSubmit">
                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input v-model="forgotPasswordEmail" type="email" class="form-control" value="" required autocomplete="email" placeholder="Your Email" autofocus>

                                </div>
                            </div>



                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                                        Forgot Password
                                    </button>

                                    <router-link class="btn btn-link" :to="{ name: 'Login'}">Login</router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import { UserService } from '../../services/storage'
    import  ValidationErrors from '../includes/validationErrors'

    export default {
        name: "forgetPassword",

        components: {
            ValidationErrors
        },

        data() {
            return {
                errors: [],
                isDisabled: false,
                successText: '',
                forgotPasswordEmail: ''
            }
        },

        methods: {
            forgotPasswordSubmit() {
                var self = this;
                this.isDisabled = true;

                this.$api.post(
                    '/admin/forgot-password',
                    { email: this.forgotPasswordEmail }
                ).then(function (response) {
                    self.isDisabled = false;
                    self.forgotPasswordEmail = '';

                    self.successText = 'success';
                    self.$root.notify('success', 'Mail sent your account');
                }).catch(function (error) {
                    self.isDisabled = false;

                    if (error.response) {
                        if (error.response.status == 422) {
                            self.pushToErrors(error.response.data.errors)
                        } else if (error.response.status == 401) {
                            self.errors.push(error.response.data.message)
                        }
                    }
                });
            },

            pushToErrors(errors) {
                Object.keys(errors).forEach(k => this.errors.push(errors[k][0]))
            },
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
