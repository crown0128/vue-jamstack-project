<template>
  <div class="loader absolute inset-0 flex items-center justify-center bg-gray-100">
    <div class="loader__spinner ease-linear rounded-full border-8 border-t-8 border-swirl h-32 w-32"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss">
.loader__spinner {
  border-top-color: #8f7056;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
