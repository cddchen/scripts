//http:\/\/task.njust.edu.cn\/infoplus\/interface\/render
const referer = `http://task.njust.edu.cn/infoplus/form/14478876/render`
if ($request.referer == referer) {
	var obj = JSON.parse($response.body);
	obj.entities[0].app.name = "YSML"

	$done({body: JSON.stringify(obj)});
}
