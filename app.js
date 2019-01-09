App({
    onLaunch(){

        // set a default setting
        var setting = wx.getStorageSync("setting") || {}

        if(Object.keys(setting).length == 0){
            console.log("setting init ..")
            setting = {
                workTime: 25,
                breakTime: 5
            }
            wx.setStorageSync("setting", setting)
        }

        // test
        // var date = new Date().toLocaleString().split(" ")[0]
        // console.log(`date: ${date}`)
    }
})