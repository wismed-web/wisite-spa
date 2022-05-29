<template>
    <div  style="width: 100%;">
        <h2>{{$t('message.whats-new')}}</h2>
    </div>
    <div class="message">
        <el-button circle type="primary" style="width:80px;height:80px;">
            <el-icon class="el-input__icon" :size="40" @click="addMessageVisible=!addMessageVisible">
                <Plus style="cursor: pointer;"></Plus>
            </el-icon>
        </el-button>
    </div>
    <el-dialog v-model="addMessageVisible" style="width:100%;height:600px;" :title="$t('message.addMessage')" center>
        <el-form :model="message" label-width="40px">
            <el-row>
                <el-col :span="2">
                    <el-avatar shape="square" size="large" :src="avatar" style="line-height: 100px;height:100px;width:100px;margin-top:5px;"/>
                </el-col>
                <el-col :span="22">
                    <el-form-item>
                        <el-input v-model="message.title" autocomplete="off" :placeholder="$t('message.messageTitleTip')"/>
                    </el-form-item>
                    <el-form-item v-for="(graph, index) in graphs" :key="index">
                        <el-row style="width:100%;" :id="`upload-${index}`">
                            <el-col :span="20">
                                <el-input type="textarea"
                                          rows="2" v-model="graph.content" autocomplete="off" :placeholder="$t('message.messageTitleTip')"/>
                            </el-col>
                            <el-col :span="1">
                                <img v-if="graph.thumbnail" :src="graph.thumbnail" width="50" height="50"/>
                            </el-col>
                            <el-col :span="3">
                                <el-upload
                                        class="avatar-uploader"
                                        :show-file-list="false"
                                        :auto-upload="false"
                                        action=""
                                        style="margin-left:30px;text-align:right;"
                                        :on-change="beforeAvatarUpload">
                                    <el-button @click="btnUpload(index)" type="primary" round>{{$t('message.selectMedia')}}</el-button>
                                </el-upload>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row style="width:100%;">
                            <el-col :span="24" style="text-align: right;">
                                <el-button @click="addGraph" type="primary" round>{{$t('message.more')}}</el-button>
                            </el-col>
                        </el-row>

                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="message.wrapup" autocomplete="off" :placeholder="$t('message.wrapupTip')"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
          <span class="dialog-footer" style="margin-left: 700px;">
            <el-button type="primary" size="large" round @click="addMessage">{{$t('message.publish')}}</el-button>
          </span>
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
        <el-dialog v-model="editImageVisible" :title="$t('message.editImage')" style="width:100%;height:500px;" center>
            <el-row>
                <el-col :span="10">
                    <vue-picture-cropper
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
                          preview: preview,
                        }"
                            @ready="ready"
                    />
                </el-col>
                <el-col :span="10" :offset="3">
                    <img width="400" height="400" :src="imageUrl" class="avatar" />
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

                },
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
                    {content: null, media: null, thumbnail: null}
                ],
                picUrl: null,
                firstImageVideoUrl: null,
                currentIndex: 0
            }
        },
        methods: {
            addGraph () {
                this.graphs.push({
                    content: null, media: null
                })
            },
            // async cropperConfirm () {
            //     const file = await cropper.getFile({
            //         fileName: 'header',
            //     })
            //     this.avatarFile = file
            //     this.showAvatarFlag = false
            //     let _this = this
            //     let formData = new FormData()
            //     formData.append('note', '')
            //     formData.append('group0', '')
            //     formData.append('group1', '')
            //     formData.append('group2', '')
            //     formData.append('file', _this.avatarFile)
            //     apiUtil.api.upload(apiUtil.urls.file.upload, formData)
            //         .then(res => {
            //             console.log(res)
            //             apiUtil.message.success("更新成功")
            //         }).catch(error => {
            //         apiUtil.message.error(error)
            //     })
            // },
            editImageComplete() {
                this.editImageVisible = false
            },
            async cropperImage () {
                let base64 = cropper.getDataURL()
                this.imageUrl = base64
                this.graphs[this.currentIndex].thumbnail = base64
                const file = await cropper.getFile({
                    fileName: 'header',
                })
                this.graphs[this.currentIndex].media = file
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
            addMessage () {
                this.graphs = [
                    {content: null, media: null, thumbnail: null}
                ]
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
                if(_this.$util.isVideo(name)){
                    _this.editVideoVisible = true
                    _this.graphs[_this.currentIndex].media = file
                    _this.originVideoUrl = window.webkitURL.createObjectURL(new Blob([file.raw]))
                }else if(_this.$util.isImage(name)){
                    _this.editImageVisible = true
                    let reader = new FileReader()
                    reader.readAsDataURL(file.raw)
                    reader.onload = () => {
                        _this.picUrl = String(reader.result)
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
                console.log('firstImageVideoUrl:' + this.firstImageVideoUrl)
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
            apiUtil.api.get(apiUtil.urls.user.avatar)
                .then(res => {
                    _this.avatar = res.src
                }).catch(error => {
                console.log(error)
                // apiUtil.message.error(error)
            })
            this.ffmpeg = createFFmpeg({
                log: true,
                // corePath: '/ffmpeg/ffmpeg-core.js',
                corePath: '/ffmpeg-core.js'
            });
        },
        unmounted() {
            this.ffmpeg.exit()
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

</style>