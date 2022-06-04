var objc = JSON.parse($response.body);

objc.data[0].show_search_face = 0
objc.data[0].is_show_vip_page = 1
objc.data[0].is_hidden_special_gift = 1
objc.data[0].is_filter_ads = 1
objc.data[0].is_global_view_secretly = 1
objc.data[0].vip_grade = 3
objc.data[0].is_vip_annual = 1
objc.data[0].nearby_online_time_ui = 0
objc.data[0].live_tabs = []
objc.data[0].block_monitor_enable = 1
for (var obj in objc.data[0].vip_split) {
    objc.data[0].vip_split[obj] = 1
}
objc.data[0].tt_promotion = {}
objc.data[0].hide_vip_price = 1
objc.data[0].chat_filter_duration = 45
objc.data[0].hide_none_vip_trend = 1
objc.data[0].ad_close_pop = 0
objc.data[0].nearby_recommend_live_ui = 0
objc.data[0].is_nearby_live_play_disable = 1
objc.data[0].festival_activities = []
objc.data[0].live_index_page = 0

objc = JSON.stringify(objc)
console.log(objc)
$done({
    body : objc
});
