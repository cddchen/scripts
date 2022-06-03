var objc = JSON.parse($response.body);
    
objc.data[0].is_hidden_special_gift = 1
objc.data[0].is_filter_ads = 1
objc.data[0].vip_grade = 2
objc.data[0].is_vip_annual = 1
objc.data[0].live_tabs = []
for (var obj in objc.data[0].vip_split) {
    objc.data[0].vip_split[obj] = 1
}
objc.data[0].hide_vip_price = 1
objc.data[0].chat_filter_duration = 45
objc.data[0].ad_close_pop = 0
objc.data[0].nearby_recommend_live_ui = 0
objc.data[0].is_nearby_live_play_disable = 1

console.log(objc)
$done({
    body : JSON.stringify(objc)
});
