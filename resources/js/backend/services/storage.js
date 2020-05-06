const UserService = {
    getUser() {
        let user = localStorage.getItem('user')
        if (user === null) {
            return false
        }

        return JSON.parse(user)
    },

    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    setUserAttribute(key, value) {
        let user = this.getUser()

        user[key] = value

        localStorage.setItem('user', JSON.stringify(user));
    },

    removeUser() {
        localStorage.removeItem('user')
    }
}
export { UserService }
