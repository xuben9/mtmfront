<template>
  <div id="nav">
    <router-link to="/">MATRIX TO COORDINATES</router-link> |
    <router-link to="/ctm">COORDINATES TO MATRIX</router-link>
  </div>
  <router-view/>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  box-sizing: border-box;
  background-color: #409eff;
  padding-top: 20px;
  height: calc(8vh);

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
