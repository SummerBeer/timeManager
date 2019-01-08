// pages/home/home.js
import Toast from "../../modules/vant/toast/toast"
import Dialog from "../../modules/vant/dialog/dialog"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        taskCount: 0,
        tasks: [],
        curPage: "0",
        setting: {
            workTime: 25,
            breakTime: 5
        },
        record: {}
    },

    addTask(){
        wx.navigateTo({
            url: "/pages/detail/detail"
        })
    },

    editTask(e){
        wx.navigateTo({
            url: `/pages/detail/detail?id=${e.target.id}`
        })
    },

    startWork(e){
        wx.navigateTo({
            url: `/pages/work/work?id=${e.target.id}`
        })
    },

    toTasks(){
        this.setData({
            curPage: "0"
        })
    },

    toRecord(){
        this.setData({
            curPage: "1"
        })
    },

    toSetting(){
        this.setData({
            curPage: "2"
        })
    },

    setWorkTime(e){
        this.setData({
            ["setting.workTime"]: e.detail
        })
    },

    setBreakTime(e){
        this.setData({
            ["setting.breakTime"]: e.detail
        })
    },

    setSetting(){
        var curSetting = this.data.setting
        try{
            wx.setStorageSync("setting", curSetting)
            Toast.success("保存成功")
        }
        catch(e){
            Toast.fail("保存失败")
            console.error('error', e)
        }
    },

    clearRecord(){
        Dialog.confirm({
            message: "确认清除记录?"
        }).then(() => {
            console.log('clear record ... ')
        }).catch(() => {
            console.log("cancle operate ... ")
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        // load user setting
        var setting = wx.getStorageSync("setting") || {}
        if(Object.keys(setting).length > 0){
            this.setData({
                setting: setting
            })
        }

        // load tasks
        var tasks = wx.getStorageSync("tasks") || []
        if(tasks.length > 0){
            this.setData({
                tasks: tasks,
                taskCount: tasks.length
            })
        }

        // load record
        var record = wx.getStorageSync("record") || {}
        if (Object.keys(setting).length > 0){
            this.setData({
                record: record
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})