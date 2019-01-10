import Toast from "../../modules/vant/toast/toast"

Page({

    data: {
        setting: {
            workTime: 25,
            breakTime: 5,
            sound: "",
            theme: "white"
        },
        sounds: [
            "请选择",
            "audio1",
            "audio2",
            "audio3"
        ],
        theme: [
            "white",
            "black"
        ]
    },

    setWorkTime(e) {
        this.setData({
            ["setting.workTime"]: e.detail
        })
    },

    setBreakTime(e) {
        this.setData({
            ["setting.breakTime"]: e.detail
        })
    },

    setSetting() {
        var curSetting = this.data.setting
        try {
            wx.setStorageSync("setting", curSetting)
            Toast.success("保存成功")
        } catch (e) {
            Toast.fail("保存失败")
            console.error('error', e)
        }
    },

    setTheme(e){
        console.log(`[setting] theme radio group`, e)
        this.setData({
            ["setting.theme"]: e.detail
        })
    },

    setThemeCell(e){
        console.log(`[setting] theme cell `, e.target.dataset.name)
        this.setData({
            ["setting.theme"]: e.target.dataset.name
        })
    },

    pickAudio(e) {
        var {
            picker,
            value,
            index
        } = e.detail
        // console.log(`sound: ${value}, index: ${index}`)
        this.setData({
            ["setting.sound"]: value
        })
    },

    loadSetting() {
        var setting = wx.getStorageSync("setting") || {}
        this.setData({
            setting: setting
        })
    },

    loadTheme(){

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.loadSetting()
    }
})