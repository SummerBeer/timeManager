Page({
    data: {
        tasks: [],
        setting: {
            workTime: 25,
            breakTime: 5,
            sound: ""
        }
    },

    addTask() {
        wx.navigateTo({
            url: "/pages/detail/index"
        })
    },

    editTask(e) {
        wx.navigateTo({
            url: `/pages/detail/index?id=${e.target.id}`
        })
    },

    startWork(e) {
        wx.navigateTo({
            url: `/pages/work/index?id=${e.target.id}`
        })
    },

    loadTasks() {
        var tasks = wx.getStorageSync("tasks") || []
        this.setData({
            tasks: tasks
        })
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
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
        this.loadTasks()
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