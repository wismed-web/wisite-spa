<template>
    <div id="changeLanguage">
        <el-select size="small" v-model="locale" @change="changeLanguage"
                   style="width:60px;position:absolute;right:5px;top:5px;z-index: 10;">
            <el-option v-for="lang in locales" :key="lang.event" :value="lang.event" :label="lang.text"></el-option>
        </el-select>
    </div>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
      data() {
          return {
              locales: [
                  {event: 'zh', text: '中文'},
                  {event: 'en', text: 'English'},
              ],
              locale: 'zh'
          }
      },
    mounted() {
        let lang = localStorage.getItem('lang')
        if(lang){
            this.$i18n.locale = lang
            this.locale = lang
        }else{
            localStorage.setItem('lang', 'zh')
            this.locale = 'zh'
        }
    },
    methods: {
    changeLanguage (lang) {
        localStorage.setItem('lang', lang)
        this.$i18n.locale = lang
        this.locale = lang
    }
  }
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
