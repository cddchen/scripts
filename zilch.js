var objc = JSON.parse($response.body);

objc.data.permissions.push("ADDRESS")

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});