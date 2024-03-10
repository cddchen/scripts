var objc = JSON.parse($response.body);

objc.accountHolderUserAssignments.kycStatus = "KYC_LEVEL_3"

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
