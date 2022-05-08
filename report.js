//http:\/\/task.njust.edu.cn\/infoplus\/interface\/render
const referer = `http://task.njust.edu.cn/infoplus/form/14478876/render`
var obj = JSON.parse($response.body);
//time
var now = new Date();
now.setHours(9, 43)
var time = now.getTime()/1000
// my
obj.entities[0].step.assignTime = time
obj.entities[0].step.actionTime = time
obj.entities[0].step.renderTime = time

// 获取当前月份
var nowMonth = now.getMonth() + 1;
// 获取当前是几号
var strDate = now.getDate();
// 添加分隔符“-”
var seperator = "-";
// 对月份进行处理，1-9月在前面添加一个“0”
if (nowMonth >= 1 && nowMonth <= 9) {
   nowMonth = "0" + nowMonth;
}
// 对月份进行处理，1-9号在前面添加一个“0”
if (strDate >= 0 && strDate <= 9) {
   strDate = "0" + strDate;
}
// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
var nowDate = now.getFullYear() + seperator + nowMonth + seperator + strDate;
obj.entities[0].data.fieldSHZT = nowDate
obj.entities[0].data.fieldSQSJ = time

//申请时间
obj.entities[0].fields.fieldSQSJ.initialValue = time
//辅导员审核时间
obj.entities[0].fields.fieldSHFDYShsj.initialValue = time+180
//副书记审核时间
obj.entities[0].fields.fieldSHSZXYShsj.initialValue = time+180

now.setHours(0, 0)
time = now.getTime()/1000
obj.entities[0].data.fieldSHFDYShsj = time
obj.entities[0].data._VAR_TODAY = time
obj.entities[0].data.fieldSQJCRQ = time

$done({body: JSON.stringify(obj)});
