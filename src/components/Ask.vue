<template>
    <div  style="width: 100%;">
        <h2>{{$t('message.ask')}}</h2>
    </div>
</template>

<script>
    export default {
        name: "Ask",
        data() {
            return {
                onlines: [
                    {index: 1, name: 'name'}
                ],
            }
        },
    }
</script>

<style scoped>

</style>