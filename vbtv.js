var objc = JSON.parse($response.body);
objc[0].license.contentDownload.permission = "ALLOWED"
objc[0].license.type = "PREMIUM"
objc[0].name = "MONTHLY PREMIUM"

objc[3].status = "ACTIVE"
objc[3].licenceStatus.status = "ACTIVE"

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
