var obj = JSON.parse($response.body);
obj.entities.app.name = "YSML"

$done({body: JSON.stringify(obj)});
