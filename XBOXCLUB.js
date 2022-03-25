// ^https://h5.youzan.com/wscump/checkin/checkinV2.json?
const XBOX = init()
const TASK_NAME = 'XBOX俱乐部'
const signurlKey = 'signurl_xbox'
const signheaderKey = 'signheader_xbox'
const signbodyKey = 'signbody_xbox'

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
  getHeaders()
} else {
  sign()
}

function getHeaders() {
  if ($request) {
    const signurlVal = $request.url
    const signheaderVal = JSON.stringify($request.headers)
    const signbodyVal = $request.body

    if (signurlVal) XBOX.setdata(signurlVal, signurlKey)
    if (signheaderVal) XBOX.setdata(signheaderVal, signheaderKey)
    if (signbodyVal) XBOX.setdata(signbodyVal, signbodyKey)
    XBOX.msg(TASK_NAME, `获取Cookie：成功！`, ``)
  }
  XBOX.done()
}

function sign() {
  const signurlVal = XBOX.getdata(signurlKey)
  const signheaderVal = XBOX.getdata(signheaderKey)
  const signbodyVal = XBOX.getdata(signbodyKey)
  XBOX.log(`${TASK_NAME}, data: ${signurlVal}, ${signheaderVal}, ${signbodyVal}`)
  if (!signurlVal || !signheaderVal || !signbodyVal) {
    XBOX.msg(TASK_NAME, `请先获取Cookie!`, ``)
    XBOX.done()
    return
  }
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal), body: signbodyVal }
  XBOX.get(url, (error, response, data) => {
    XBOX.log(`${TASK_NAME}, data: ${data}`)
    let result = JSON.parse(data)
    let subTitle = `结果：${result.msg}`
    XBOX.msg(TASK_NAME, subTitle)
    XBOX.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  put = (url, cb) => {
    if (isSurge()) {
      $httpClient.put(url, cb)
    }
    if (isQuanX()) {
      url.method = 'PUT'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, put, done }
}
