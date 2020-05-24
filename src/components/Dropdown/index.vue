<template>
  <div class="dropdown inline-block relative">
    <slot name="button">
      <button
        class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        <span class="mr-1">Dropdown</span>

        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </button>
    </slot>
    <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 right-0">
      <slot name="content" />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
}
</script>

<style lang="scss" scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
