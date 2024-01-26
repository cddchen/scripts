var objc = JSON.parse($response.body);

// objc.data.permissions.push("CONTACT_ADDRESS")
objc.data.permissions.pop()

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
