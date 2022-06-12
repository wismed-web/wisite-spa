export default {
    isVideo(name) {

        return /\.(mp4)$/.test(name)
    },
    isMultiMedia(name) {
        if(this.isVideo(name)){
            return 1
        }else if(this.isImage(name)){
            return 2
        }else {
            return 3
        }
    },
    isImage(name) {
        return /\.(jpg|jpeg|png|JPG|PNG)$/.test(name)
    }
}