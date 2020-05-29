<template>
  <Layout>
    <div>
      <h1>My info</h1>
      <h2>General</h2>
      <div>Full name: {{ user.name }}</div>
      <div>Username: {{ user.username }}</div>
      <div>Email: {{ user.email }}</div>
      <div>Phone: {{ user.phone }}</div>
      <h2>Update password</h2>
      <div>Input old password</div>
      <div>Input new password</div>
      <div>Input confirm new password</div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Account',
  data() {
    return {
      isLoading: true,
      user: {},
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      const user =
        localStorage.getItem('gotrue.user') &&
        JSON.parse(localStorage.getItem('gotrue.user'))

      if (!user || !user.id) {
        this.isLoading = false
        return
      }

      axios
        .get(`${process.env.GRIDSOME_API_URL}/getUser?userId=${user.id}`)
        .then((response) => {
          // handle success
          if (!response.data) {
            return
          }

          this.user = response.data
        })
        .catch((error) => {
          // handle error
          // @TODO display error message
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
