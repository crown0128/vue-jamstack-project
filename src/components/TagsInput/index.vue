<template>
  <div>
    <ClientOnly>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        placeholder="Add keyword"
        @tags-changed="updateTags"
      />
    </ClientOnly>
  </div>
</template>
<script>
export default {
  name: 'TagsInput',
  components: {
    VueTagsInput: () =>
      import('@johmun/vue-tags-input').then((m) => m.VueTagsInput),
  },
  data() {
    return {
      tag: '',
      tags: [],
    }
  },
  methods: {
    updateTags(tags) {
      this.tags = tags
      this.$emit('update', this.tags)
    },
  },
}
</script>

<style lang="css">
.vue-tags-input .ti-tag {
  background: #9b2c2c;
}
</style>
