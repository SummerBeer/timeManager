import Dialog from "../../modules/vant/dialog/dialog"

Page({
    data: {
        tasks: [],
        setting: {
            workTime: 25,
            breakTime: 5,
            sound: ""
        },
        records: [],
        curDayRecord: {
            total: 0,
            items: []
        },
        totalRecord: {
            total: 0,
            items: []
        }
    },

    clearRecord() {
        Dialog.confirm({
            message: "确认清除记录?"
        }).then(() => {
            console.log('clear records ... ')
            wx.setStorageSync("records", [])
            this.refreshRecordDisplay()
        }).catch(() => {
            console.log("cancle operate ... ")
        })
    },

    refreshRecordDisplay() {
        console.log(`refresh records`)
        // refresh records data
        var records = wx.getStorageSync("records") || []
        var curDate = new Date().toLocaleString().split(" ")[0]
        var curDayRecord = []
        var total = 0
        var dayTotal = 0

        for (let item of records) {
            let time = item.time
            if (item.date == curDate) {
                curDayRecord.push(item)
                dayTotal += time
            }
            total += time
        }

        this.setData({
            curDayRecord: {
                total: dayTotal.toFixed(2),
                items: curDayRecord
            },
            totalRecord: {
                total: total.toFixed(2),
                items: records
            },
            records: records
        })

        console.log(`dayTotal: ${dayTotal} , total: ${total}`)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.refreshRecordDisplay()
    },
})