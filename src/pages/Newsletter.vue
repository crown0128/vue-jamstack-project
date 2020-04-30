<template>
  <Layout>
    <form name="Newsletter Form" method="POST" @submit.prevent="register">
      <div>
        <input type="email" name="email" placeholder="Enter your email address..." v-model="email" />
      </div>
      <button type="submit">Send</button>
    </form>
    <p v-if="isSuccessful">{{ successMessage }}</p>
    <p v-if="!isSuccessful && errorMessage">{{ errorMessage }}</p>
  </Layout>
</template>

<script>
import axios from "axios";

export default {
  name: "Newsletter",
  data() {
    return {
      email: "",
      errorMessage: null,
      isSuccessful: false,
      successMessage: "You subscribed successfully!"
    };
  },
  watch: {
    email: function(newValue, oldValue) {
      this.isSuccessful = false;
      if (this.errorMessage && !oldValue.length && newValue.length) {
        this.errorMessage = null;
      }
      if (!this.errorMessage && !newValue.length) {
        this.errorMessage = "Email cannot be empty";
      }
      // @TODO check email format
    }
  },
  methods: {
    register() {
      // @TODO check email format
      this.isSuccessful = false;
      if (!this.email || !this.email.length) {
        this.errorMessage = "Email cannot be empty";
        return;
      }

      axios
        .post(`${process.env.GRIDSOME_API_URL}/mailchimp`, {
          body: { email: this.email }
        })
        .then(response => {
          // handle success
          this.isSuccessful = true;
        })
        .catch(error => {
          // handle error
          // @TODO display error message
          console.log(error);
        });
    }
  }
};
</script>
