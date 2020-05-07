<template>
    <div class="app flex-row align-items-center">
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <validation-errors :errors="errors"></validation-errors>

                <div class="card">
                    <div class="card-header">Reset Your Password</div>

                    <div class="card-body">
                        <form  @submit.prevent="resetPasswordSubmit">
                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input type="text"
                                           class="form-control"
                                           placeholder="Your Email"
                                           v-model="reset_password_form.email"
                                           readonly
                                    >

                                </div>
                            </div>

                            <div class="form-group row">
                                <label  class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input type="password"
                                           class="form-control"
                                           placeholder="Your Confirm Password"
                                           v-model="reset_password_form.password_confirmation"
                                           required
                                    >

                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                <div class="col-md-6">
                                    <input type="password"
                                           class="form-control"
                                           placeholder="Your Password"
                                           v-model="reset_password_form.password"
                                           required
                                    >

                                </div>
                            </div>


                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                                        Reset Password
                                    </button>
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
        name: "resetPassword",

        components: {
            ValidationErrors
        },

        data() {
            return {
                errors: [],
                isDisabled: false,
                reset_password_form: {
                    token: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
            }
        },

        methods: {
            resetPasswordSubmit() {
                var self = this;
                this.isDisabled = true;

                this.$api.post(
                    '/admin/reset-password',
                    this.reset_password_form
                ).then(function (response) {
                    self.isDisabled = false;
                    self.reset_password_form.token = '';
                    self.reset_password_form.email = '';
                    self.reset_password_form.password = '';
                    self.reset_password_form.password_confirmation = '';
                    console.log(response);

                    UserService.saveUser(response.data.user)

                    self.$root.notify('success', 'Password reset successfully.');

                    self.$router.push({ name: 'Dashboard'});
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
            this.reset_password_form.token = this.$route.params.token;
            this.reset_password_form.email = this.$route.params.email;
        }
    }
</script>

<style>

</style>
