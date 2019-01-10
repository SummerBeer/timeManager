import Toast from "../../modules/vant/toast/toast"

Page({

    data: {
        setting: {
            workTime: 25,
            breakTime: 5,
            sound: ""
        },
        sounds: [
            "请选择",
            "audio1",
            "audio2",
            "audio3"
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

    pickAudio(e) {
        var {
            picker,
            value,
            index
        } = e.detail
        console.log(`sound: ${value}, index: ${index}`)
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