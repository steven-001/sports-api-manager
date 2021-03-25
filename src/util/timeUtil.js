//时间格式方法

export default {
  // 时间转换
  timeForMat(count) {
    // 拼接时间
    const time1 = new Date()
    const time2 = new Date()
    if (count === 1) {
      time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
    } else {
      if (count >= 0) {
        time1.setTime(time1.getTime())
      } else {
        if (count === -2) {
          time1.setTime(time1.getTime() + (24 * 60 * 60 * 1000) * 2)
        } else {
          time1.setTime(time1.getTime() + (24 * 60 * 60 * 1000))
        }
      }
    }

    const Y1 = time1.getFullYear()
    const M1 = ((time1.getMonth() + 1) > 9 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
    const D1 = (time1.getDate() > 9 ? time1.getDate() : '0' + time1.getDate())
    const timer1 = Y1 + '-' + M1 + '-' + D1 + ' ' + '23:59:59' // 当前时间

    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
    const Y2 = time2.getFullYear()
    const M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
    const D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())
    const timer2 = Y2 + '-' + M2 + '-' + D2 + ' ' + '00:00:00' // 之前的7天或者30天
    return [timer2, timer1]
  },
  oneYear() {
    const timer = this.timeForMat(365)
    return timer
  },
  days(num) {
    const timer = this.timeForMat(num)
    return timer
  },

  thirtyDays() {
    // 获取最近30天
    const timer = this.timeForMat(30)
    return timer
  },


// 获取最近7天
  sevenDays() {
    // 获取最近7天
    const timer = this.timeForMat(7)
    return timer
  },

  yesterday() {
    // 校验是不是选择的昨天
    const timer = this.timeForMat(1)
    return timer
  },

  today() {
    const timer = this.timeForMat(0)
    return timer
  },

  tomorrow() {
    const timer = this.timeForMat(-1)
    return timer
  },

  theDayAfterTomorrow() {
    const timer = this.timeForMat(-2)
    return timer
  },
  getThisWeek() {
    //按周日为一周的最后一天计算
    let date = new Date();
    // 今天是这周的第几天
    let today = date.getDay();
    //上周日距离今天的天数（负数表示）
    let stepSunDay = -today + 1;
    //  如果今天是周日
    if (today == 0) {
      stepSunDay = -7;
    }
    //周一距离今天的天数（负数表示）
    let stepMonday = 7 - today;
    let time = date.getTime();
    let monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    let sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
    // 本周一的日期 （起始日期）
    let startDate = this.transferDate(monday, true); // 日期变换
    // 本周日的日期 （结束日期）
    let endDate = this.transferDate(sunday, false); // 日期变换
    return [startDate, endDate];

  },
  transferDate(date, flag) {
    // 年
    let year = date.getFullYear();
    // 月
    let month = date.getMonth() + 1;
    // 日
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    let dateString;
    if (flag) {
      dateString = year + '-' + month + '-' + day + ' ' + '00:00:00';
    } else {
      dateString = year + '-' + month + '-' + day + ' ' + '23:59:59';
    }
    return dateString;
  },
  formatSeconds(value) {
    let secondTime = parseInt(value);// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //   如果分钟大于60，将分钟转换成小时
      if (minuteTime > 60) {
        //  获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //    获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    let result = '' + parseInt(secondTime) + "秒";
    if (minuteTime > 0) {
      result = '' + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
      result = '' + parseInt(hourTime) + "小时" + result;
    }
    return result;
  },
  /**
   * 将Js生成的时间格式化为YYYY-MM-DD HH:mm:ss
   * @param date
   * @returns {string}
   */
  renderTime(date) {
    let dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  },
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
  },
  formatTimesToHHmmSS(s){
    let t;
    if(s > -1){
      let hour = Math.floor(s/3600);
      let min = Math.floor(s/60) % 60;
      let sec = s % 60;
      if(hour < 10) {
        t = '0'+ hour + ":";
      } else {
        t = hour + ":";
      }

      if(min < 10){
        t += "0";
      }
      t += min + ":";
      if(sec < 10){
        t += "0";
      }
      t += sec;
    }
    return t;
  },

  /**
   * 判断是否是空
   * @param val
   * @returns {boolean}
   */
  isBlank(val){
    if(val===undefined||val ===null||val===''){
      return true
    }else{
      return false
    }
  },
  /**
   * 将时间转化为S
   * @param value
   */
  formatHoursToSeconds(value){
    let timeArray=  value.toString().split(":");
    let secondTime = parseInt(timeArray[2]);// 秒
    let minuteTime = parseInt(timeArray[1]);// 分
    let hourTime = parseInt(timeArray[0]);// 小时

    return hourTime*3600+minuteTime*60+secondTime;
  }
}
