<template>
  <Layout ref="layout">
    <section class="container mx-auto">
      <h1 class="text-4xl antialiased text-coffee tracking-widest border-b border-coffee text-center mb-10">
        Blog
      </h1>
      <transition tag="div" name="fade" mode="out-in">
        <div v-if="$page && $page.blogPosts && $page.blogPosts.edges">
          <paginate tag="div" name="blogPosts" class="mb-16" :list="$page.blogPosts.edges" :container="this" :per="4">
            <div class="flex flex-wrap mt-2 mx-2">
              <div v-for="item in paginated('blogPosts')" :key="item.node.id" class="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
                <div class="shadow-md bg-white">
                  <g-link :to="item.node.path">
                    <img class="h-56 w-full object-cover" :src="item.node.mainImage.file.url" alt="" />
                  </g-link>
                  <div class="flex flex-col p-4">
                    <div>
                      <span v-for="tag of item.node.tags" :key="tag" class="text-xs font-semibold text-granny pr-2">#{{ tag.toUpperCase() }}</span>
                    </div>
                    <g-link :to="item.node.path">
                      <p class="text-xl">{{ item.node.title }}</p>
                    </g-link>
                    <p class="text-coffee text-xs">{{ formatDate(item.node.date) }}</p>
                    <div class="relative ">
                      <button class="bg-coffee hover:bg-dark-coffee text-white float-right py-2 px-4 rounded flex mr-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path class="heroicon-ui" fill="white" d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z" />
                        </svg>
                        <span>Read more</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </paginate>
          <PaginationLinks :container="{
              state: paginate.blogPosts,
              el: $refs.layout,
            }" paginateName="blogPosts" />
        </div>
      </transition>
    </section>
  </Layout>
</template>

<page-query>
query BlogPosts {
blogPosts: allContentfulBlogPost(sortBy: "date", order: DESC) {
    edges {
      node {
        id,
        title,
        slug,
        content,
        tags,
        author,
        date,
        tags,
        mainImage {
          file {
            url
          }
        },
        path
      }
    }
  }
}
</page-query>

<script>
import PaginationLinks from "@/components/PaginationLinks";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import dayjs from "dayjs";

export default {
  name: "Blog",
  components: { PaginationLinks },
  data() {
    return {
      paginate: ["blogPosts"]
    };
  },
  methods: {
    documentToHtmlString,
    formatDate(date) {
      return dayjs(date).format("MMM DD, YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
// .post_image {
//   width: 500px;
//   height: 400px;
// }
</style>
