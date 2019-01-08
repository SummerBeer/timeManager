// pages/work/work.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        task: {},
        setting: {},
        status: "work",
        time: {
            h: 0,
            m: 0,
            s: 0
        },
        percent: 0
    },

    cancle(){
        clearInterval(this.timer)
        wx.navigateTo({
            url: "/pages/home/home"
        })
    },

    toggleTimer() {
        console.log(`start work ... time: ${this.data.setting.workTime}`)

        var time = 0
        var update 

        // work
        if (this.data.status == "work") {
            time = this.data.setting.workTime * 60
        }
        // break
        else {
            time = this.data.setting.breakTime * 60
        }

        this.timer = setInterval(() => {
            time = this.updateTimer(time)
            if (time == 0) {
                clearInterval(timer)
                if (this.data.status == "work") {
                    this.setData({
                        status: "break"
                    })
                }
                else{
                    this.setData({
                        status: "work"
                    })
                }
            }
        }, 1000)
    },

    updateTimer(time) {

        var h = Math.floor(time/3600)
        var m = Math.floor(time/60 - h*60)
        var s = Math.floor(time - h*3600 - m*60)

        this.setData({
            ["time.h"]: h,
            ["time.m"]: m,
            ["time.s"]: s
        })

        var percent
        if(this.data.status == "work"){
            percent = 100 - Math.round((time-1)/(this.data.setting.workTime*60)*100)
        }
        else{
            percent = 100 - Math.round((time - 1) / (this.data.setting.breakTime * 60) * 100)
        }
        this.setData({
            percent: percent
        })

        return time-1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: "专注中"
        })

        // load task
        var tasks = wx.getStorageSync("tasks")
        var id = options.id

        for (var item of tasks) {
            if (item.id == id) {
                this.setData({
                    task: item
                })
            }
        }

        // load setting
        this.setData({
            setting: wx.getStorageSync("setting")
        })

        // toggle timer
        this.toggleTimer()
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