<template>
  <Layout>
    <div class="container mx-auto text-justify">
      <g-link to="/blog" class="transition duration-500 ease-in-out text-limed tracking-wider border-b border-transparent hover:border-coffee hover:text-coffee ">
        &larr; Back to the blog</g-link>
      <div class="post__header mt-3 border-b border-limed">
        <h1 class="text-4xl antialiased text-limed tracking-wide">{{ $page.blogPost.title }}</h1>
        <p class="text-xl antialiased text-granny tracking-wide"></p>
        <div class="flex flex-row mb-3">
          <p class="antialiased text-coffee w-full sm:w-1/2"><span class="mr-2 ">by {{ $page.blogPost.author }}</span> | <span class="ml-2">{{ formattedDate }}</span></p>
          <div class="w-full sm:w-1/2 text-right">
            <span v-for="tag of $page.blogPost.tags" :key="tag" class="text-xs font-semibold text-granny pr-2">#{{ tag.toUpperCase() }}</span>

          </div>

        </div>
        <div>
        </div>
      </div>
      <div class="post__content mt-10 mb-20" v-html="richtextToHTML($page.blogPost.content)"></div>
    </div>
  </Layout>
</template>

<page-query>
query BlogPost ($path: String!) {
   blogPost: contentfulBlogPost (path: $path) {
    id,
    title,
    slug,
    content,
    tags,
    author,
    mainImage {
      file {
        url
      }
    },
    date
  }
}
</page-query>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import dayjs from "dayjs";

export default {
  name: "BlogPost",
  computed: {
    formattedDate() {
      return dayjs(this.$page.blogPost.date).format("MMM DD, YYYY");
    }
  },
  methods: {
    richtextToHTML(content) {
      return documentToHtmlString(content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: node => {
            return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />`;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.post__content /deep/ img {
  display: block;
  margin: 50px auto !important;
  max-width: 800px;
  height: auto;
}
</style>
