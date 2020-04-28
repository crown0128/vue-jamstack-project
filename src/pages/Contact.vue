<template>
  <Layout>
    <h2>Contact us</h2>
    <form name="contact" method="post" action="/success/" data-netlify="true">
      <input type="hidden" name="form-name" value="contact" />
      <div class="sender-info">
        <div>
          <label for="name" class="label">Your name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label for="email">Your email</label>
          <input type="email" name="email" />
        </div>
      </div>

      <div class="message-wrapper">
        <label for="message">Message</label>
        <textarea name="message"></textarea>
      </div>

      <button type="submit">Send</button>
    </form>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact',
  },
}
</script>
