<template>
  <el-container class="whole_page">
    <!-- <el-header>Welcome to CHO's project</el-header> -->
    <el-container>
      <el-aside>
        <div class="title">WELCOM TO CHO'S MTC WORKSPACE</div>
        <div id="upload">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8086/cho/bb"
            multiple
            :on-success="handleResp"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop matrix file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                Only .xls/.xlsx/.csv files are supported, and no more than 500kb
              </div>
            </template>
          </el-upload>
        </div>
        <el-button id="downloadbutton" @click="downloadfile" type="primary" plain v-if="isShow">Click to download coordinates Files</el-button>
      </el-aside>
      <el-container>
        <el-main id="mianpage">
          <!-- <div id="graph" style="width: 600px; height: 600px"></div> -->
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "MTN",
  components: {},
  data() {
    return {
      matrix: {},
      coordinates: {},
      filename: {},
      isShow: false
    };
  },
  methods: {
    handleResp(response) {
      console.log(response);
      this.$message({
        message: "Upload matrix file successfully!!!",
        type: "success",
      });
      this.matrix = response.matrix;
      this.coordinates = response.coordinates;
      this.filename = response.filename;

      var chartDom = document.getElementById("mianpage");
      var myChart = echarts.init(chartDom);
      myChart.setOption({
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: this.coordinates,
            type: "scatter",
          },
        ],
      });
      this.showdownloadbutton()
    },
    downloadfile() {
      window.location.href =
        "http://localhost:8086/cho/downloadfile/" + this.filename;
    },
    // getWidthAndHeight() {
    //   var ele = document.getElementById("mianpage");
    //   var tmph = ele.getBoundingClientRect().height;
    //   var tmpw = ele.getBoundingClientRect().width;
    //   console.log(tmph);
    //   console.log(tmpw);
    //   // document.getElementById("graph").style.height = tmph;
    //   // document.getElementById("graph").style.width = tmpw;
    // },
    showdownloadbutton() {
      this.isShow = true
    }
  },
  mounted: function () {
    // this.getWidthAndHeight()
  },
};
</script>

<style scoped>
.el-header {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.whole_page {
  height: calc(90vh);
}
.title {
  padding: 20px 0px;
  background-color: aqua;
}
</style>
