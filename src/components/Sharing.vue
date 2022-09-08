<template>
    <div style="width: 80%;margin: 0 auto;">
        <el-card class="box-card" v-for="(m, messageIndex) in messages" v-bind:key="m.id" style="padding:2px;" :height="m.vfx.height">
            <template #header style="padding:0px;margin:0px;">
                <div class="card-header" style="margin-top:0px;padding:0px;height:44px;line-height: 44px;">
                    <el-row style="height: 44px;">
                        <el-col :span="1">
                            <el-avatar size="large" :src="m.avatar" style="line-height: 50px;height:50px;width:50px;"/>
                        </el-col>
                        <el-col :span="4" style="text-align: left;">
                            <el-row style="line-height: 18px;padding-left:5px;margin-bottom: 5px;">
                                <span style="line-height: 18px;"><b>{{m.realName}}</b></span>
                            </el-row>
                            <el-row style="line-height: 18px;padding-left:5px;">
                                <span style="line-height: 18px;">@{{m.Owner}}</span>
                            </el-row>
                        </el-col>
                        <el-col :span="15" style="text-align: center;">
                            <span style="line-height: 44px;"><b>{{m.topic}}</b></span>
                        </el-col>
                        <el-col :span="4" style="text-align: right;">
                            <span style="line-height: 44px;"><i>{{m.timestamp}}</i></span>
                        </el-col>
                    </el-row>
                </div>
            </template>
            <div class="block text-center" m="t-4">
                <el-carousel v-if="m.content" trigger="click" :height="m.seeHeight" :autoplay="autoplay" :style="{height: m.seeHeight+'px'}">
                    <el-carousel-item  v-for="(item, index) in m.content" :key="index" :label="index" :height="m.seeHeight" :style="{height: m.seeHeight+'px', 'line-height': m.seeHeight+'px'}">
                        <el-row v-if="item.isMultiMedia == 1 || item.isMultiMedia == 2">
                            <el-col :span="14">
                                <div>
                                    <el-image close-on-press-escape="true" preview-teleported="true" :preview-src-list="[item.attachment.path]" crossOrigin="anonymous" v-if="item.isMultiMedia ==2" :src="item.attachment.path" fit="cover"
                                              :width="item.attachment.seeWidth" :height="item.attachment.seeHeight">
                                        <template #placeholder>
                                            <div class="image-slot" style="font-size: 10px;">{{$t('message.loading')}}<span class="dot">...</span></div>
                                        </template>
                                    </el-image>
                                    <video :width="item.attachment.seeWidth" :height="item.attachment.seeHeight" crossOrigin="anonymous" v-if="item.isMultiMedia ==1" class="my-video" style="object-fit: fill;" :src="item.attachment.path" controls></video>
                                </div>
                            </el-col>
                            <el-col :span="10" style="text-align: left;padding-left:10px;">
                                <div>
                                    {{item.text}}
                                </div>
                            </el-col>
                        </el-row>
                        <el-row v-if="item.isMultiMedia != 1 && item.isMultiMedia != 2" justify="center">
                            <div>
                                {{item.text}}
                            </div>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div>
                <el-row>
                    <el-col :offset="21" :span="1">
                        <img style="cursor: pointer;" @click="bookmark(m)" src="../assets/collect.png" width="32" height="32" v-if="m.bookmark"/>
                        <img style="cursor: pointer;" @click="bookmark(m)" src="../assets/uncollect.png" width="32" height="32" v-if="!m.bookmark"/>
                    </el-col>
                    <el-col :span="1">
                        <img style="cursor: pointer;" @click="thumbsup(m)" src="../assets/hasThump.png" width="32" height="32" v-if="m.ThumbsUp"/>
                        <img style="cursor: pointer;" @click="thumbsup(m)" src="../assets/noThump.png" width="32" height="32" v-if="!m.ThumbsUp"/>
                        <span>{{m.Count}}</span>
                    </el-col>
                    <el-col :span="1" v-if="messageIndex<0">
                        <img style="cursor: pointer;" @click="getComments(m, messageIndex)" src="../assets/comments.png" width="32" height="32"/>
                        <span>{{m.commentCount}}</span>
                    </el-col>
                </el-row>
                <el-row v-if="m.commentShow">
                    <el-row style="width: 100%;">
                        <el-col :offset="8" :span="14">
                            <el-input autosize type="textarea" v-model="m.comment" :placeholder="$t('message.commentTip')" />
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="submitComment(m)" type="primary">{{$t('message.comment')}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row style="width:100%;" v-for="(comment, index) in m.comments" :key="index" :label="index">
                        <el-col :span="1">
                            <el-avatar size="large" :src="comment.avatar" style="line-height: 50px;height:50px;width:50px;"/>
                        </el-col>
                        <el-col :span="4" style="text-align: left;">
                            <el-row style="line-height: 18px;padding-left:5px;margin-bottom: 5px;">
                                <span style="line-height: 18px;"><b>{{comment.realName}}</b></span>
                            </el-row>
                            <el-row style="line-height: 18px;padding-left:5px;">
                                <span style="line-height: 18px;">@{{comment.Owner}}</span>
                            </el-row>
                        </el-col>
                        <el-col :span="14">
                            <div style="line-height: 44px;" id="{{comment.id}}">{{comment.content[0].text}}</div>
                        </el-col>
                        <el-col :span="4" style="text-align: right;">
                            <span style="line-height: 44px;"><i>{{comment.timestamp}}</i></span>
                        </el-col>
                    </el-row>
                </el-row>
            </div>
        </el-card>
    </div>
    <div class="message" :style="{ height: `${elementHeight}px` }">
        <el-affix :offset="`${elementHeightAffix}`">
            <div>
                <el-button circle type="primary" style="width:80px;height:80px;">
                    <el-icon class="el-input__icon" :size="40" @click="loadMore">
                        <Bottom style="cursor: pointer;"></Bottom>
                    </el-icon>
                </el-button>
            </div>
        </el-affix>
    </div>
</template>

<script>
    import apiUtil from "../util/apiUtil";
    import {Bottom} from '@element-plus/icons-vue'
    import {cropper} from 'vue-picture-cropper'
    export default {
        name: "Sharing",
        components: {
            Bottom
        },
        data() {
            return {
                elementHeight: 50,
                elementHeightAffix: 50,
                innerHeight: 30,
                message: {
                    "category": "share"
                },
                messages: [

                ],
                messageIds: [

                ],
                hasLoadIds:[],
                showMore: false,
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
                pageSize: 5,
                currentPage: 1,
                totalCount: null,
                selectFlag: false,
                x: null,
                y: null,
                width: null,
                height: null,
                videoWidth: null,
                videoHeight: null,
                videoDomWidth: null,
                videoDomHeight: null,
                currentYear: null,
                currentMonth: null,
            }
        },
        methods: {
            addGraph () {
                this.graphs.push({
                    text: null, media: null, path: null, isMultiMedia: 3
                })
            },
            mousedown (e) {
                this.selectFlag = true
                this.x = e.offsetX
                this.y = e.offsetY

            },
            mouseup (e) {
                console.log(e)
                if(this.selectFlag){
                    let scaleX = this.graphs[this.currentIndex]['videoWidth']/this.graphs[this.currentIndex]['width']
                    let scaleY = this.graphs[this.currentIndex]['videoHeight']/this.graphs[this.currentIndex]['height']
                    let x = this.x * scaleX
                    let y = this.y * scaleY
                    let width = this.width * scaleX
                    let height = this.height * scaleY
                    this.graphs[this.currentIndex].note = 'crop:'+parseInt(x)+','+parseInt(y)+','+parseInt(width)+','+parseInt(height)
                    console.log('videoWidth:'+this.graphs[this.currentIndex]['videoWidth']+',videoHeight:'+this.graphs[this.currentIndex]['videoHeight']+',width:'+this.graphs[this.currentIndex]['width']+',height:'+this.graphs[this.currentIndex]['height'])
                    console.log(this.graphs[this.currentIndex].note)
                }
                this.selectFlag = false

            },
            mousemove (e) {
                if(this.selectFlag){
                    let cancas = this.$refs.selectVideo
                    let ctx = cancas.getContext('2d')
                    ctx.clearRect(0, 0, this.videoDomWidth, this.videoDomHeight)
                    ctx.beginPath()
                    ctx.strokeStyle = 'red'
                    ctx.lineWidth = 1
                    this.width = e.offsetX - this.x
                    this.height = e.offsetY - this.y
                    ctx.strokeRect(this.x, this.y, this.width, this.height)

                }
            },
            editImageComplete() {
                this.editImageVisible=false
            },
            submitComment (message) {
                let _this = this
                if(!message.comment){
                    apiUtil.message.error(_this.$t('message.commentTip'))
                    return
                }
                let body = {
                    "category": "",
                    "topic": "comment",
                    "content": [
                        {
                            "text": "what is in the input box",
                            "path": ""
                        }
                    ]
                }
                body.content[0].text = message.comment
                _this.uploadLoading = true
                apiUtil.api.postBody(apiUtil.urls.post.upload+'?followee='+message['id'], body)
                    .then(async res => {
                        console.log(res)
                        message['comment'] = null;
                        _this.uploadLoading = false
                        apiUtil.message.success(_this.$t('message.commentSuccess'))
                        await _this.getCommentCount(message['id'], message)
                        if('commentIds' in message){
                            message['hasLoadIds'] = []
                            message['comments'] = []
                            let commentIds = message['commentIds']
                            for(let index=0;index<commentIds.length;index++){
                                await apiUtil.api.get(apiUtil.urls.post.one, {'id': commentIds[index]}).then(async res => {
                                    let meta = JSON.parse(res.RawJSON)
                                    if(!('hasLoadIds' in message)){
                                        message['hasLoadIds'] = []
                                    }
                                    message.hasLoadIds.push(res['ID'])
                                    meta['timestamp'] = res.Tm.replace('T', ' ').replace('Z', '')
                                    console.log(res.Tm +'+'+meta.timestamp)
                                    meta.Tm = res.Tm
                                    meta.id = res.ID
                                    meta.Owner = res.Owner
                                    res['meta'] = meta
                                    meta['commentShow'] = false
                                    await _this.getCommentCount(res['ID'], meta)
                                    if(!('comments' in message)){
                                        message['comments'] = []
                                    }
                                    await _this.getAvatar(res.Owner, meta)
                                    message['comments'].unshift(meta)
                                }).catch(error => {
                                    console.log(error)
                                })
                            }
                        }
                    }).catch(error => {
                    _this.uploadLoading = false
                    apiUtil.message.error(error)
                })
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
                }else{
                    this.graphs = [
                        {text: null, media: null, thumbnail: null, path: null, isMultiMedia: 3}
                    ]
                }
                if(!(this.messages && this.messages.length>0)){
                    this.messages = []
                }
            },
            bookmark (message) {
                let _this = this
                apiUtil.api.patch(apiUtil.urls.post.bookmark, null, {id: message['id']}).then(res => {
                    console.log(res)
                    message['bookmark'] = res
                    _this.initMessage()
                }).catch(error => {
                    apiUtil.message.error(error)
                })
            },
            thumbsup (message) {
                apiUtil.api.patch(apiUtil.urls.post.thumbsup, null, {id: message['id']}).then(res => {
                    console.log(res)
                    message['ThumbsUp'] = res['ThumbsUp']
                    message['Count'] = res['Count']
                }).catch(error => {
                    apiUtil.message.error(error)
                })
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
                let round = cropper.getData([true])
                console.log(round)
                console.log(file)
                file.raw = file
                let base64 = cropper.getDataURL()
                _this.imageUrl = base64
                _this.graphs[_this.currentIndex].thumbnail = base64
                //let file = await cropper.getFile()
                _this.graphs[_this.currentIndex].media = file
                const imageData = cropper.getImageData()
                console.log(imageData)
                _this.graphs[_this.currentIndex].imageWidth = imageData['naturalWidth']
                _this.graphs[_this.currentIndex].imageHeight = imageData['naturalHeight']
                _this.graphs[_this.currentIndex].note = 'crop:'+round.x+','+round.y+','+round.width+','+round.height
                console.log(file)
                if(!base64){
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () =>{
                        base64 = String(reader.result)
                        _this.imageUrl=base64
                        _this.graphs[this.currentIndex]['thumbnail'] = base64
                        _this.editImageVisible=false
                    }
                }
                _this.editImageVisible=false
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
                _this.uploadLoading = true
                await _this.uploadFiles()
                _this.message.content = []
                let body = {
                    'category': _this.message.category,
                    'topic': _this.message.topic,
                    // 'summary': _this.message.summary,
                    'content': []
                }
                for(let i in _this.graphs){
                    let graph = _this.graphs[i]
                    let items = {
                        'text': graph.text,
                        'attachment': {
                            'path': graph.path
                        },
                        // 'path': graph.path,
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
                        _this.batchGetIds([res])
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
                this.videoWidth = this.$refs.videoDom.videoWidth
                this.videoHeight = this.$refs.videoDom.videoHeight
                this.graphs[this.currentIndex]['videoWidth'] = this.videoWidth
                this.graphs[this.currentIndex]['videoHeight'] =this.videoHeight
                let maxWidth = 600
                let width = this.videoWidth
                let height = this.videoHeight
                if(this.videoHeight>maxWidth && this.videoWidth<maxWidth){
                    width = maxWidth
                    height = maxWidth * this.videoHeight/this.videoWidth
                }else if(this.videoHeight>maxWidth && this.videoWidth>maxWidth){
                    width = maxWidth
                    height = maxWidth * this.videoHeight/this.videoWidth
                }else if(this.videoHeight<maxWidth && this.videoWidth>maxWidth){
                    width = maxWidth
                    height = maxWidth * this.videoHeight/this.videoWidth
                }
                this.$refs.videoDom.width = width
                this.$refs.videoDom.height = height
                this.graphs[this.currentIndex]['width'] = width
                this.graphs[this.currentIndex]['height'] =height
                this.$refs.selectVideo.style.marginLeft = -width+'px';
                this.$refs.selectVideo.width = width;
                this.$refs.selectVideo.height = height;
                this.videoDomWidth = width
                this.videoDomHeight = height
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
                        if(graph.source){
                            graph['isMultiMedia'] = _this.$util.isMultiMedia(graph.source.name)
                            let formData = new FormData()
                            formData.append('note', graph.note)
                            formData.append('file', graph.source.raw)
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
                    _this.graphs[_this.currentIndex].source = file
                    _this.graphs[_this.currentIndex].media = file
                    _this.graphs[_this.currentIndex].isMultiMedia = 1
                    _this.graphs[_this.currentIndex].originVideoUrl = window.webkitURL.createObjectURL(new Blob([file.raw]))
                    _this.originVideoUrl = window.webkitURL.createObjectURL(new Blob([file.raw]))
                }else if(_this.$util.isMultiMedia(name) == 2){
                    _this.graphs[_this.currentIndex].isMultiMedia = 2
                    _this.graphs[_this.currentIndex].source = file
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
            async getComments (message) {
                let _this = this
                if(message['commentShow']){
                    message['commentShow'] = false
                    return
                }
                if('commentIds' in message){
                    message['hasLoadIds'] = []
                    message['comments'] = []
                    let commentIds = message['commentIds']
                    for(let index=0;index<commentIds.length;index++){
                        await apiUtil.api.get(apiUtil.urls.post.one, {'id': commentIds[index]}).then(async res => {
                            let meta = JSON.parse(res.RawJSON)
                            if(!('hasLoadIds' in message)){
                                message['hasLoadIds'] = []
                            }
                            message.hasLoadIds.push(res['ID'])
                            meta['timestamp'] = res.Tm.replace('T', ' ').replace('Z', '')
                            console.log(res.Tm +'+'+meta.timestamp)
                            meta.Tm = res.Tm
                            meta.id = res.ID
                            meta.Owner = res.Owner
                            res['meta'] = meta
                            meta['commentShow'] = false
                            await _this.getCommentCount(res['ID'], meta)
                            if(!('comments' in message)){
                                message['comments'] = []
                            }
                            await _this.getAvatar(res.Owner, meta)
                            message['comments'].unshift(meta)
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                    message['commentShow'] = true
                }else{
                    message['commentShow'] = true
                }
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
            async batchGetIds(ids) {
                let _this = this
                if(ids.length > 0){
                    for(let i=ids.length - 1;i>=0;i--){
                        if(_this.hasLoadIds.indexOf(ids[i])!=-1 ){
                            continue
                        }
                        await apiUtil.api.get(apiUtil.urls.post.one, {'id': ids[i]}).then(async res => {
                            let meta = JSON.parse(res.RawJSON)
                            _this.hasLoadIds.push(res['ID'])
                            meta['timestamp'] = res.Tm.replace('T', ' ').replace('Z', '')
                            console.log(res.Tm +'+'+meta.timestamp)
                            meta.Tm = res.Tm
                            meta.id = res.ID
                            meta.Owner = res.Owner
                            res['meta'] = meta

                            let maxHeight,maxWidth
                            for(let j in meta.content){
                                if(meta.content[j].attachment.path){
                                    meta.content[j].attachment.path = window.baseUrl.replace('/api', '')+'/' + meta.content[j].attachment.path
                                }
                                if('size' in meta.content[j].attachment){
                                    let widthHeight = meta.content[j].attachment.size.split(',')
                                    meta.content[j].attachment.mediaFileWidth = widthHeight[0]
                                    meta.content[j].attachment.mediaFileHeight = widthHeight[1]
                                    if(!('seeWidth' in meta)){
                                        let seeWidth = 600
                                        let seeHeight
                                        if(widthHeight[0]>600 && widthHeight[1]<600){
                                            seeWidth = 600
                                            seeHeight = 600 * widthHeight[1]/widthHeight[0]
                                        }else if(widthHeight[0]>600 && widthHeight[1]>600){
                                            if(widthHeight[0]>widthHeight[1]){
                                                seeWidth = 600
                                                seeHeight = 600 * widthHeight[1]/widthHeight[0]
                                            }else{
                                                seeHeight = 600
                                                seeWidth = 600 * widthHeight[0]/widthHeight[1]
                                            }
                                        }else if(widthHeight[0]<600 && widthHeight[1]>600){
                                            seeHeight = 600
                                            seeWidth = 600 * widthHeight[0]/widthHeight[1]
                                        }else{
                                            if(widthHeight[0]>widthHeight[1]){
                                                seeWidth = 600
                                                seeHeight = 600 * widthHeight[1]/widthHeight[0]
                                            }else{
                                                seeHeight = 600
                                                seeWidth = 600 * widthHeight[0]/widthHeight[1]
                                            }
                                        }
                                        if(!maxWidth){
                                            maxWidth = seeWidth
                                            maxHeight = seeHeight
                                        }else{
                                            if(maxWidth<seeWidth){
                                                maxWidth = seeWidth
                                            }
                                            if(maxHeight<seeHeight){
                                                maxHeight = seeHeight
                                            }
                                        }
                                        meta.content[j].attachment['seeHeight'] = seeHeight
                                        meta.content[j].attachment['seeWidth'] = seeWidth
                                    }
                                }
                                if(meta.content[j].attachment.path.indexOf('/video/')>0 ){
                                    meta.content[j].isMultiMedia = 1
                                }else if(meta.content[j].attachment.path.indexOf('/image/')>0) {
                                    meta.content[j].isMultiMedia = 2
                                }else{
                                    meta.content[j].isMultiMedia = 3
                                }
                            }
                            meta['seeHeight'] = maxHeight
                            meta['seeWidth'] = maxWidth
                            await _this.getAvatar(res.Owner, meta)
                            await _this.getRealName(res.Owner, meta)
                            await _this.getThumbsupStatus(res['ID'], meta)
                            // await _this.getBookmarkStatus(res['ID'], meta)
                            meta['bookmark'] = true
                            // await _this.getCommentCount(res['ID'], meta)
                            _this.messages.unshift(meta)
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                    _this.showMore = true
                }
            },
            async getCommentCount(id, message){
                await apiUtil.api.get(apiUtil.urls.post.folloerIds, {followee: id})
                    .then(res => {
                        if(res && res.length>0){
                            message['commentCount'] = res.length
                            message['commentIds'] = res
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            },
            async getThumbsupStatus(id, message){
                await apiUtil.api.get(apiUtil.urls.post.thumbsupStatus, null,{id: id})
                    .then(res => {
                        if(res){
                            message['ThumbsUp'] = res['ThumbsUp']
                            if(res['Count'] > 0){
                                message['Count'] = res['Count']
                            }
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            },
            async getBookmarkStatus(id, message){
                await apiUtil.api.get(apiUtil.urls.post.bookmarkStatus, null,{id: id})
                    .then(res => {
                        if(res){
                            message['bookmark'] = res
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            },
            async getRealName(uname, message) {
                let _this = this
                if(uname in _this.nameMap){
                    message.realName = _this.nameMap[uname]
                    return
                }
                await apiUtil.api.get(apiUtil.urls.admin.users, {uname: uname})
                    .then(res => {
                        if(res && res.length>0){
                            message.realName = res[0].name
                            _this.nameMap[uname] = res[0].name
                        }
                    }).catch(error => {
                        console.log(error)
                        // apiUtil.message.error(error)
                    })
            },
            async getAvatar(uname, message) {
                let _this = this
                if(uname in _this.avatars){
                    message.avatar = _this.avatars[uname]
                    return
                }
                await apiUtil.api.get(apiUtil.urls.admin.avatar, {'uname': uname})
                    .then(res => {
                        // message.$set('avatar', res.src)
                        message.avatar = res.src
                        _this.avatars[uname] = res.src
                    }).catch(error => {
                        console.log(error)
                    })
            },
            initMessage(){
                let _this = this

                apiUtil.api.get(apiUtil.urls.post.bookmarked, {'order': 'desc'}).then(res => {
                    _this.messages = []
                    if(res != null){
                        _this.totalCount = res.length
                        _this.batchGetIds(res)
                    }
                }).catch(error => {
                    apiUtil.message.error(error)
                })
            },
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

        },
        mounted() {
            let _this = this
            _this.$nextTick(() => {
                this.elementHeight = window.innerHeight - 68
                this.innerHeight = this.elementHeight - 20
                _this.elementHeightAffix = _this.elementHeight - 20
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
            apiUtil.api.get(apiUtil.urls.user.avatar)
                .then(res => {
                    _this.avatar = res.src
                }).catch(error => {
                console.log(error)
            })
        },
        unmounted() {
        }
    }
</script>

<style scoped>
    /*.el-carousel {*/
    /*    height: 100% !important;*/
    /*}*/
    .el-carousel /deep/ .el-carousel__container {
        height: 100% !important;
    }
    .el-image /deep/ .el-image__inner{
        vertical-align: middle !important;
    }
</style>