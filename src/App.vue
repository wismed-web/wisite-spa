<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-row{
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap
}
body {
    background: url('./assets/login-bg.jpg') no-repeat;
    background-size: cover;
    display: none;
}

</style>
