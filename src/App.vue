<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-upload
    class="upload-demo"
    drag
    action="http://localhost:8086/cho/bb"
    :on-success="handleResp"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">drag files here, or<em> Click to upload</em></div>
    <div class="el-upload__tip" slot="tip">
      Only .xls/.xlsx/.csv files are supported，and no more than 500kb
    </div>
  </el-upload>

  <table>
    <tr v-for="item in matrix" :key = item.key>
      <td v-for="value in item" :key="value">{{value}}</td>
    </tr>
  </table>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data () {
    return {
      matrix:{}
    }
  },
  methods: {
    handleResp(response) {
      console.log(response)
      this.matrix = response
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
