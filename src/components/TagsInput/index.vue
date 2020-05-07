<template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      placeholder="Add keyword"
      @tags-changed="updateTags"
    />
  </div>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'TagsInput',
  components: {
    VueTagsInput,
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

<style lang="scss">
.vue-tags-input .ti-tag {
  background: #9b2c2c;
}
</style>
