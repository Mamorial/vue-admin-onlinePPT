<template lang="html">
  <li v-if="isLong" class="el-col-20" >
    <div id="editor">
        <p>请输入内容...</p>
    </div>
  </li>
  <li v-else class="el-col-16" >
    <div id="editor">
        <p>请输入内容...</p>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isLong:this.$props.long
    };
  },
  props:['long'],
  mounted() {
    console.log(this.isLong);
    this.editor = new wangEditor('editor');
    this.editor.config.menuFixed = false;
    this.editor.create();
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor = null;
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    initContent(txt) {
      this.editor.$txt.html(txt);
    },
    getContent() {
      let content = this.editor.$txt.html();
      let formatText = this.editor.$txt.formatText().trim();
      return {content:content,formatText:formatText};
    }
  },
  components: {}
};
</script>
