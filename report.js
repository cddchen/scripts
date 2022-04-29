//http:\/\/task.njust.edu.cn\/infoplus\/interface\/render
var obj = JSON.parse($response.body);
obj.entities[0].app.name = "YSML"

$done({body: JSON.stringify(obj)});
