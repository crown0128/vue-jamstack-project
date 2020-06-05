<template>
  <Layout>
    <div class="container mx-auto mb-20">
      <h1 class="text-4xl text-coffee border-b border-coffee mb-3 tracking-widest text-center mx-auto">My info</h1>
      <div class="grid grid-rows-2">
        <form name="infoUpdate" method="post" @submit.prevent="updateUserInfo" class="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div class="mx-auto my-6 w-full px-64">
            <p class="text-2xl text-granny mb-8 tracking-widest text-center border-b border-granny">General</p>
            <div class="mb-4">
              <label for="name" class="block mb-2">Email</label>
              <input v-model="user.email" type="email" name="name" class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" disabled />
            </div>
            <div class="mb-4">
              <label for="name" class="block mb-2">Full name</label>
              <input v-model="user.name" type="text" name="name" class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex items-center text-right mt-4">
              <div class="w-2/3 text-right pr-3">
                <p v-if="isSuccessful">
                  {{ successMessage }}
                </p>
                <p class="text-red-500" v-if="!isSuccessful && errorMessage">
                  {{ errorMessage }}
                </p>
              </div>
              <button class="w-1/3 px-4 py-2 transition duration-500 ease-in-out tracking-wider leading-none border rounded bg-coffee text-white hover:bg-dark-coffee lg:mt-0 focus:outline-none focus:shadow-outline">
                Update information
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import netlifyIdentity from "netlify-identity-widget";

export default {
  name: "Account",
  data() {
    return {
      errorMessage: null,
      isLoading: true,
      isSuccessful: false,
      successMessage: "Information updated successfully !",
      user: {}
    };
  },
  mounted() {
    this.getUser();
  },
  watch: {
    user: {
      deep: true,
      handler() {
        this.isSuccessful = false;
        this.errorMessage = null;
      }
    }
  },
  methods: {
    getUser() {
      this.isSuccessful = false;
      this.errorMessage = null;
      const user =
        localStorage.getItem("gotrue.user") &&
        JSON.parse(localStorage.getItem("gotrue.user"));

      if (!user || !user.id) {
        this.isLoading = false;
        return;
      }

      axios
        .get(`${process.env.GRIDSOME_API_URL}/getUser?userId=${user.id}`)
        .then(response => {
          // handle success
          if (!response.data) {
            return;
          }

          this.user = response.data;
        })
        .catch(error => {
          this.isSuccessful = false;
          this.errorMessage =
            "An error occured while fetching your information. Please try again later.";
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateUserInfo() {
      this.isSuccessful = false;
      this.errorMessage = null;

      const user_metadata = {
        data: {
          full_name: this.user.name,
          phone: this.user.phone
        }
      };
      netlifyIdentity.gotrue
        .currentUser()
        .update(user_metadata)
        .then(() => {
          return this.updateUserInfoInDB();
        })
        .then(() => {
          this.isSuccessful = true;
          console.log("display message");
        })
        .catch(error => {
          this.isSuccessful = false;
          this.errorMessage =
            "Something went wrong while saving your information. Please try again later.";
        });
    },
    updateUserInfoInDB() {
      return axios.post(`${process.env.GRIDSOME_API_URL}/updateUserInfo`, {
        user: this.user
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
