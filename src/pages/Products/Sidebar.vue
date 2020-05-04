<template>
  <div class="md:flex flex-col md:min-h-screen w-full p-5">
    <div class="relative mr-6 my-2">
      <input
        type="search"
        class="bg-purple-white shadow rounded border-0 p-3"
        placeholder="Search by name..."
      />
      <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
        <svg
          version="1.1"
          class="h-4 text-dark"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 52.966 52.966"
          style="enable-background:new 0 0 52.966 52.966;"
          xml:space="preserve"
        >
          <path
            d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
        S32.459,40,21.983,40z"
          />
        </svg>
      </div>
    </div>
    <div class="w-full mx-auto p-8">
      <div class="shadow-md">
        <div class="tab w-full overflow-hidden border-t">
          <input
            class="absolute opacity-0"
            id="tab-single-one"
            type="radio"
            name="tabs2"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            for="tab-single-one"
            >Colors</label
          >
          <div
            class="tab-content overflow-hidden border-l-2 bg-gray-100 border-red-700 leading-normal"
          >
            <div class="p-5 z-0">
              <Checkbox text="Black and white" @checked="updateBlackAndWhite" />
              <div class="flex items-center">
                <div class="colors grid grid-cols-1 sm:grid-cols-2 w-full">
                  <div
                    class="colors--item sm:col-span-1 p-2 mx-auto"
                    v-for="color in colors"
                    :key="color.hex"
                  >
                    <div
                      class="w-8 h-8 rounded-full mx-auto border-2 border-solid border-gray-400"
                      :style="{ 'background-color': color.hex }"
                    ></div>
                    <p>{{ color.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab w-full overflow-hidden border-t bg-white">
          <input
            class="absolute opacity-0"
            id="tab-single-two"
            type="radio"
            name="tabs2"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            for="tab-single-two"
            >Format</label
          >
          <div
            class="tab-content overflow-hidden border-l-2 bg-gray-100 border-red-700 leading-normal"
          >
            <div class="p-5">
              <div class="flex items-center">
                <div
                  v-for="format in formats"
                  :key="format.name"
                  class="w-1/3 mx-auto  text-center"
                >
                  <div
                    class="border-2 border-grey-900 border-solid mx-auto "
                    :class="[`w-${format.width} h-${format.height}`]"
                  ></div>
                  <span class="">{{ format.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab w-full overflow-hidden border-t">
          <input
            class="absolute opacity-0"
            id="tab-single-three"
            type="radio"
            name="tabs2"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            for="tab-single-three"
            >Theme</label
          >
          <div
            class="tab-content overflow-hidden border-l-2 bg-gray-100 border-red-700 leading-normal"
          >
            <p class="p-5">
              <Checkbox
                v-for="theme in themes"
                :key="theme.value"
                :text="theme.name"
                :isChecked="filters.themes.includes(theme.value)"
                class="mb-3"
              />
            </p>
          </div>
        </div>
        <div class="tab w-full overflow-hidden border-t">
          <input
            class="absolute opacity-0"
            id="tab-single-four"
            type="radio"
            name="tabs2"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            for="tab-single-four"
            >Keywords</label
          >
          <div
            class="tab-content overflow-hidden border-l-2 bg-gray-100 border-red-700 leading-normal"
          >
            <p class="p-5">
              vue-tags-input
            </p>
          </div>
        </div>
        <div class="tab w-full overflow-hidden border-t">
          <input
            class="absolute opacity-0"
            id="tab-single-five"
            type="radio"
            name="tabs2"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            for="tab-single-five"
            >Price</label
          >
          <div
            class="tab-content overflow-hidden border-l-2 bg-gray-100 border-red-700 leading-normal"
          >
            <p class="p-5">
              Input range
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox'
export default {
  name: 'ProductsSidebar',
  components: { Checkbox },
  data() {
    // @TODO add reset button
    return {
      colors: [
        { name: 'pink', hex: '#e327c0' },
        { name: 'green', hex: '#21bf13' },
        {
          name: 'red',
          hex: '#d4191d',
        },
        { name: 'blue', hex: '#10b9e8' },
        {
          name: 'orange',
          hex: '#de6910',
        },
        { name: 'purple', hex: '#961fdb' },
        { name: 'yellow', hex: '#ebba0c' },
        { name: 'grey', hex: '#8a8a8a' },
        { name: 'beige', hex: '#e6c2a1' },
        { name: 'black', hex: '#000000' },
        { name: 'brown', hex: '#82370c' },
        { name: 'white', hex: '#ffffff' },
      ],

      filters: {
        // Black and white or color
        isBlackAndWhite: false,
        dominantColors: [], // Multi select
        // @TODO range from lowest price to highest price
        price: null, // Range
        orientation: [], // Radio (to update)
        keywords: [], // tags
        name: null, // input
        themes: [],
      },
      formats: [
        {
          name: 'square',
          width: 10,
          height: 10,
        },
        {
          name: 'landscape',
          width: 13,
          height: 10,
        },
        {
          name: 'portrait',
          width: 10,
          height: 12,
        },
      ],
      themes: [
        {
          name: 'Fashion',
          value: 'fashion',
        },
        {
          name: 'Dream and Creation',
          value: 'dream-and-creation',
        },
        {
          name: 'Landscape',
          value: 'landscape',
        },
        {
          name: 'Travel',
          value: 'travel',
        },
        {
          name: 'Nature',
          value: 'nature',
        },
        {
          name: 'Urban',
          value: 'urban',
        },
      ],
    }
  },
  methods: {
    updateBlackAndWhite(isChecked) {
      this.isBlackAndWhite = isChecked
      // @TODO update query
    },
  },
}
</script>

<style>
/* Tab content - closed */
.tab-content {
  max-height: 0;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
}
/* :checked - resize to full height */
.tab input:checked ~ .tab-content {
  max-height: 100vh;
}
/* Label formatting when open */
.tab input:checked + label {
  /*@apply text-xl p-5 border-l-2 border-red-700 bg-gray-100 text-red*/
  font-size: 1.25rem; /*.text-xl*/
  padding: 1.25rem; /*.p-5*/
  border-left-width: 2px; /*.border-l-2*/
  border-color: #c53030; /*.border-red*/
  background-color: #f8fafc; /*.bg-gray-100 */
  color: #c53030; /*.text-indigo*/
}
/* Icon */
.tab label::after {
  float: right;
  right: 0;
  top: 0;
  display: block;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5;
  font-size: 1.25rem;
  text-align: center;
  -webkit-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
}
/* Icon formatting - closed */
.tab input[type='checkbox'] + label::after {
  content: '+';
  font-weight: bold; /*.font-bold*/
  border-width: 1px; /*.border*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #b8c2cc; /*.border-grey*/
}
.tab input[type='radio'] + label::after {
  content: '\25BE';
  font-weight: bold; /*.font-bold*/
  border-width: 1px; /*.border*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #b8c2cc; /*.border-grey*/
}
/* Icon formatting - open */
.tab input[type='checkbox']:checked + label::after {
  transform: rotate(315deg);
  background-color: #c53030; /*.bg-red*/
  color: #f8fafc; /*.text-grey-lightest*/
}
.tab input[type='radio']:checked + label::after {
  transform: rotateX(180deg);
  background-color: #c53030; /*.bg-red*/
  color: #f8fafc; /*.text-grey-lightest*/
}
</style>
