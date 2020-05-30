<template>
  <Layout>
    <div class="container mx-auto">
      <h1
        class="text-4xl text-coffee border-b border-coffee mb-3 tracking-widest text-center mx-auto"
      >
        Contact Us
      </h1>

      <div class="w-full ">
        <div class="w-full max-w-lg mx-auto">
          <form
            name="contact"
            method="post"
            action="/contact/success"
            data-netlify="true"
            class="bg-white rounded px-8 pt-6 pb-8 mb-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div class="mb-4">
              <label for="name" class="block mb-2">Your name</label>
              <input
                type="text"
                name="name"
                class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block mb-2">Your email</label>
              <input
                type="email"
                name="email"
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div class="mb-6">
              <label for="message" class="block mb-2">Message</label>
              <textarea
                name="message"
                rows="7"
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline resize-y"
              ></textarea>
            </div>
            <div class="flex text-right justify-between">
              <button
                class="transition duration-500 ease-in-out bg-coffee hover:bg-dark-coffee text-white tracking-wider py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact',
  },
}
</script>
