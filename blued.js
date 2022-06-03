var objc = JSON.parse($response.body);
    
objc.data[0].is_hidden_special_gift = 1
objc.data[0].is_filter_ads = 1
objc.data[0].vip_grade = 1
objc.data[0].is_vip_annual = 1
objc.data[0].live_tabs = []
for (var obj in objc.data[0].vip_split) {
    objc.data[0].vip_split[obj] = 1
}
objc.data[0].hide_vip_price = 1

$done({
    body : JSON.stringify(objc)
});
