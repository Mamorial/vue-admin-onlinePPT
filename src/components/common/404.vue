<template lang="html">
  <div class="container404">
    <iframe src="/dist/assets/page/error" frameborder="0" ></iframe>
  </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {},
    components: {}
};
</script>

<style lang="less">
@import "../../assets/less/main.less";
.container404 {
  width: 100%;
  height: 100%;
  overflow:hidden;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
