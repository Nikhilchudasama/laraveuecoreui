export default {
    methods: {
        pushToErrors(errors) {
            Object.keys(errors).forEach(k => this.errors.push(errors[k][0]))
        },
    }
};
