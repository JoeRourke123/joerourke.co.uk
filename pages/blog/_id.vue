<template>
  <iframe @load="changedURL" :src="computedURL" frameborder="0"></iframe>
</template>

<script>
  export default {
    name: "_id.vue",
    data() {
      return {
        id: this.$route.params.id,
      }
    },
    computed: {
      computedURL() {
        return "https://notion.so/joerourke/" + id;
      }
    },
    methods: {
      changedURL(e) {
        console.log(e);
      }
    }
  }
</script>

<style scoped>

</style>
