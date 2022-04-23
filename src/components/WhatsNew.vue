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
    <el-dialog v-model="addMessageVisible" :title="$t('message.addMessage')" center>
        <el-form :model="message" label-width="120px">
            <el-form-item :label="$t('message.messageTitle')">
                <el-input v-model="message.title" autocomplete="off" :placeholder="$t('message.messageTitleTip')"/>
            </el-form-item>
            <el-form-item :label="$t('message.messageContent')">
                <el-input
                        v-model="message.content"
                        rows="6"
                        type="textarea"
                        maxlength="100"
                        show-word-limit
                        :placeholder="$t('message.messageContentTip')"/>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addMessageVisible = false">{{$t('message.cancel')}}</el-button>
            <el-button type="primary" @click="addMessage">{{$t('message.confirm')}}</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script>
    import {Plus} from '@element-plus/icons-vue'
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
                addMessageVisible: false
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
        }
    }
</script>

<style scoped>
    .message {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
</style>