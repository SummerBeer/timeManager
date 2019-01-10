import test from "test/index.js"

App({
    onLaunch(){

        // set a default setting
        var setting = wx.getStorageSync("setting") || {}

        if(Object.keys(setting).length == 0){
            // console.log("setting init ..")
            setting = {
                workTime: 25,
                breakTime: 5,
                sound: "audio1"
            }
            wx.setStorageSync("setting", setting)
        }


        // run test
        test()
    }
})