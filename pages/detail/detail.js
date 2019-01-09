// pages/detail/detail.js
import Dialog from "../../modules/vant/dialog/dialog"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        task: {
            name: "",
            desc: "",
            num: 1,
            id: -1
        }
    },

    onChange(event) {
        this.setData({
            ["task.num"]: event.detail / 10
        })
    },

    setName(e) {
        this.setData({
            ["task.name"]: e.detail
        })
    },

    setDesc(e) {
        this.setData({
            ["task.desc"]: e.detail
        })
    },

    back() {
        wx.navigateBack({
            delta: 1
        })
    },

    /**
     * 将任务存储
     */
    done() {

        var curTask = this.data.task
        var tasks = wx.getStorageSync("tasks") || []

        // 新任务
        if (curTask.id == -1) {
            if (tasks.length == 0) {
                curTask.id = 0;
            } else {
                curTask.id = tasks[0].id + 1
            }
            tasks.unshift(curTask)
        }
        // 编辑任务
        else {
            tasks[curTask.id] = curTask
        }
        
        wx.setStorageSync("tasks", tasks)

        wx.navigateBack({
            delta: 1
        })
    },

    deleteTask(){
        Dialog.confirm({
            message: "确定删除吗"
        }).then(() => {
            var tasks = wx.getStorageSync("tasks")
            for(let i=0; i<tasks.length; i++){
                if(tasks[i].id == this.data.task.id){
                    tasks.splice(i, 1)
                }
            }
            wx.setStorageSync("tasks", tasks)

            wx.navigateBack({
                delta: 1
            })
        }).catch((e) => {

        })
    },

  


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id = options.id
        if (id > -1) {
            var tasks = wx.getStorageSync("tasks")
            for (var task of tasks) {
                if (task.id == id) {
                    this.setData({
                        task: task
                    })
                    break
                }
            }
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
        wx.setNavigationBarTitle({
            title: "任务编辑"
        })
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