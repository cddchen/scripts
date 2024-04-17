var objc = JSON.parse($response.body);

if (Array.isArray(objc)) {
  objc[0].status = "INACTIVE"
  objc[0].licenceStatus.status = "INACTIVE"
  objc[3].status = "ACTIVE"
  objc[3].licenceStatus.status = "ACTIVE"
}
else {
  objc.accessLevel = "GRANTED"
}

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
