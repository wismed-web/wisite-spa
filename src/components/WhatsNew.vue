<template>
    <div style="width: 80%;margin: 0 auto;">
        <el-card class="box-card" v-for="m in messages" v-bind:key="m.id">
            <template #header>
                <div class="card-header">
                    <el-row>
                        <el-col :span="1">
                            <el-avatar size="large" :src="m.avatar" style="line-height: 50px;height:50px;width:50px;margin-top:5px;"/>
                        </el-col>
                        <el-col :span="4" style="text-align: left;">
                            <span style="line-height: 54px;">{{m.realName}}@{{m.Owner}}</span>
                        </el-col>
                        <el-col :span="4" style="text-align: left;">
                            <span style="line-height: 54px;"><i>{{m.timestamp}}</i></span>
                        </el-col>
                    </el-row>
                </div>
            </template>
            <div class="block text-center" m="t-4">
                <span class="demonstration"><h3>{{m.topic}}</h3></span>
                <el-carousel v-if="m.content" trigger="click" height="160px" :autoplay="autoplay">
                    <el-carousel-item  v-for="(item, index) in m.content" :key="index" :label="index">
                        <div>
                            {{item.text}}
                        </div>
                        <div v-if="item.isMultiMedia == 1 || item.isMultiMedia == 2">
                            <el-image crossOrigin="anonymous" v-if="item.isMultiMedia ==2" :src="item.path">
                                <template #placeholder>
                                    <div class="image-slot" style="font-size: 10px;">{{$t('message.loading')}}<span class="dot">...</span></div>
                                </template>
                            </el-image>
                            <video crossOrigin="anonymous" v-if="item.isMultiMedia ==1" class="my-video" style="width:400px;height:400px;" :src="item.path" controls></video>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-card>
    </div>
    <div class="message">
        <el-button circle type="primary" style="width:80px;height:80px;">
            <el-icon class="el-input__icon" :size="40" @click="addMessageWindow">
                <Plus style="cursor: pointer;"></Plus>
            </el-icon>
        </el-button>
    </div>
    <el-dialog v-loading="uploadLoading" v-model="addMessageVisible" style="width:100%;height:600px;" :title="$t('message.addMessage')" center>
        <el-form :model="message" label-width="40px">
            <el-row>
                <el-col :span="2">
                    <el-avatar shape="square" size="large" :src="avatar" style="line-height: 100px;height:100px;width:100px;margin-top:5px;"/>
                </el-col>
                <el-col :span="22">
                    <el-form-item>
                        <el-input v-model="message.topic" autocomplete="off" :placeholder="$t('message.messageTopicTip')"/>
                    </el-form-item>
                    <el-form-item v-for="(graph, index) in graphs" :key="index">
                        <el-row style="width:100%;" :id="`upload-${index}`">
                            <el-col :span="18">
                                <el-input type="textarea"
                                          rows="4" v-model="graph.text" autocomplete="off" :placeholder="$t('message.paragraphTip')"/>
                            </el-col>
                            <el-col :span="2" style="text-align: right;">
                                <img v-if="graph.thumbnail" :src="graph.thumbnail" width="50" height="50"/>
                            </el-col>
                            <el-col :span="4">
                                <el-upload
                                        class="avatar-uploader"
                                        :show-file-list="false"
                                        :auto-upload="false"
                                        action=""
                                        style="margin-left:0px;text-align:right;"
                                        :on-change="beforeAvatarUpload">
                                    <el-button @click="btnUpload(index)" type="primary" round>{{$t('message.selectMedia')}}</el-button>
                                </el-upload>
                                <div style="text-align: right">
                                    <el-button v-if="index>0" @click="deleteGraph(index)" type="primary" round><b>{{$t('message.delete')}}</b></el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row style="width:100%;">
                            <el-col :span="24" style="text-align: right;font-weight: bold;">
                                <el-button @click="addGraph" type="primary" round><b>{{$t('message.more')}}</b></el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="message.summary" autocomplete="off" :placeholder="$t('message.wrapupTip')"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-row style="width:100%;">
                <el-col :span="24" style="text-align: right;">
                    <span class="dialog-footer" style="margin-left: 700px;">
                        <el-button type="primary" size="large" round @click="addMessage">{{$t('message.publish')}}</el-button>
                      </span>
                </el-col>
            </el-row>
        </template>
        <el-dialog @open="editVideoDialogOpen" @closed="editVideoDialogClosed" @opened="editVideoDialogOpened" v-model="editVideoVisible" :title="$t('message.editVideo')" style="width:100%;height:500px;" center>
            <el-row>
                <el-col :offset="5">
                    <video v-on:canplay="canplay" id="videoDom" class="my-video" ref="videoDom" style="width:520px;height:520px;" :src="originVideoUrl" controls></video>
                </el-col>
            </el-row>
            <el-row >
                <el-col :offset="5">
                    <div class="slider-demo-block" style="width: 520px;">
                        <el-slider show-stops @change="timelineChange" @input="timelineInput" v-model="videoTimeLine" :min="videoTimeLineMin" :max="videoTimeLineMax" range/>
                    </div>
                </el-col>
            </el-row>
            <el-row  v-if="showProcess">
                <el-col :offset="5" :span="14">
                    <el-progress :text-inside="true" :stroke-width="14" :percentage="editVideoProcess"/>
                </el-col>
            </el-row>
            <template #footer>
                <el-row>
                    <el-col>
                      <span class="dialog-footer">
                        <el-button type="primary" size="large" round @click="editVideoConfirm">{{$t('message.confirm')}}</el-button>
                        <el-button type="primary" size="large" round @click="editVideoComplete">{{$t('message.clip')}}</el-button>
                      </span>
                    </el-col>
                </el-row>
            </template>
        </el-dialog>
        <el-dialog ref="editImageDialog" v-model="editImageVisible" :title="$t('message.editImage')" style="width:100%;height:500px;" center>
            <el-row>
                <el-col :span="10">
                    <div class="cropper-content">
                        <div class="cropper" style="text-align:center">
                            <VuePictureCropper
                                    :boxStyle="{
                                      width: '400px',
                                      height: '400px',
                                      backgroundColor: '#f8f8f8',
                                      margin: 'auto'
                                    }"
                                    :img="picUrl"
                                    :options="{
                                      viewMode: 1,
                                      dragMode: 'crop',
                                      aspectRatio: 1,
                                      cropBoxResizable: false
                                    }"
                                    :presetMode="{
                                        mode: 'fixedSize',
                                        width: 100,
                                        height: 100,
                                    }"/>
                        </div>
                    </div>
                </el-col>
                <el-col :span="10" :offset="3">
                    <img width="400" height="400" :src="imageUrl" class="avatar" id="editImage"/>
                </el-col>
            </el-row>
            <template #footer>
                <el-row>
                    <el-col>
                      <span class="dialog-footer">
                        <el-button type="primary" size="large" round @click="cropperImage">{{$t('message.clip')}}</el-button>
                        <el-button type="primary" size="large" round @click="editImageComplete">{{$t('message.confirm')}}</el-button>
                      </span>
                    </el-col>
                </el-row>
            </template>
        </el-dialog>
    </el-dialog>
    <el-dialog
            v-model="updateDialog"
            title="Tips"
            width="30%"
            :before-close="handleClose">
        <span>{{$t('message.updateTip')}}</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateDialog=false">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="updateMessage">{{$t('message.update')}}</el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script>
    import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
    import {Plus} from '@element-plus/icons-vue'
    import apiUtil from "../util/apiUtil";
    import VuePictureCropper, { cropper } from 'vue-picture-cropper'
    export default {
        name: "WhatsNew",
        components: {
            Plus,
            VuePictureCropper,
        },
        data() {
            return {
                elementHeight: 50,
                innerHeight: 30,
                message: {
                    "category": "share"
                },
                messages: [

                ],
                messageIds: [

                ],
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
        methods: {
            addGraph () {
                this.graphs.push({
                    text: null, media: null, path: null, isMultiMedia: 3
                })
            },
            editImageComplete() {
                this.editImageVisible=false
            },
            addMessageWindow(){
                this.addMessageVisible=!this.addMessageVisible
                this.message = {
                    "category": "share"
                }
                if(!(this.graphs && this.graphs.length>0)){
                    this.graphs = [
                        {text: null, media: null, thumbnail: null, path: null, isMultiMedia: 3}
                    ]
                }
                if(!(this.messages && this.messages.length>0)){
                    this.messages = []
                }
            },
            deleteGraph (index) {
                this.graphs.splice(index, 1)
            },
            updateMessage(){
                if(this.messageIds){
                    this.batchGetIds(this.messageIds)
                }
                this.updateDialog = false
                if(this.closeDialogTimer){
                    window.clearTimeout(this.closeDialogTimer)
                }
            },
            openUpdateConfirm (){
                let _this = this
                if(_this.updateDialog){
                    _this.closeDialogTimer = setTimeout(()=>{
                        _this.updateDialog = false
                        if(_this.messageIds){
                            _this.batchGetIds(_this.messageIds)
                        }
                    }, window.countDown*1000)
                    if(_this.closeDialogTimer){
                        window.clearTimeout(_this.closeDialogTimer)
                        _this.closeDialogTimer = null
                    }
                }
            },
            async cropperImage () {
                let _this = this
                let file = await cropper.getFile()
                console.log(file)
                file.raw = file
                let base64 = cropper.getDataURL()
                _this.imageUrl = base64
                _this.graphs[this.currentIndex].thumbnail = base64
                //let file = await cropper.getFile()
                _this.graphs[this.currentIndex].media = file
                console.log(file)
                if(!base64){
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () =>{
                        base64 = String(reader.result)
                        _this.imageUrl=base64
                        _this.graphs[this.currentIndex]['thumbnail'] = base64
                    }
                }
            },
            getFirstImageFromVideo () {

            },
            editVideoConfirm() {
                this.editVideoVisible = false
            },
            btnUpload(index) {
                console.log('btnUpload'+index)
                this.currentIndex = index
            },
            async addMessage () {
                let _this = this
                if(!_this.message.topic){
                    apiUtil.message.error(_this.$t('message.topicRequired'))
                    return
                }
                if(!_this.message.summary){
                    apiUtil.message.error(_this.$t('message.summaryRequired'))
                    return
                }
                _this.uploadLoading = true
                await _this.uploadFiles()
                _this.message.content = []
                let body = {
                    'category': _this.message.category,
                    'topic': _this.message.topic,
                    'summary': _this.message.summary,
                    'content': []
                }
                for(let i in _this.graphs){
                    let graph = _this.graphs[i]
                    let items = {
                        'text': graph.text,
                        'path': graph.path,
                        'isMultiMedia': graph.isMultiMedia
                    }
                    body.content.push(items)
                    _this.message.content.push(items)
                }
                apiUtil.api.postBody(apiUtil.urls.post.upload, body)
                    .then(res => {
                        console.log(res)
                        _this.uploadLoading = false
                        apiUtil.message.success(_this.$t('message.publishSuccess'))
                        _this.addMessageVisible = false
                        let meta = JSON.parse(res.RawJSON)
                        meta['timestamp'] = res.Tm.replace('T', ' ').replace('Z', '')
                        console.log(res.Tm +'+'+meta.timestamp)
                        _this.messages.unshift(meta)
                        meta.Tm = res.Tm
                        meta.Owner = res.Owner
                        res['meta'] = meta
                        for(let j in meta.content){
                            if(meta.content[j].path){
                                meta.content[j].path = window.baseUrl.replace('/api', '')+'/'+res.Owner+'/' + meta.content[j].path
                            }
                            if(meta.content[j].path.indexOf('/video/')>0 ){
                                meta.content[j].isMultiMedia = 1
                            }else if(meta.content[j].path.indexOf('/image/')>0) {
                                meta.content[j].isMultiMedia = 2
                            }else{
                                meta.content[j].isMultiMedia = 3
                            }
                        }
                    }).catch(error => {
                        _this.uploadLoading = false
                        apiUtil.message.error(error)
                    })
            },
            editVideoDialogOpen () {
                console.log('editVideoDialogOpen')
            },
            editVideoDialogOpened () {
                this.firstVideoLoad = false
                console.log('editVideoDialogOpened')
            },
            editVideoDialogClosed () {
                this.firstVideoLoad = true
                console.log('editVideoDialogClosed')
            },
            canplay () {
                if(this.firstVideoLoad) {
                    let videoMaxTime = Math.floor(this.$refs.videoDom.duration)
                    console.log('video:[0, '+videoMaxTime+']')
                    this.videoTimeLine = [0, videoMaxTime]
                    this.videoTimeLineMax = videoMaxTime
                    this.firstVideoLoad = false
                }
            },
            async uploadFiles () {
                let _this = this
                if(_this.graphs.length>0){
                    for(let i=0;i<_this.graphs.length;i++){
                        let graph = _this.graphs[i]
                        if(graph.media){
                            graph['isMultiMedia'] = _this.$util.isMultiMedia(graph.media.name)
                            let formData = new FormData()
                            formData.append('file', graph.media.raw)
                            await apiUtil.api.upload(apiUtil.urls.file.uploadFormFile, formData)
                                .then(res => {
                                    console.log(res)
                                    graph.path = res
                                }).catch(error => {
                                apiUtil.message.error(error)
                            })
                        }
                    }
                }
            },
            beforeAvatarUpload (file) {
                this.firstVideoLoad = true
                let _this = this
                if(!file){
                    return
                }
                if(file.raw.size/1024/1024 > 20) {
                    apiUtil.message.warn(_this.$t('message.fileExceedsMaximum'))
                    return;
                }
                const { name } = file
                if(_this.$util.isMultiMedia(name) == 1){
                    _this.editVideoVisible = true
                    _this.graphs[_this.currentIndex].media = file
                    _this.originVideoUrl = window.webkitURL.createObjectURL(new Blob([file.raw]))
                }else if(_this.$util.isMultiMedia(name) == 2){
                    let reader = new FileReader()
                    reader.readAsDataURL(file.raw)
                    reader.onload = () => {
                        _this.picUrl = String(reader.result)
                        _this.editImageVisible = true
                    }
                }
            },
            timelineChange (value) {
                this.$refs.videoDom.currentTime = value[0]
            },
            timelineInput (value) {
                console.log('timelineInput:'+value)
            },
            transformSecondToVideoFormat(value) {
                const totalSecond = Number(value)
                let hours = Math.floor(totalSecond / (60 * 60))
                let minutes = Math.floor(totalSecond / 60) % 60
                let second = totalSecond % 60
                let hoursText = hours<10 ? '0'+hours : hours
                let minutesText = minutes<10 ? '0'+minutes : minutes
                let secondText = second<10 ? '0'+second : second
                return hoursText+':'+minutesText+':'+secondText
            },
            async editVideoComplete () {
                let _this = this
                const { name } = _this.graphs[_this.currentIndex].media
                let lastIndex = name.lastIndexOf('.')
                let sourceName = new Date().getTime()+ lastIndex > -1 ? name.substring(lastIndex, name.length) : ''
                let destName = 'out-'+sourceName
                const startTime = _this.videoTimeLine[0]
                const endTime = _this.videoTimeLine[1]
                console.log('clipRange', startTime, endTime)
                if (!_this.ffmpeg.isLoaded()) {
                    await _this.ffmpeg.load()
                }
                _this.ffmpeg.FS('writeFile', sourceName, await fetchFile(_this.graphs[_this.currentIndex].media.raw))
                _this.ffmpeg.setProgress(({ ratio }) => {
                    _this.editVideoProcess = Math.floor(ratio * 100)
                });
                this.showProcess = true
                await _this.ffmpeg.run('-i', sourceName, '-ss', _this.transformSecondToVideoFormat(startTime), '-to', _this.transformSecondToVideoFormat(endTime), destName)
                const data = _this.ffmpeg.FS('readFile', destName)
                _this.firstVideoLoad = true
                _this.originVideoUrl = window.webkitURL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
                let contentType = 'video/mp4'
                _this.videoFile = new File([data.buffer], name, {type: contentType, lastModified: Date.now()})
                const canvas = document.createElement('canvas')
                let video = _this.$refs.videoDom
                canvas.getContext('2d').drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
                const imgType = "png"
                this.firstImageVideoUrl = canvas.toDataURL('image/' + imgType);
                this.graphs[this.currentIndex].thumbnail = this.firstImageVideoUrl
                this.graphs[this.currentIndex].media.raw = this.videoFile
                console.log('firstImageVideoUrl:' + this.firstImageVideoUrl)
            },
            async batchGetIds(ids) {
                let _this = this
                if(ids.length > 0){
                    for(let i=ids.length - 1;i>=0;i--){
                        await apiUtil.api.get(apiUtil.urls.post.one, {'id': ids[i]}).then(async res => {
                            let meta = JSON.parse(res.RawJSON)
                            meta['timestamp'] = res.Tm.replace('T', ' ').replace('Z', '')
                            console.log(res.Tm +'+'+meta.timestamp)
                            _this.messages.unshift(meta)
                            meta.Tm = res.Tm
                            meta.Owner = res.Owner
                            res['meta'] = meta
                            for(let j in meta.content){
                                if(meta.content[j].path){
                                    meta.content[j].path = window.baseUrl.replace('/api', '')+'/'+res.Owner+'/' + meta.content[j].path
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
            apiUtil.api.get(apiUtil.urls.post.ids, {'fetchby': 'count', 'value': window.count}).then(res => {
                _this.batchGetIds(res)
                _this.updateMessageTimer = window.setInterval(()=>{
                    apiUtil.api.get(apiUtil.urls.post.ids, {'fetchby': 'time', 'value': window.time}).then(ids => {
                        if(ids.length>0){
                            _this.messageIds = ids
                            _this.updateDialog = true
                            _this.openUpdateConfirm()
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }, window.updateMessageInterval * 1000)
            }).catch(error => {
                apiUtil.message.error(error)
            })
            apiUtil.api.get(apiUtil.urls.user.avatar)
                .then(res => {
                    _this.avatar = res.src
                }).catch(error => {
                console.log(error)
                // apiUtil.message.error(error)
            })
            try {
                this.ffmpeg = createFFmpeg({
                    log: true,
                    // corePath: '/ffmpeg/ffmpeg-core.js',
                    corePath: '/ffmpeg-core.js'
                });
            }catch (e) {
                console.log(e)
            }
        },
        unmounted() {
            try {
                this.ffmpeg.exit()
            }catch (e) {
                console.log(e)
            }
            if(this.updateMessageTimer!=null){
                window.clearInterval(this.updateMessageTimer)
                this.updateMessageTimer = null
            }
            if(this.closeDialogTimer){
                window.clearTimeout(this.closeDialogTimer)
                this.closeDialogTimer = null

            }
        }
    }
</script>

<style scoped lang="scss">
    .cropper-content{
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
    .cropper-box{
        flex: 1;
        width: 100%;
    .cropper{
        width: auto;
        height: 300px;
    }
    }

    .show-preview{
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
    .preview{
        overflow: hidden;
        border:1px solid #67c23a;
        background: #cccccc;
    }
    }
    }
    .message {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .slider-demo-block {
        display: flex;
        align-items: center;
    }
    .el-card__header {
        padding:0px;
    }
    button.el-carousel__button {
        padding: 2px 1px;
        border: 2px solid blue;
    }
    .is-active {
        font-weight: 800;
    }
    .show {
        z-index: 2000;
    }
    .hidden {
        z-index: -1;
    }
    .demo-image__placeholder.image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 14px;
    }
    .demo-image__placeholder .dot {
        animation: dot 2s infinite steps(3, start);
        overflow: hidden;
    }
</style>