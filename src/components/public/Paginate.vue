<template lang="html">
  <el-pagination
    v-if="total > 0"
    class="floatLeft"
    layout="prev, pager, next"
    :current-page='current'
    @current-change="handlePageChange"
    :page-size = "pageSize"
    :total="total">
  </el-pagination>
</template>

<script>
import * as common from '../../assets/js/public.js';
export default {
  data() {
    return {
      pageSize:10,
      currentPage:1,
      total:0,
      current:1,
    };
  },
  props:['params','asnyc'],
  mounted() {
    /**初始化分頁**/
    if(this.$props.asnyc) { return false };
    this.fetchData();
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    /**改變分頁**/
    handlePageChange(current) {
      // console.log(current);
      let params = this.$props.params;
      params.pageNo = current;//更改了父级的state中的params中的pageNo
      this.current = current;
      this.fetchData(params);
    },
    //通知父级改变状态
    handleCurrentChange(rows) {
      this.$emit('paginateInitChange', rows,this.current);
      //rows
    },
    fetchData(params) {
      this.$props.params.pageSize ? this.pageSize = Number(this.$props.params.pageSize) : null;
      let _this = this;
      let param = params ? params : _this.$props.params;
      this.current = param.pageNo;
      common.Ajax({
        url:param.url,
        params:param,
        callback:function (data) {
          // console.log(data);
          _this.handleCurrentChange(data.rows);
          _this.total = data.total;
        }
      });
    }
  },
  components: {}
};
</script>
