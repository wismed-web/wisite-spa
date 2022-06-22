<template>
    <div style="width: 80%;margin: 0 auto">
        <el-card class="box-card" v-for="m in messages" v-bind:key="m.id">
            <template #header>
                <div class="card-header">
                    <el-row>
                        <el-col :span="1">
                            <el-avatar size="large" :src="m.avatar" style="line-height: 50px;height:50px;width:50px;margin-top:5px;"/>
                        </el-col>
                        <el-col :span="2">
                            <span style="line-height: 54px;">{{m.realName}}@{{m.Owner}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span style="line-height: 54px;">{{m.Tm}}</span>
                        </el-col>
                    </el-row>
                </div>
            </template>
            <div class="block text-center" m="t-4">
                <span class="demonstration"><h3>{{m.topic}}</h3></span>
                <el-carousel trigger="click" height="150px" :autoplay="autoplay">
                    <el-carousel-item v-for="(item, index) in m.content" :key="index" :label="index" style="border: 2px solid black;">
                        <div>
                            {{item.text}}
                        </div>
                        <div v-if="item.isMultiMedia == 1 || item.isMultiMedia == 2">
                            <img v-if="item.isMultiMedia ==2" width="400" height="400" :src="item.path" class="avatar"/>
                            <video v-if="item.isMultiMedia ==1" class="my-video" style="width:400px;height:400px;" :src="item.path" controls></video>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-card>
        <div><el-button v-if="showMore" @click="loadMore" type="primary" round><b>{{$t('message.loadMore')}} ({{currentYear+'-'+currentMonth}})</b></el-button></div>
    </div>
</template>

<script>
    import apiUtil from "../util/apiUtil";
    export default {
        name: "Sharing",
        components: {
        },
        data() {
            return {
                elementHeight: 50,
                innerHeight: 30,
                message: {
                    "category": "share"
                },
                showMore: false,
                messages: [

                ],
                messageIds: [

                ],
                currentYear: null,
                currentMonth: null,
                updateDialog: false,
                avatars: {},
                nameMap: {},
                editImageStyle: 'z-index:-1',
                autoplay: false,
                uploadLoading: false,
                addMessageVisible: false,
                editVideoVisible: false,
                editImageVisible: false,
                originFile: null,
                videoFile: null,
                avatar: null,
                showProcess: false,
                originVideoUrl: "",
                videoTimeLine: [0, 100],
                videoTimeLineMax: null,
                videoTimeLineMin: 0,
                firstVideoLoad: true,
                editVideoProcess: 0,
                imageUrl: null,
                ffmpeg: null,
                graphs: [
                    {text: null, media: null, thumbnail: null, path: null, isMultiMedia: 3}
                ],
                picUrl: null,
                firstImageVideoUrl: null,
                currentIndex: 0,
                updateMessageTimer: null,
                closeDialogTimer: null
            }
        },
        computed: {
        },
        methods: {
            previousMonth () {
                let _this = this
                if(_this.currentMonth == 1){
                    _this.currentMonth = 12
                    _this.currentYear--
                }else{
                    _this.currentMonth--
                }
            },
            loadMore(){
              this.showMore = false
              this.batchGetOwn()
            },
            batchGetOwn () {
                let _this = this
                apiUtil.api.get(apiUtil.urls.post.ownIds, {'period': _this.currentYear+(_this.currentMonth>9 ? ''+_this.currentMonth : '0'+_this.currentMonth)}).then(async res => {
                    await _this.batchGetIds(res)
                    _this.previousMonth()
                    _this.showMore = true
                }).catch(error => {
                    _this.showMore = true
                    apiUtil.message.error(error)
                })
            },
            async batchGetIds(ids) {
                let _this = this
                if(ids.length > 0){
                    for(let i=ids.length - 1;i>=0;i--){
                        await apiUtil.api.get(apiUtil.urls.post.one, {'id': ids[i]}).then(async res => {
                            _this.messages.unshift(res)
                            let meta = JSON.parse(res.MetaJSON)
                            _this.messages.push(meta)
                            meta.Tm = res.Tm
                            meta.Owner = res.Owner
                            res['meta'] = meta
                            for(let j in meta.content){
                                if(meta.content[j].path){
                                    meta.content[j].path = res.Owner+'/' + meta.content[j].path
                                }
                                if(meta.content[j].path.indexOf('/video/')>0 ){
                                    meta.content[j].isMultiMedia = 1
                                }else if(meta.content[j].path.indexOf('/image/')>0) {
                                    meta.content[j].isMultiMedia = 2
                                }else{
                                    meta.content[j].isMultiMedia = 3
                                }
                            }
                            await _this.getAvatar(res.Owner, meta)
                        }).catch(error => {
                            console.log(error)
                        })
                    }

                }
            },
            async getAvatar(uname, message) {
                let _this = this
                if(uname in _this.avatars){
                    message.avatar = _this.avatars[uname]
                    return
                }
                if(uname in _this.nameMap){
                    message.realName = _this.nameMap[uname]
                    return
                }
                await apiUtil.api.get(apiUtil.urls.admin.users, {uname: uname})
                    .then(res => {
                        if(res && res.length>0){
                            message.realName = res.name
                            _this.nameMap[uname] = res.name
                        }
                    }).catch(error => {
                        apiUtil.message.error(error)
                    })
                await apiUtil.api.get(apiUtil.urls.admin.avatar, {'uname': uname})
                    .then(res => {
                        message.avatar = res.src
                        _this.avatars[uname] = res.src
                    }).catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            let _this = this
            _this.$nextTick(() => {
                this.elementHeight = window.innerHeight - 68
                this.innerHeight = this.elementHeight - 20
                let context = this;
                window.onresize = () => {
                    context.elementHeight = window.innerHeight - 68
                    context.innerHeight = context.elementHeight - 20
                }
            })
            let date = new Date()
            _this.currentYear = date.getFullYear();
            _this.currentMonth = date.getMonth() + 1;
            _this.batchGetOwn()
        },
        unmounted() {
        }
    }
</script>

<style scoped>

</style>