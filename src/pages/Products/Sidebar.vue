<template>
  <aside class="md:flex flex-col md:min-h-screen w-full p-5">
    <div class="relative my-2">
      <div class="mx-auto w-full">
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto" id="search" type="text" placeholder="Search..." v-model="filters.search" />
      </div>
    </div>
    <div class="w-full mx-auto">
      <div class="shadow-md">
        <div class="tab tab__colors w-full overflow-hidden border-t">
          <input class="absolute opacity-0" id="tab__colors-input" type="radio" name="tabs2" />
          <label @click.prevent="toggleTab('colors')" class="block p-5 leading-normal cursor-pointer" for="tab__colors-input">Colors
            <span v-if="filters.isBlackAndWhite || filters.dominantColors.length" class="bg-granny p-1 rounded text-white text-xs ml-2 px-2">{{
                filters.isBlackAndWhite ? 1 : filters.dominantColors.length
              }}</span>
          </label>
          <div class="tab__content overflow-hidden border-l-2 bg-gray-100 border-forest leading-normal">
            <div class="p-5 z-0">
              <Checkbox text="Black and white" @checked="updateFilters($event, 'isBlackAndWhite')" />
              <div class="flex items-center">
                <div class="colors grid grid-cols-1 sm:grid-cols-2 w-full">
                  <div class="colors--item sm:col-span-1 p-2 mx-auto" v-for="color in colors" :key="color.hex">
                    <input class="absolute opacity-0" v-model="filters.dominantColors" :value="color.name" :id="`color-${color.name}`" type="checkbox" :disabled="filters.isBlackAndWhite" />
                    <label :for="`color-${color.name}`">
                      <div class="w-8 h-8 rounded-full mx-auto border-2 border-solid border-gray-400 flex items-center justify-center" :class="{ 'opacity-50': filters.isBlackAndWhite }" :style="{ 'background-color': color.hex }">
                        <svg class="filters---color selected w-4 h-4 pointer-events-none fill-current" :class="[
                            color.name === 'white' || color.name === 'beige'
                              ? 'text-black'
                              : 'text-white',
                            filters.dominantColors.includes(color.name)
                              ? ''
                              : 'hidden',
                          ]" viewBox="0 0 172 172">
                          <g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal">
                            <path d="M0 172V0h172v172z" />
                            <path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1" />
                          </g>
                        </svg>
                      </div>

                      <p>{{ color.name }}</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab tab__format w-full overflow-hidden border-t bg-white">
          <input class="absolute opacity-0" id="tab__format-input" type="radio" name="tabs2" />
          <label @click.prevent="toggleTab('format')" class="block p-5 leading-normal cursor-pointer" for="tab__format-input">Format
            <span v-if="filters.orientations.length" class="bg-forest p-1 rounded text-white text-xs ml-2 px-2">{{ filters.orientations.length }}</span></label>
          <div class="tab__content overflow-hidden border-l-2 bg-gray-100 border-forest leading-normal">
            <div class="p-5">
              <div class="flex items-center">
                <div v-for="format in formats" :key="format.name" class="w-1/3 mx-auto  text-center">
                  <input class="absolute opacity-0" v-model="filters.orientations" :value="format.name" :id="`format-${format.name}`" type="checkbox" />
                  <label :for="`format-${format.name}`">
                    <div class="border-2 border-grey-900 border-solid mx-auto" :class="[
                        `w-${format.width} h-${format.height}`,
                        filters.orientations.includes(format.name)
                          ? 'border-forest'
                          : '',
                      ]"></div>
                    <span class="">{{ format.name }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab tab__themes w-full overflow-hidden border-t">
          <input class="absolute opacity-0" id="tab__themes-input" type="radio" name="tabs2" />
          <label @click.prevent="toggleTab('themes')" class="block p-5 leading-normal cursor-pointer" for="tab__themes-input">Theme
            <span v-if="filters.themes.length" class="bg-red-800 p-1 rounded text-white text-xs ml-2 px-2">{{ filters.themes.length }}</span>
          </label>
          <div class="tab__content overflow-hidden border-l-2 bg-gray-100 border-forest leading-normal">
            <p class="p-5">
              <Checkbox v-for="theme in themes" :key="theme.value" :text="theme.name" :isChecked="filters.themes.includes(theme.value)" @checked="
                  updateFilters(
                    { isChecked: $event, value: theme.value },
                    'themes'
                  )
                " class="mb-3" />
            </p>
          </div>
        </div>
        <div class="tab tab__keywords w-full overflow-hidden border-t">
          <input class="absolute opacity-0" id="tab__keywords-input" type="radio" name="tabs2" />
          <label @click.prevent="toggleTab('keywords')" class="block p-5 leading-normal cursor-pointer" for="tab__keywords-input">Keywords

            <small>
              <span v-if="filters.keywords.length" class="bg-forest p-1 rounded text-white text-xs ml-2 px-2">{{ filters.keywords.length }}</span>
            </small>
          </label>
          <div class="tab__content overflow-hidden border-l-2 bg-gray-100 border-forest leading-normal">
            <div class="p-5">
              <TagsInput @update="updateFilters($event, 'keywords')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="isFiltered" class="bg-forest hover:bg-limed text-white font-bold py-2 px-4 rounded mt-3" @click.prevent="resetFilters">
      Reset
    </button>
  </aside>
</template>

<script>
import Checkbox from "@/components/Checkbox";
import TagsInput from "@/components/TagsInput";

export default {
  name: "ProductsSidebar",
  components: { Checkbox, TagsInput },
  data() {
    const defaultFilters = {
      isBlackAndWhite: false,
      dominantColors: [],
      orientations: [],
      keywords: [],
      search: "",
      themes: []
    };
    return {
      colors: [
        { name: "pink", hex: "#e327c0" },
        { name: "green", hex: "#21bf13" },
        {
          name: "red",
          hex: "#d4191d"
        },
        { name: "blue", hex: "#10b9e8" },
        {
          name: "orange",
          hex: "#de6910"
        },
        { name: "purple", hex: "#961fdb" },
        { name: "yellow", hex: "#ebba0c" },
        { name: "grey", hex: "#8a8a8a" },
        { name: "beige", hex: "#e6c2a1" },
        { name: "black", hex: "#000000" },
        { name: "brown", hex: "#82370c" },
        { name: "white", hex: "#ffffff" }
      ],
      defaultFilters,
      filters: JSON.parse(JSON.stringify(defaultFilters)),
      formats: [
        {
          name: "square",
          width: 10,
          height: 10
        },
        {
          name: "landscape",
          width: 13,
          height: 10
        },
        {
          name: "portrait",
          width: 10,
          height: 12
        }
      ],
      searchTimer: false,
      tabs: ["colors", "format", "themes", "keywords"],
      themes: [
        {
          name: "Animal",
          value: "animal"
        },
        {
          name: "Dream and Creation",
          value: "dream-and-creation"
        },
        {
          name: "Fashion",
          value: "fashion"
        },
        {
          name: "Landscape",
          value: "landscape"
        },
        {
          name: "Nature",
          value: "nature"
        },
        {
          name: "Travel",
          value: "travel"
        },
        {
          name: "Urban",
          value: "urban"
        }
      ]
    };
  },
  watch: {
    "filters.dominantColors": function() {
      this.$emit("updateList", { filters: this.filters });
    },
    "filters.orientations": function() {
      this.$emit("updateList", { filters: this.filters });
    },
    "filters.search": function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.debounceSearch();
      }
    }
  },
  computed: {
    isFiltered() {
      return (
        JSON.stringify(this.filters) !== JSON.stringify(this.defaultFilters)
      );
    }
  },
  methods: {
    closeTab(tab) {
      const tabInput = document.getElementById(`tab__${tab}-input`);
      if (!tabInput) {
        return;
      }
      tabInput.checked = null;
      document.querySelector(`.tab__${tab}`).classList.add("overflow-hidden");
      document
        .querySelector(`.tab__${tab} .tab__content`)
        .classList.add("overflow-hidden");
    },
    debounceSearch() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.$emit("updateList", { filters: this.filters });
      }, 500);
    },
    resetFilters() {
      this.filters = JSON.parse(JSON.stringify(this.defaultFilters));
      this.$emit("updateList", { filters: this.filters, reset: true });
      for (const tab of this.tabs) {
        this.closeTab(tab);
      }
    },
    toggleTab(selectedTabName) {
      const selectedTab = document.getElementById(
        `tab__${selectedTabName}-input`
      );
      if (!selectedTab) {
        return;
      }
      selectedTab.checked = selectedTab.checked ? null : true;
      for (const tab of this.tabs) {
        const tabInput = document.getElementById(`tab__${tab}-input`);
        if (!tabInput) {
          continue;
        }

        if (tabInput.checked) {
          document
            .querySelector(`.tab__${tab}`)
            .classList.remove("overflow-hidden");
          document
            .querySelector(`.tab__${tab} .tab__content`)
            .classList.remove("overflow-hidden");
        } else {
          document
            .querySelector(`.tab__${tab}`)
            .classList.add("overflow-hidden");
          document
            .querySelector(`.tab__${tab} .tab__content`)
            .classList.add("overflow-hidden");
        }
      }
    },
    updateFilters(value, filter) {
      switch (filter) {
        case "keywords":
          this.filters.keywords = value.map(tag => tag.text);
          break;
        case "themes":
          this.filters.themes = this.updateSelectedThemes(
            value,
            this.filters.themes
          );
          break;
        default:
          this.filters[filter] = value;
          break;
      }
      this.$emit("updateList", { filters: this.filters });
    },
    updateSelectedThemes(item, selectedThemes) {
      const valueIndex = selectedThemes.indexOf(item.value);
      if (!item.isChecked && valueIndex !== -1) {
        selectedThemes.splice(valueIndex, 1);
      } else if (item.isChecked && valueIndex === -1) {
        selectedThemes.push(item.value);
      }
      return selectedThemes;
    }
  }
};
</script>

<style lang="scss">
/* Tab content - closed */
.tab__content {
  max-height: 0;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
}
/* :checked - resize to full height */
.tab > input:checked ~ .tab__content {
  max-height: 100vh;
}
/* Label formatting when open */
.tab > input:checked + label {
  /*@apply text-xl p-5 border-l-2 border-red-700 bg-gray-100 text-red*/
  font-size: 1.25rem; /*.text-xl*/
  padding: 1.25rem; /*.p-5*/
  border-left-width: 2px; /*.border-l-2*/
  border-color: #233c3c; /*.border-red*/
  background-color: #f8fafc; /*.bg-gray-100 */
  color: #233c3c; /*.text-indigo*/
}
/* Icon */
.tab > label::after {
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
.tab > input[type="radio"] + label::after {
  content: "\25BE";
  font-weight: bold; /*.font-bold*/
  border-width: 1px; /*.border*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #b8c2cc; /*.border-grey*/
}
/* Icon formatting - open */
.tab > input[type="radio"]:checked + label::after {
  transform: rotateX(180deg);
  background-color: #233c3c; /*.bg-red*/
  color: #f8fafc; /*.text-grey-lightest*/
}
</style>
