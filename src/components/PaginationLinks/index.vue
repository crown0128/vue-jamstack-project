<template>
  <paginate-links
    :for="paginateName"
    :limit="limit"
    :show-step-links="showStepLinks"
    :container="container"
  ></paginate-links>
</template>

<script>
export default {
  name: 'PaginationLinks',
  props: {
    container: {
      type: Object,
      required: true,
    },
    limit: {
      type: Number,
      default: 2,
    },
    paginateName: {
      type: String,
      required: true,
    },
    showStepLinks: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="scss">
.paginate-links {
  text-align: center;
  user-select: none;
  a {
    cursor: pointer;
  }
  li {
    display: inline-block;
    a {
      padding: 8px 16px;
      transition: background-color 0.3s;
    }
  }
  li.active {
    a {
      color: #8f7056;
      border-bottom: solid 1px #8f7056;
    }
  }

  li:hover:not(.active) a {
    background-color: #ddd;
  }

  li.next:before {
    content: ' | ';
    margin-right: 13px;
    color: #ddd;
  }
  li.disabled a {
    color: #ccc;
    cursor: no-drop;
  }
}
</style>
