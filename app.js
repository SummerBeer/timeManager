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
        test()


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
            audio.src = "http://ip.h5.ri03.sycdn.kuwo.cn/27999ecf828f098160760dcc2caab2da/5c3807d4/resource/a3/96/12/825903301.aac"
        } else if (setting == "audio2") {
            audio.src = "http://39.134.253.38/cache/ip.h5.rh03.sycdn.kuwo.cn/b681d5b3d52f53cf777daeb296af6c43/5c36161e/resource/a1/73/40/4167267740.aac?ich_args2=241-09234013036858_e8a29084907aed0818a5f75b8cf055e2_10112301_9c89602bd7c7f9d5923b518939a83798_59763f6cb416725a7f2c333216b6c1f8"
        } else if (setting == "audio3") {
            audio.src = "http://ip.h5.rb03.sycdn.kuwo.cn/090e60344bc4a1a79a50bc3017d0a9fa/5c380842/resource/a1/99/66/775120257.aac"
        }
    },

    getAudio(){
        return audio
    }
})