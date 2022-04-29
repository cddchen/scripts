//http:\/\/task.njust.edu.cn\/infoplus\/interface\/render
const referer = `http://task.njust.edu.cn/infoplus/form/14478876/render`
var obj = JSON.parse($response.body);

// obj.entities[0].data.fieldSQSJ = 1651218681
// obj.entities[0].data.fieldSHFDYShsj = 1651161600
// obj.entities[0].data._VAR_TODAY = 1651161600
// obj.entities[0].data.fieldSQJCRQ = 1651161600

obj.entities[0].create = 1651218681
//辅导员
obj.entities[0].remarks[0].assignTime = 1651218681
obj.entities[0].remarks[0].actionTime = 1651218681
obj.entities[0].remarks[0].renderTime = 1651218681
//申请人
obj.entities[0].remarks[1].assignTime = 1651218681
obj.entities[0].remarks[1].actionTime = 1651218681
obj.entities[0].remarks[1].renderTime = 1651218681


$done({body: JSON.stringify(obj)});
