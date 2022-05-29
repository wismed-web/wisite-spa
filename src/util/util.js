export default {
    isVideo(name) {
        return /\.(mp4)$/.test(name)
    },
    isImage(name) {
        return /\.(jpg|jpeg|png|JPG|PNG)$/.test(name)
    }
}