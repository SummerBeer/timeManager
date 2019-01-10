import test from "test/index.js"

const audio = wx.createInnerAudioContext()

App({
    onLaunch() {

        /**
         * Configurate Application Setting
         */
        var setting = wx.getStorageSync("setting") || {}

        if (Object.keys(setting).length == 0) {
            // console.log("setting init ..")
            setting = {
                workTime: 25,
                breakTime: 5,
                sound: "audio1",
                theme: "white"
            }
            wx.setStorageSync("setting", setting)
        }


        /**
         * Test Running
         */
        // test()


        /**
         * User Login
         */
        wx.checkSession({
            success: function() {
                console.log(`[login] session not expired.`)

            },
            fail: function() {
                console.log(`[login] session expired.`)
                wx.login({
                    success: function(res) {
                        console.log(`[login] seccess!`)
                        console.log('[login] res info', res)
                    }
                })
            }
        })

        /**
         * load Audio context
         */
        this.setAudioSrc("audio1")
    },

    setAudioSrc(setting) {
        if (setting == "audio1") {
            audio.src = "https://m10.music.126.net/20190110001214/8bf699587e858df9813eaa7827a8e04c/ymusic/cdbd/3f07/a4de/4cafb3cc0daad26f706e5091566a4edd.mp3"
        } else if (setting == "audio2") {
            audio.src = "http://39.134.253.38/cache/ip.h5.rh03.sycdn.kuwo.cn/b681d5b3d52f53cf777daeb296af6c43/5c36161e/resource/a1/73/40/4167267740.aac?ich_args2=241-09234013036858_e8a29084907aed0818a5f75b8cf055e2_10112301_9c89602bd7c7f9d5923b518939a83798_59763f6cb416725a7f2c333216b6c1f8"
        } else if (setting == "audio3") {
            audio.src = "https://m10.music.126.net/20190110185554/e7381ba048297ed868d9cb24a9b0c3f1/ymusic/d0f9/99fc/510f/240fe171b1158426ec53f38898188928.mp3"
        }
    },

    getAudio(){
        return audio
    }
})