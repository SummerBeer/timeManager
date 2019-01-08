App({
    onLaunch(){

        // set a default setting
        var setting = wx.getStorageSync("setting") || {}
        var record = wx.getStorageSync("record") || {}

        if(Object.keys(setting).length == 0){
            console.log("setting init ..")
            setting = {
                workTime: 25,
                breakTime: 5
            }
            wx.setStorageSync("setting", setting)
        }

        if(Object.keys(record).length == 0){
            console.log("record init ... ")
            record = {
                total: 0
            }
            wx.setStorageSync("record", record)
        }
    }
})