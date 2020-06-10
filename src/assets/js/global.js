
export default {
  /*
  * 时间格式化 yy-mm-dd hh-mm-ss
  * */
  timeConversion(time) {
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    if (hh >=0 && hh<10){hh= '0' + hh;}
    if (mm >=0 && mm<10){mm= '0' + mm;}
    if (ss >=0 && ss<10){ss= '0' + ss;}
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + hh + ':' + mm + ':' + ss;
  },
}
