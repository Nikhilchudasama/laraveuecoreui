<template>

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-dark text-white py-1">
                    <h4 class="card-title d-inline-block pt-1">Users</h4>

                    <b-button variant="primary"
                              class="float-right round"
                              :to="{ name: 'AddUserForm' }"
                    >
                        <i class="fa fa-plus"></i>
                    </b-button>
                </div>

                <div class="card-content">
                    <div class="card-body">
                        <b-row class="mb-1">
                            <b-col>
                                <b-form inline @submit.prevent="">
                                    <b-form-select
                                        class="form-control"
                                        v-model="perPage"
                                        :options="{ '10': '10', '25': '25', '50': '50', '100': '100' }"
                                    />
                                </b-form>
                            </b-col>

                            <b-col>
                                <b-form inline class="pull-right" @submit.prevent="">
                                    <b-input class="round" placeholder="Search..." v-model="filter" />
                                </b-form>
                            </b-col>
                        </b-row>

                        <div class="table-responsive">
                            <b-table id="user-table"
                                     :items="fetchUser"
                                     :fields="fields"
                                     striped
                                     bordered
                                     responsive
                                     hover
                                     show-empty
                                     stacked="md"
                                     primary-key="user_id"
                                     :current-page="currentPage"
                                     :per-page="perPage"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :filter="filter"
                                     @filtered="onFiltered"
                            >

                                <template v-slot:cell(actions)="data">
                                    <router-link class="mr-1 btn btn-info btn-sm btn-brand"
                                                 :to="{ name: 'EditUserForm', params: { user: data.item.id } }"
                                    >
                                        <i class="fa fa-edit"></i>
                                    </router-link>

                                    <b-button size="sm"
                                              variant="danger"
                                              class="btn-brand"
                                              @click="displayDeleteModal(data.item.id, data.item.name)"
                                    >
                                        <i class="fa fa-trash"></i>
                                    </b-button>
                                </template>
                            </b-table>
                        </div>

                        <b-row class="mt-3">
                            <b-col>
                                Total records: {{ totalRows }}
                            </b-col>

                            <b-col>
                                <b-pagination
                                    align="right"
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                />
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </div>
        </div>

        <b-modal
            header-bg-variant="danger"
            header-text-variant="white"
            id="delete-user-modal"
            ref="delete-user-modal"
            title="Delete User"
            cancel-title="No, Cancel"
            ok-title="Yes, Delete User"
            ok-variant="danger"
            @ok="deleteUser"
        >
            Are you sure you want to delete {{ name }}?
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "index",

        data() {
            return {
                errors: [],
                currentPage: 1,
                isEdit: false,
                totalRows: 0,
                perPage: 10,
                sortBy: null,
                sortDesc: false,
                filter: null,
                deleteUserId: '',
                name: '',
                fields: [
                    {
                        key: 'name',
                    },
                    {
                        key: 'email',
                    },
                    {
                        key: 'actions',
                    }
                ],
            }
        },

        methods : {
            fetchUser () {
                var self = this;
                let params = {
                    per_page: this.perPage,
                    page: this.currentPage,
                    sort_by: this.sortBy,
                    sort_direction: this.sortDesc ? 'desc' : 'asc',
                    filter: this.filter || null,
                };
                return this.$api.get(
                    'admin/users', { params }
                ).then(function (response) {
                    self.totalRows = response.data.total_rows
                    return response.data.data
                }).catch(function (error) {
                    return [];
                });
            },

            onFiltered() {
                if (! this.filter) {
                    this.currentPage = 1
                }
            },

            displayDeleteModal(id, name) {
                this.deleteUserId = id;
                this.name = name;
                this.$bvModal.show('delete-user-modal')
            },

            deleteUser() {
                let self = this;
                this.$api.delete('admin/user/'+this.deleteUserId)
                    .then(function (response) {
                        self.$root.notify('success', 'User deleted successfully.');
                        self.deleteUserId = '';
                        self.username = '';
                        self.$root.$emit('bv::refresh::table', 'user-table')
                    }).catch(function (error) {
                    self.$root.notify('error', 'We can not delete user.');
                })
            },
        }
    }
</script>

<style>

</style>
