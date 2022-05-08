//http:\/\/task.njust.edu.cn\/infoplus\/interface\/render
const referer = `http://task.njust.edu.cn/infoplus/form/14478876/render`
var obj = JSON.parse($response.body);
var now = new Date();
now.setHours(9, 43)
const time = now.getTime()/1000

obj.entities[0].create = time
//辅导员
obj.entities[0].remarks[0].assignTime = time+180
obj.entities[0].remarks[0].actionTime = time+180
obj.entities[0].remarks[0].renderTime = time+180
//申请人
obj.entities[0].remarks[1].assignTime = time
obj.entities[0].remarks[1].actionTime = time
obj.entities[0].remarks[1].renderTime = time

$done({body: JSON.stringify(obj)});
