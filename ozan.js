var objc = JSON.parse($response.body);

if (objc?.accountHolderUserAssignments?.kycStatus)
    objc.accountHolderUserAssignments.kycStatus = "KYC_LEVEL_3"
if (objc?.kycStatus)
    objc.kycStatus = "KYC_LEVEL_3"

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
