<template>
    <div class="mainPage"
         ref="playerRef"></div>
</template>
   
  <script setup>
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import { reactive, nextTick, onBeforeUnmount, getCurrentInstance, onMounted, ref } from 'vue'

const playerRef = ref()
const { proxy } = getCurrentInstance()
const state = reactive({
    instance: null
})

const props = defineProps({
    // 开启吸底模式
    fixed: {
        type: Boolean,
        default: true
    },
    // 开启迷你模式
    mini: {
        type: Boolean,
        default: true
    },
    // 音频自动播放
    autoplay: {
        type: Boolean,
        default: false
    },
    // 主题色
    theme: {
        type: String,
        default: '#41b883'
    },
    // 音频循环播放
    loop: {
        type: String,
        default: 'all' //'all' | 'one' | 'none'
    },
    // 音频循环顺序
    order: {
        type: String,
        default: 'random' //'list' | 'random'
    },
    float: {
        type: Boolean,
        default: true
    },
    // 预加载
    preload: {
        type: String,
        default: 'auto' //'auto' | 'metadata' | 'none'
    },
    // 默认音量
    volume: {
        type: Number,
        default: 0.7,
        validator: (value) => {
            return value >= 0 && value <= 1;
        }
    },
    // 歌曲服务器(netease-网易云, tencent-qq音乐, kugou-酷狗, xiami-小米音乐, baidu-百度音乐)
    songServer: {
        type: String,
        default: 'netease' //'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu'
    },
    // 播放类型(song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家)
    songType: {
        type: String,
        default: 'playlist'
    },
    // 歌的id
    songId: {
        type: String,
        default: '19723756'
    },
    // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    mutex: {
        type: Boolean,
        default: true
    },
    // 传递歌词方式
    lrcType: {
        type: Number,
        default: 3
    },
    // 列表是否默认折叠
    listFolded: {
        type: Boolean,
        default: true
    },
    // 列表最大高度
    listMaxHeight: {
        type: String,
        default: '100px'
    },
    // 存储播放器设置的 localStorage key
    storageName: {
        type: String,
        default: 'aplayer-setting'
    },
    list: {
        type: Array,
        default: () => {
            return [
                {
                    name: "Turn Back Time",
                    artist: "Rich Edwards / Emelie",
                    url: "http://music.163.com/song/media/outer/url?id=1331800077.mp3",
                    cover: "https://s2.loli.net/2024/07/22/wIHFAucJKULqle2.jpg",
                },
                {
                    name: "半岛铁盒",
                    artist: "周杰伦",
                    url: "https://echeverra.cn/wp-content/uploads/2022/05/周杰伦-半岛铁盒.mp3",
                    cover: "https://s2.loli.net/2024/07/22/wIHFAucJKULqle2.jpg",
                },
                {
                    name: "보라빛 밤",
                    artist: "宣美",
                    url: "https://music.163.com/song/media/outer/url?id=1459014561.mp3",
                    cover: "https://s2.loli.net/2024/07/22/wIHFAucJKULqle2.jpg",
                },
                {
                    name: "永远的奥特曼",
                    artist: "Line",
                    url: "https://music.163.com/song/media/outer/url?id=1461262038.mp3",
                    cover: "https://s2.loli.net/2024/07/22/wIHFAucJKULqle2.jpg",
                },
                {
                    name: "사이렌",
                    artist: "宣美",
                    url: "https://music.163.com/song/media/outer/url?id=1307376239.mp3",
                    cover: "https://s2.loli.net/2024/07/22/wIHFAucJKULqle2.jpg",
                },
            ]
        }
    }
})
onMounted(() => {
    let str = {
        server: props.songServer,
        type: props.songType,
        id: props.songId
    }
    nextTick(() => {
        state.instance = new APlayer({
            container: playerRef.value,
            fixed: props.fixed,
            mini: props.mini,
            autoplay: props.autoplay,
            theme: props.theme,
            loop: props.loop,
            order: props.order,
            preload: props.preload,
            volume: props.volume,
            mutex: props.mutex,
            lrcType: props.lrcType,
            listFolded: props.listFolded,
            listMaxHeight: props.listMaxHeight,
            storageName: props.storageName,
            float: props.float,
            audio: props.list
        })
    })
})

// 销毁
onBeforeUnmount(() => {
    state.instance.destroy()
})
</script>
   
<style lang='scss' scoped>
.mainPage {
    width: 100%;
    background: #fcfcfc;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}
</style>