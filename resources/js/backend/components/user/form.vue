<template>
    <div class="card">
        <validation-errors :errors="errors"></validation-errors>
        <form @submit.prevent="saveUserDetails" autocomplete="off">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-5">
                        <h4 class="card-title mb-0">
                            {{ user ? 'Edit' : 'Add' }} User
                        </h4>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-6 mb-1">
                        <fieldset class="form-group">
                            <label for="name">Name</label>
                            <input type="text"
                                   v-model="userForm.name"
                                   id="name"
                                   class="form-control"
                                   placeholder="Name"
                                   required
                            >
                        </fieldset>
                    </div>
                    <div class="col-12 col-sm-6 mb-1">
                        <fieldset class="form-group">
                            <label for="email">Email</label>
                            <input type="email"
                                   v-model="userForm.email"
                                   id="email"
                                   class="form-control"
                                   placeholder="Email"
                                   :readonly="user"
                                   :required="user ? false : true"
                            >
                        </fieldset>
                    </div>

                    <div class="col-12 col-sm-6 mb-1" v-if="!user">
                        <fieldset class="form-group">
                            <label for="password">Password</label>
                            <input type="password"
                                   v-model="userForm.password"
                                   id="password"
                                   class="form-control"
                                   placeholder="Password"
                                   required
                            >
                        </fieldset>
                    </div>

                    <div class="col-12 col-sm-6 mb-1" v-if="!user">
                        <fieldset class="form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <input type="password"
                                   v-model="userForm.password_confirmation"
                                   id="confirm-password"
                                   class="form-control"
                                   placeholder="Confirm Password"
                                   required
                            >
                        </fieldset>
                    </div>

                </div>
            </div>
            <div class="card-footer clearfix">
                <div class="row">
                    <div class="col-12 mb-1">
                        <button type="submit" class="btn btn-success round">
                            <i class="fa fa-check"></i>
                            {{ user ? 'Save' : 'Add' }}
                        </button>

                        <router-link class="btn btn-danger round"
                                     :to="{ name: 'User' }"
                        >
                            <i class="fa fa-times"></i>
                            Cancel
                        </router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    import { UserService } from '../../services/storage'
    import validationErrorMixin from '../../mixins/validationErrorMixin'
    import ValidationErrors from '../includes/validationErrors'

    export default {
        name: "form",
        props: [
            'user'
        ],
        mixins: [
            validationErrorMixin
        ],
        components: {
            ValidationErrors
        },

        data() {
            return {
                errors: [],
                isEdit: false,
                userForm:{
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
            }
        },

        methods: {
            saveUserDetails() {
                var self = this;
                this.errors = [];
                var url = this.user ? 'admin/user/'+this.user : 'admin/user';
                this.$api.post(url, this.userForm)
                    .then(function (response) {
                        var message = self.isEdit ? 'updated' : 'added';
                        self.$root.notify('success', 'User '+message+' successfully.');
                        self.$router.push({ name: 'User'});
                    }).catch(function (error) {
                    if (error.response) {
                        if (error.response.status == 422) {
                            self.pushToErrors(error.response.data.errors)
                        } else if (error.response.status == 401) {
                            self.errors.push(error.response.data.message)
                        }
                    }
                })
            },
        },

        created() {
            console.log(this.user);
            let self = this;
            if (this.user) {
                this.isEdit = true;
                this.$api.get('admin/user/'+this.user+'/edit')
                    .then(function (response) {
                        self.userForm = response.data.user;
                    }).catch(function (error) {
                    self.$root.notify('error', 'Something went wrong.');
                });
                return;
            }
        }


    }
</script>

<style>

</style>
