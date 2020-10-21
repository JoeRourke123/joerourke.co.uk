<template>
  <div>
    <div class="loading-overlay"></div>
    <iframe @load="changedURL" :src="computedURL" frameborder="0">

    </iframe>
  </div>
</template>

<script>
    export default {
      name: "index.vue",
      methods: {
        changedURL(e) {
          if(e.target.src === this.computedURL) {

          }
        }
      },
      computed: {
        computedURL() {
          return "https://notion.so/joerourke/joes-blog";
        }
      }
    }
</script>

<style>
  .loading-overlay {

  }

  iframe {
    width: 100vw;
    height: 100vh;
  }
</style>
