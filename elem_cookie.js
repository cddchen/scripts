/******************************
[rewrite_local]
^https:\/\/h5\.ele\.me\/minisite\/pages\/my\/index url script-request-header https://raw.githubusercontent.com/cddchen/scripts/main/elem_cookie.js

[mitm] 
hostname = h5.ele.me

*******************************/

var headers = $request.headers;
console.log(headers.Cookie)
$done({});
