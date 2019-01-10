var loadTheme = function(){
    var setting = wx.getStorageSync("setting")

    if(setting.theme == "black"){
        wx.setBackgroundColor({
            backgroundColor: "#aaa"
        })
    }
}

export default loadTheme