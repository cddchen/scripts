/***********************************
[rewrite_local]
  
^https:\/\/wx\.17u\.cn\/wcsign\/sign\/SaveSignInfoNew$ url script-request-body https://raw.githubusercontent.com/cddchen/scripts/main/TongChengTravel.js


[mitm] 

hostname=wx.17u.cn

***********************************/

var body = JSON.parse($request.body);
body['isFromWindow'] = true;
console.log('修改成功')
$done({ body: body });
