<template>
  <div>
    <div class="loading-overlay"></div>
    <iframe @load="changedURL" src="http://localhost:3000" frameborder="0">

    </iframe>
  </div>
</template>

<script>
    export default {
      name: "index.vue",
      methods: {
        changedURL(e) {
          if(e.target.src === this.comptuedURL) {

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
