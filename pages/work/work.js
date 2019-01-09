// pages/work/work.js
import Toast from "../../modules/vant/toast/toast"

const myaudio = wx.createInnerAudioContext()

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
        percent: 0,
        isFinish: false,
        isPause: false,
        soundSrc: "",
        audioCtx: null
    },

    play(){
        myaudio.play()
        console.log(`play music`)
    },

    stop(){
        myaudio.stop()
    },

    cancle() {
        clearInterval(this.timer)

        // 取消专注
        if(this.data.status == "work"){
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
        console.log(`start work ... time: ${this.data.setting.workTime}`)

        // clear timer
        if(!this.timer){}
        else{
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
                        status: "break",
                        isFinish: true
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

        if (this.time >= 0) {
            // 继续
            if (this.data.isPause) {
                this.toggleTimer()
                this.setData({
                    isPause: false
                })
            }
            // 暂停
            else {
                clearInterval(this.timer)
                this.setData({
                    isPause: true
                })
            }
        } else {
            // 任务完成
            Toast.success("完成任务")
            console.log(`task done ... `)

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

            this.toggleTimer()
        }
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
        myaudio.src = `/audio/${setting.sound}.mp3`

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
        clearInterval(this.timer)
        myaudio.destroy()
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