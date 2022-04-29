//http:\/\/task.njust.edu.cn\/infoplus\/interface\/render
const referer = `http://task.njust.edu.cn/infoplus/form/14478876/render`
var obj = JSON.parse($response.body);
// my
obj.entities[0].step.assignTime = 1651218681
obj.entities[0].step.actionTime = 1651218681
obj.entities[0].step.renderTime = 1651218681

obj.entities[0].data.fieldSQSJ = 1651218681
obj.entities[0].data.fieldSHFDYShsj = 1651161600
obj.entities[0].data._VAR_TODAY = 1651161600
obj.entities[0].data.fieldSQJCRQ = 1651161600

//申请时间
obj.entities[0].fields.fieldSQSJ.initialValue = 1651218681
//辅导员审核时间
obj.entities[0].fields.fieldSHFDYShsj.initialValue = 1651218681
//副书记审核时间
obj.entities[0].fields.fieldSHSZXYShsj.initialValue = 1651218681


$done({body: JSON.stringify(obj)});
