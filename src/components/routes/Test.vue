<template lang="html">
  <div class="">
    我是来之测试的vue组件
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.$props.url);
  },
  props:['url'],
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="css">
</style>
