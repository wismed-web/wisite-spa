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
<!--                    <div style="color:white;width: 100%;line-height: 68px;font-size: 18px;font-weight: bold;">-->
<!--                        <el-avatar shape="square" size="large" :src="avatar" style="line-height: 100px;height:100px;margin-top:5px;"/>-->
<!--                    </div>-->
                    <el-avatar shape="square" size="large" :src="avatar" style="line-height: 100px;height:100px;width:100px;margin-top:5px;"/>
                </el-col>
                <el-col :span="20">
                    <el-form-item>
                        <el-input v-model="message.title" autocomplete="off" :placeholder="$t('message.messageTitleTip')"/>
                    </el-form-item>
                    <el-form-item v-for="(graph, index) in graphs" :key="index">
                        <el-input style="width:85%;"
                                  type="textarea"
                                  rows="2"
                                  autosize v-model="graph.content" autocomplete="off" :placeholder="$t('message.messageTitleTip')"/>
                        <el-upload
                                class="avatar-uploader"
                                ref="avatarFile"
                                :show-file-list="false"
                                :auto-upload="false"
                                action=""
                                style="margin-left:30px;"
                                :on-change="beforeAvatarUpload">
                            <el-button type="primary" round>{{$t('message.selectMedia')}}</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left:650px;" @click="addGraph" type="primary" round>{{$t('message.more')}}</el-button>
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
        <el-dialog @open="editVideoDialogOpen" @closed="editVideoDialogClosed" @opened="editVideoDialogOpened" v-model="editVideoVisible" :title="$t('message.addMessage')" style="width:100%;height:500px;" center>
            <el-row>
                <video v-on:canplay="canplay" id="videoDom" class="my-video" ref="videoDom" style="width:500px;height:500px;" :src="originVideoUrl" controls></video>
            </el-row>
            <el-row>
                <div class="slider-demo-block" style="width: 500px;">
                    <el-slider show-stops @change="timelineChange" @input="timelineInput" v-model="videoTimeLine" :min="videoTimeLineMin" :max="videoTimeLineMax" range/>
                </div>
            </el-row>
            <template #footer>
              <span class="dialog-footer" style="margin-left: 700px;">
                <el-button type="primary" size="large" round @click="editVideoComplete">{{$t('message.confirm')}}</el-button>
              </span>
            </template>
        </el-dialog>
    </el-dialog>
</template>

<script>
    import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
    import {Plus} from '@element-plus/icons-vue'
    import apiUtil from "../util/apiUtil";
    export default {
        name: "WhatsNew",
        components: {
            Plus
        },
        data() {
            return {
                elementHeight: 50,
                innerHeight: 30,
                message: {

                },
                addMessageVisible: false,
                editVideoVisible: false,
                originFile: null,
                videoFile: null,
                avatar: null,
                originVideoUrl: "",
                videoTimeLine: [0, 100],
                videoTimeLineMax: null,
                videoTimeLineMin: 0,
                firstVideoLoad: true,
                ffmpeg: null,
                graphs: [
                    {content: null, media: null}
                ]
            }
        },
        methods: {
            addGraph () {
                this.graphs.push({
                    content: null, media: null
                })
            },
            addMessage () {
                this.graphs = [
                    {content: null, media: null}
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
                }
            },
            beforeAvatarUpload (file) {
                this.videoFile = file
                this.editVideoVisible = true
                this.originVideoUrl = window.webkitURL.createObjectURL(new Blob([file.raw]))
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
                const { name } = _this.videoFile
                let lastIndex = name.lastIndexOf('.')
                let sourceName = new Date().getTime()+ lastIndex > -1 ? name.substring(lastIndex, name.length) : ''
                let destName = 'out-'+sourceName
                const startTime = _this.videoTimeLine[0]
                const endTime = _this.videoTimeLine[1]
                console.log('clipRange', startTime, endTime)
                if (!_this.ffmpeg.isLoaded()) {
                    await _this.ffmpeg.load()
                }
                _this.ffmpeg.FS('writeFile', sourceName, await fetchFile(_this.videoFile.raw))
                await _this.ffmpeg.run('-i', sourceName, '-ss', _this.transformSecondToVideoFormat(startTime), '-to', _this.transformSecondToVideoFormat(endTime), destName)
                const data = _this.ffmpeg.FS('readFile', destName)
                _this.firstVideoLoad = true
                _this.originVideoUrl = window.webkitURL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
                let contentType = 'video/mp4'
                _this.videoFile = new File([data.buffer], name, {type: contentType, lastModified: Date.now()})
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
        }
    }
</script>

<style scoped>
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