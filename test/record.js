var loadRecords = function(){

    var records = []

    for(let i=0; i<10; i++){
        records.push({
            id: Date.now().toString(),
            name: `record-test-${i}`,
            date: "2019/1/10",
            time: 0.2
        })
    }

    records[1].date = "2019/1/6"
    records[2].date = "2019/1/6"

    records[3].date = "2019/1/1"
    records[4].date = "2018/11/1"

    wx.setStorageSync("records", records)
}

export default loadRecords