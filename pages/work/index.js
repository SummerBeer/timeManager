// pages/work/work.js
import Toast from "../../modules/vant/toast/toast"
const myaudio = wx.createInnerAudioContext()

Page({
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

    play() {
        myaudio.play()
        // console.log(`play music`)
    },

    stop() {
        myaudio.stop()
    },

    cancle() {
        clearInterval(this.timer)

        // 取消专注
        if (this.data.status == "work") {
            wx.navigateBack({
                delta: 1
            })
        }
        // 取消休息
        else {
            this.setData({
                status: "work"
            })
            this.toggleTimer()
        }
    },

    toggleTimer() {
        // console.log(`start work ... time: ${this.data.setting.workTime}`)

        // clear timer
        if (!this.timer) {} else {
            clearInterval(this.timer)
        }

        // work
        if (this.data.status == "work") {
            this.time = this.data.setting.workTime * 60
            this.play()
        }
        // break
        else {
            this.time = this.data.setting.breakTime * 60
        }

        this.timer = setInterval(() => {
            this.time = this.updateTimer(this.time)
            if (this.time < 0) {
                clearInterval(this.timer)

                // work finish
                if (this.data.status == "work") {
                    this.setData({
                        status: "break"
                    })
                    this.stop()
                    this.updateRecord()
                    this.updateTask()
                }
                // break finish
                else {
                    this.setData({
                        status: "work"
                    })
                }

                this.toggleTimer()
            }
        }, 1000)
    },

    updateTimer(time) {

        var h = Math.floor(time / 3600)
        var m = Math.floor(time / 60 - h * 60)
        var s = Math.floor(time - h * 3600 - m * 60)

        this.setData({
            ["time.h"]: h,
            ["time.m"]: m,
            ["time.s"]: s
        })

        var percent
        if (this.data.status == "work") {
            percent = 100 - Math.round((time - 1) / (this.data.setting.workTime * 60) * 100)
        } else {
            percent = 100 - Math.round((time - 1) / (this.data.setting.breakTime * 60) * 100)
        }
        this.setData({
            percent: percent
        })

        return time - 1
    },

    updateRecord() {

        // 任务完成
        Toast.success("完成任务")
        // console.log(`task done ... `)

        var curRecord = {}
        var date = new Date().toLocaleString().split(" ")[0]
        var name = this.data.task.name
        var time = Math.round(this.data.setting.workTime / 60 * 100) / 100

        curRecord = {
            id: "" + Date.now(),
            date: date,
            name: name,
            time: time
        }

        var records = wx.getStorageSync("records") || []
        records.push(curRecord)

        this.setData({
            records: records
        })

        wx.setStorageSync("records", records)
    },

    updateTask() {
        var curTask = this.data.task
        curTask.num--

        var tasks = wx.getStorageSync("tasks")

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == curTask.id) {
                if (curTask.num == 0) {
                    tasks.splice(i, 1)
                } else {
                    tasks[i].num = curTask.num
                }
            }
        }

        wx.setStorageSync("tasks", tasks)

        if (curTask.num == 0) {
            Toast.success("任务完成")
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1
                })
            }, 1000)
        }
    },

    setAudioSrc() {
        // console.log("setting audio src")
        if (this.data.setting.sound == "audio1") {
            myaudio.src = "https://m10.music.126.net/20190110001214/8bf699587e858df9813eaa7827a8e04c/ymusic/cdbd/3f07/a4de/4cafb3cc0daad26f706e5091566a4edd.mp3"
        } else if (this.data.setting.sound == "audio2") {
            myaudio.src = "http://39.134.253.38/cache/ip.h5.rh03.sycdn.kuwo.cn/b681d5b3d52f53cf777daeb296af6c43/5c36161e/resource/a1/73/40/4167267740.aac?ich_args2=241-09234013036858_e8a29084907aed0818a5f75b8cf055e2_10112301_9c89602bd7c7f9d5923b518939a83798_59763f6cb416725a7f2c333216b6c1f8"
        } else if (this.data.setting.sound == "audio3") {
            myaudio.src = "https://m10.music.126.net/20190110001322/74e62f0a459b55af4ab2d693fff99f30/ymusic/d0f9/99fc/510f/240fe171b1158426ec53f38898188928.mp3"
        }
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
        var setting = wx.getStorageSync("setting")
        this.setData({
            setting: setting
        })

        // load audioCtx
        this.setAudioSrc()


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
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearInterval(this.timer)
        myaudio.stop()
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