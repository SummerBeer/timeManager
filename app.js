import test from "test/index.js"

App({
    onLaunch(){

        /**
         * Configurate Application Setting
         */
        var setting = wx.getStorageSync("setting") || {}

        if(Object.keys(setting).length == 0){
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
            success: function(){
                console.log(`[login] session not expired.`)

            },
            fail: function(){
                console.log(`[login] session expired.`)
                wx.login({
                    success: function(res){
                        console.log(`[login] seccess!`)
                        console.log('[login] res info', res)
                    }
                })
            }
        })

    }
})