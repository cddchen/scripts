var objc = JSON.parse($response.body);
objc[0].status = "INACTIVE"
objc[0].licenceStatus.status = "INACTIVE"

objc[3].status = "ACTIVE"
objc[3].licenceStatus.status = "ACTIVE"

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
