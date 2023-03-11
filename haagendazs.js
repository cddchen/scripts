/******************************
[rewrite_local]
^https:\/\/haagendazs\.smarket\.com\.cn\/v1\/api\/wxapp\/daily\/signIn$ url script-request-body https://raw.githubusercontent.com/cddchen/scripts/main/haagendazs.js

[mitm] 
hostname = haagendazs.smarket.com.cn

*******************************/
// Import blueimp-md5 library
// var md5 = require("blueimp-md5");
// let sign_body = {
//   "openId" : "oJlot5CB4967X-oegXcBC5n2w6bw",
//   "mobile" : "13035631362",
//   "sessionKey" : "3Ck+pxxDv2lTMF8ZehYpX2ibo1vcVqnwLrpBt3FMDVo=",
//   "unionId" : "onoRB5gSM2rTr6vTnAp2osPhL6MI",
//   "socialHubid" : "49E8oQ1kVM27UMaV",
//   "sign" : "ab95370342e7a66cd292752c39692bee",
//   "timestamp" : 1678158564633
// }
// const e = (new Date).getTime();
// // const e = 1678158564633;
// const i = "openId=" + sign_body["openId"] + "&unionId=" + sign_body["unionId"] + "&sessionKey=" + sign_body["sessionKey"] + "&timestamp=".concat(e)
// const h = Array.from(i).sort().join("")
// const g = md5("key=@D#DZ15$$ABCD&")
// const r = md5(md5(h) + "," + g)
// // this.log(r)
// sign_body.timestamp = e
// sign_body.sign = r
// console.log(e)
// console.log(r)


const $ = new Env('哈根达斯')

const envSplitor = ['`']
const ckNames = ['HaagenDazs']
const MAX_THREAD = 3
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3;

// let sign_body = {
//   "openId" : "oJlot5CB4967X-oegXcBC5n2w6bw",
//   "mobile" : "13035631362",
//   "sessionKey" : "3Ck+pxxDv2lTMF8ZehYpX2ibo1vcVqnwLrpBt3FMDVo=",
//   "unionId" : "onoRB5gSM2rTr6vTnAp2osPhL6MI",
//   "socialHubid" : "49E8oQ1kVM27UMaV",
//   "sign" : "ab95370342e7a66cd292752c39692bee",
//   "timestamp" : 1678158564633
// }
// const e = (new Date).getTime();
// // const e = 1678158564633
// const i = "openId=" + sign_body["openId"] + "&unionId=" + sign_body["unionId"] + "&sessionKey=" + sign_body["sessionKey"] + "&timestamp=".concat(e)
// const h = Array.from(i).sort().join("")
// const g = $.md5("key=@D#DZ15$$ABCD&")
// const r = $.md5($.md5(h) + "," + g)
// // this.log(r)
// sign_body.timestamp = e
// sign_body.sign = r
// console.log(e)
// console.log(r)

if ((typeof $request !== 'undefined') && $request.method != 'OPTIONS') {
  !(async () => {
    const session = $request.body;

    let pre_session = $.getData(ckNames[0])
    let log = JSON.stringify(session)
    if ($.setData(log, ckNames[0])) {
        $.subt = `获取会话: 成功!`
        $.log('session:', JSON.stringify(session))
      } else {
        $.subt = `获取会话: 失败!`
      }
      $.msg($.name, $.subt, '')
  })()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
  return
}

class UserClass {
  constructor(ck) {
    this.index = $.userIdx++; 
    this.name = `账号${this.index}`
    this.cookie = JSON.parse(ck);
    this.message = [`********${this.name}*******`];
  }
  log(msg, opt = {}) { 
    var m = '', n = $.userCount.toString().length;; 
    if (this.index) m += `账号[${$.padStr(this.index, n)}]`; 
    if (this.name) m += `[${this.name}]`; 
    $.log(m + msg, opt); 
  } 
  async get_token() {
    try {
      const headers = {
        Host: 'haagendazs.smarket.com.cn',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        "Accept-Encoding": "gzip,compress,br,deflate",
        "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f2f) NetType/WIFI Language/zh_CN miniProgram/wx73247c7819d61796',
        Referer: 'https://servicewechat.com/wx3656c2a2353eb377/258/page-frame.html'
      }
      
      const body = {
        "partner":"apitest","secret":"Ou0HT@0W6e","openid":"gh_68065de13ad5","app-id":"wx3656c2a2353eb377"
      }
      
      const url = {
        url: 'https://haagendazs.smarket.com.cn/v1/api/token',
        headers: headers,
        body: JSON.stringify(body)
      }
      let {result} = await $.post(url)
      this.log(JSON.stringify(result))
      let code = result?.code
      if (code == 0) {
        this.log(`获取token成功：${result.data}`)
        return Promise.resolve(result.data)
      } else {
        this.log(`获取token失败：${result.msg}`)
        return Promise.reject(`获取token失败：${result.msg}`)
      }
    } catch(e) {
      this.log(e)
      return Promise.reject(`获取token出错：${e}` )
    } finally {
    }
  }
  async visitRecordsave(token) {
    try {
      const headers = {
        Host: 'haagendazs.smarket.com.cn',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        "Accept-Encoding": "gzip,compress,br,deflate",
        "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f2f) NetType/WIFI Language/zh_CN miniProgram/wx73247c7819d61796',
        Referer: 'https://servicewechat.com/wx3656c2a2353eb377/271/page-frame.html',
        Authorization: 'Bearer ' + token
      }

      const body = {
        "url": "\/pages\/index\/index"
      }
      
      const url = {
        url: 'https://haagendazs.smarket.com.cn/v1/api/wxapp/visitRecord/save',
        headers: headers,
        body: JSON.stringify(body)
      }
      let {result} = await $.post(url)
      this.log(JSON.stringify(result))
      let code = result?.code
      if (code == 0) {
        this.log(`visitRecord save成功：${result.msg}`)
        return Promise.resolve(token)
      } else {
        this.log(`visitRecord save失败：${result.msg}`)
        return Promise.reject('visitRecord save失败')
      }
    } catch(e) {
      this.log(e)
      return Promise.reject(`visitRecord save出错，${e}`)
    } 
  }
  async save_login_record(token) {
    try {
      const headers = {
        Host: 'haagendazs.smarket.com.cn',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        "Accept-Encoding": "gzip,compress,br,deflate",
        "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f2f) NetType/WIFI Language/zh_CN miniProgram/wx73247c7819d61796',
        Referer: 'https://servicewechat.com/wx3656c2a2353eb377/258/page-frame.html',
        Authorization: 'Bearer ' + token
      }

      const body = {
        "unionId": this.cookie.unionId,
        "openId": this.cookie.openId,
        "source": ""
      }
      
      const url = {
        url: 'https://haagendazs.smarket.com.cn/v1/api/wxapp/relevant/saveLoginRecord',
        headers: headers,
        body: JSON.stringify(body)
      }
      let {result} = await $.post(url)
      this.log(JSON.stringify(result))
      let code = result?.code
      if (code == 0) {
        this.log(`保存登陆记录成功：${result.msg}`)
        return Promise.resolve(token)
      } else {
        this.log(`保存登陆记录失败：${result.msg}`)
        return Promise.reject('保存登陆记录失败')
      }
    } catch(e) {
      this.log(e)
      return Promise.reject(`保存登陆记录出错，${e}`)
    } 
  }
  async sign(token) {
    try {
      let sign_body = this.cookie
      const e = (new Date).getTime();
      // const e = 1673336746360;
      const i = "openId=" + sign_body["openId"] + "&unionId=" + sign_body["unionId"] + "&sessionKey=" + sign_body["sessionKey"] + "&timestamp=".concat(e)
      const h = Array.from(i).sort().join("")
      const g = $.md5("key=@D#DZ15$$ABCD&")
      const r = $.md5($.md5(h) + "," + g)
      // this.log(r)
      sign_body.timestamp = e
      sign_body.sign = r

      const header = {
        Host: 'haagendazs.smarket.com.cn',
        Connection: 'keep-alive',
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json',
        "Accept-Encoding": "gzip,compress,br,deflate",
        "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f37) NetType/4G Language/en',
        Referer: 'https://servicewechat.com/wx3656c2a2353eb377/272/page-frame.html',
      }
      
      const url = {
        url: 'https://haagendazs.smarket.com.cn/v1/api/wxapp/daily/signIn',
        headers: header,
        body: JSON.stringify(sign_body)
      }
      // this.log(JSON.stringify(url))
      let {result} = await $.post(url)
      this.log(JSON.stringify(result))
      let code = result?.code
      if (code == 0) {
        this.message.push('签到成功，' + result?.msg)
      } else {
        this.message.push('签到失败，' + result?.msg)
      }
    } catch(e) {
      this.message.push('签到error，' + result?.msg)
    } finally {
      return Promise.resolve()
    }
  }

  async userTask() {
    await this.get_token()
      .then(token => this.save_login_record(token))
      .then(token => this.visitRecordsave(token))
      .then(token => this.sign(token))
      .catch(e => {
        this.message.push(e)
      })
  }
}

!(async () => {
  $.read_env(UserClass);
  await $.threadTask('userTask', MAX_THREAD)
})()
  .catch((e) => $.log(e))
  .finally(() => $.done())


function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env;
    }

    send(opts, method = 'GET') {
      opts = typeof opts === 'string' ? { url: opts } : opts;
      let sender = this.get;
      if (method === 'POST') {
        sender = this.post;
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err);
          else resolve(resp);
        });
      });
    }

    get(opts) {
      return this.send.call(this.env, opts);
    }

    post(opts) {
      return this.send.call(this.env, opts, 'POST');
    }
  }

  return new (class {
    constructor(name, opts = {}) {
      this.name = name;
      this.http = new Http(this);
      this.data = null;
      this.dataFile = 'box.dat';
      this.logs = [];
      this.isMute = false;
      this.noLogKey = opts.noLogKey || '';
      this.noLog = opts.noLog;
      this.isNeedRewrite = false;
      this.logSeparator = '\n';
      this.startTime = new Date().getTime();
      Object.assign(this, opts);
      this.log('', `🔔${this.name}, 开始!`);
      this.userIdx = 0;
      this.userList = [];
      this.userCount = 0;
      this.notifyStr = [];
    }

    #Task
    read_env(Class) {
      let envStrList = ckNames.map(x => { return $.isNode() ? process.env[x] : $.getData(x) });
      for (let env_str of envStrList.filter(x => !!x)) {
        let sp = envSplitor.filter(x => env_str.includes(x));
        let splitor = sp.length > 0 ? sp[0] : envSplitor[0];
        for (let ck of env_str.split(splitor).filter(x => !!x)) {
          this.userList.push(new Class(ck));
        }
      }
      this.userCount = this.userList.length;
      if (!this.userCount) {
        this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, { notify: true });
        return false;
      }
      this.log(`共找到${this.userCount}个账号`);
      return true;
    }
    async threads(taskName, conf, opt = {}) {
      while (conf.idx < $.userList.length) {
        let user = $.userList[conf.idx++];
        await user[taskName](opt);
      }
    }
    async threadTask(taskName, thread) {
      let taskAll = [];
      let taskConf = { idx: 0 };
      while (thread--) taskAll.push(this.threads(taskName, taskConf));
      await Promise.all(taskAll)
    }
    async showmsg() {
      this.userList.forEach(user => {
        this.notifyStr = this.notifyStr.concat(user.message)
      });
      if (!this.notifyStr.length) return;
      var notify = this.isNode ? require('./sendNotify') : '';
      this.log('\n============== 推送 ==============');
      if (this.isNode) await notify.sendNotify(this.name, this.notifyStr.join('\n'));
      else this.msg(this.name, this.notifyStr.join('\n'), '', {})
    }

    isNode() {
      return 'undefined' !== typeof module && !!module.exports;
    }

    isQuanX() {
      return 'undefined' !== typeof $task;
    }

    isSurge() {
      return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon;
    }

    isLoon() {
      return 'undefined' !== typeof $loon;
    }

    isShadowrocket() {
      return 'undefined' !== typeof $rocket;
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str);
      } catch {
        return defaultValue;
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj);
      } catch {
        return defaultValue;
      }
    }

    getJson(key, defaultValue) {
      let json = defaultValue;
      const val = this.getData(key);
      if (val) {
        try {
          json = JSON.parse(this.getData(key));
        } catch {}
      }
      return json;
    }

    setJson(val, key) {
      try {
        return this.setData(JSON.stringify(val), key);
      } catch {
        return false;
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({ url }, (err, resp, body) => resolve(body));
      });
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpApi = this.getData('@chavy_boxjs_userCfgs.httpApi');
        httpApi = httpApi ? httpApi.replace(/\n/g, '').trim() : httpApi;
        let httpApi_timeout = this.getData(
          '@chavy_boxjs_userCfgs.httpApi_timeout'
        );
        httpApi_timeout = httpApi_timeout ? httpApi_timeout * 1 : 20;
        httpApi_timeout =
          runOpts && runOpts.timeout ? runOpts.timeout : httpApi_timeout;
        const [key, addr] = httpApi.split('@');
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: {
            script_text: script,
            mock_type: 'cron',
            timeout: httpApi_timeout,
          },
          headers: { 'X-Key': key, Accept: '*/*' },
        };
        this.post(opts, (err, resp, body) => resolve(body));
      }).catch((e) => this.logErr(e));
    }

    loadData() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs');
        this.path = this.path ? this.path : require('path');
        const curDirDataFilePath = this.path.resolve(this.dataFile);
        const rootDirDataFilePath = this.path.resolve(
          process.cwd(),
          this.dataFile
        );
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
        const isRootDirDataFile =
          !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile
            ? curDirDataFilePath
            : rootDirDataFilePath;
          try {
            return JSON.parse(this.fs.readFileSync(datPath));
          } catch (e) {
            return {};
          }
        } else return {};
      } else return {};
    }

    writeData() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs');
        this.path = this.path ? this.path : require('path');
        const curDirDataFilePath = this.path.resolve(this.dataFile);
        const rootDirDataFilePath = this.path.resolve(
          process.cwd(),
          this.dataFile
        );
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
        const isRootDirDataFile =
          !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
        const jsonData = JSON.stringify(this.data);
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsonData);
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsonData);
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsonData);
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let result = source;
      for (const p of paths) {
        result = Object(result)[p];
        if (result === undefined) {
          return defaultValue;
        }
      }
      return result;
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj;
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
      path
        .slice(0, -1)
        .reduce(
          (a, c, i) =>
            Object(a[c]) === a[c]
              ? a[c]
              : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
          obj
        )[path[path.length - 1]] = value;
      return obj;
    }

    getData(key) {
      let val = this.getVal(key);
      // 如果以 @
      if (/^@/.test(key)) {
        const [, objKey, paths] = /^@(.*?)\.(.*?)$/.exec(key);
        const objVal = objKey ? this.getVal(objKey) : '';
        if (objVal) {
          try {
            const objedVal = JSON.parse(objVal);
            val = objedVal ? this.lodash_get(objedVal, paths, '') : val;
          } catch (e) {
            val = '';
          }
        }
      }
      return val;
    }

    setData(val, key) {
      let isSuc = false;
      if (/^@/.test(key)) {
        const [, objKey, paths] = /^@(.*?)\.(.*?)$/.exec(key);
        const objdat = this.getVal(objKey);
        const objVal = objKey
          ? objdat === 'null'
            ? null
            : objdat || '{}'
          : '{}';
        try {
          const objedVal = JSON.parse(objVal);
          this.lodash_set(objedVal, paths, val);
          isSuc = this.setVal(JSON.stringify(objedVal), objKey);
        } catch (e) {
          const objedVal = {};
          this.lodash_set(objedVal, paths, val);
          isSuc = this.setVal(JSON.stringify(objedVal), objKey);
        }
      } else {
        isSuc = this.setVal(val, key);
      }
      return isSuc;
    }

    getVal(key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(key);
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(key);
      } else if (this.isNode()) {
        this.data = this.loadData();
        return this.data[key];
      } else {
        return (this.data && this.data[key]) || null;
      }
    }

    setVal(val, key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(val, key);
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key);
      } else if (this.isNode()) {
        this.data = this.loadData();
        this.data[key] = val;
        this.writeData();
        return true;
      } else {
        return (this.data && this.data[key]) || null;
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require('got');
      this.ckTough = this.ckTough ? this.ckTough : require('tough-cookie');
      this.ckJar = this.ckJar ? this.ckJar : new this.ckTough.CookieJar();
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {};
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckJar;
        }
      }
    }

    async get(opts) {
      let Resp = null;
      if (opts.headers) {
        delete opts.headers['Content-Type'];
        delete opts.headers['Content-Length'];
      }
      try {
        if (this.isQuanX()) {
          if (this.isNeedRewrite) {
            opts.opts = opts.opts || {};
            Object.assign(opts.opts, { hints: false });
          }
          await $task.fetch(opts).then(t => {Resp = t }, e => { Resp = e.response });
        } else if (this.isNode()) {
          this.initGotEnv(opts);
          await this.got(opts)
            .on('redirect', (resp, nextOpts) => {
              try {
                if (resp.headers['set-cookie']) {
                  const ck = resp.headers['set-cookie']
                    .map(this.ckTough.Cookie.parse)
                    .toString();
                  if (ck) {
                    this.ckJar.setCookieSync(ck, null);
                  }
                  nextOpts.cookieJar = this.ckJar;
                }
              } catch (e) {
                this.logErr(e);
              }
              // this.ckJar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
            })
            .then(t => { Resp = t }, e => { Resp = e.response });
        }
      } catch (e) {
        if (e.name == 'TimeoutError') { 
          this.log(`请求超时，重试第${count}次`); 
        } else { 
          this.log(`请求错误(${e.message})，重试第${count}次`); 
        } 
      };
      if (Resp == null) return Promise.resolve({ statusCode: -1, headers: null, result: null });
      let { statusCode, headers, body } = Resp; 
      if (body) try { body = JSON.parse(body); } catch { }; 
      return Promise.resolve({ statusCode, headers, result: body }) 
    }

    async post(opts) {
      var Resp = null;
      const method = opts.method ? opts.method.toLocaleLowerCase() : 'post';
      // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
      if (opts.body && opts.headers && !opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = 'application/json';
      }
      if (opts.headers) delete opts.headers['Content-Length'];
      try {
        if (this.isQuanX()) {
          this.log('in QuanX env')
          opts.method = method;
          if (this.isNeedRewrite) {
            opts.opts = opts.opts || {};
            Object.assign(opts.opts, { hints: false });
          }
          await $task.fetch(opts).then(t => {Resp = t }, e => { Resp = e.response });
        } else if (this.isNode()) {
          this.initGotEnv(opts);
          const { url, ..._opts } = opts;
          await this.got[method](url, _opts).then(t => { Resp = t }, e => { Resp = e.response })
        }
      } catch (e) {
        if (e.name == 'TimeoutError') { 
          this.log(`请求超时，重试第${count}次`); 
        } else { 
          this.log(`请求错误(${e.message})，重试第${count}次`); 
        } 
      };
      
      if (Resp == null) return Promise.resolve({ statusCode: -1, headers: null, result: null });
      let { statusCode, headers, body } = Resp; 
      if (body) try { body = JSON.parse(body); } catch { }; 
      return Promise.resolve({ statusCode, headers, result: body }) 
    }
    /**
     *
     * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
     *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
     * @param {string} fmt 格式化参数
     * @param {number} 可选: 根据指定时间戳返回格式化日期
     *
     */
    time(fmt, ts = null) {
      const date = ts ? new Date(ts) : new Date();
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
      return fmt;
    }
    
    md5(inputString) {
      var hc="0123456789abcdef";
      function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
      function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
      function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
      function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
      function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
      function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
      function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
      function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
      function sb(x) {
          var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
          for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
          blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
      }
      var i,x=sb(inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
      for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
          a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
          b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
          c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
          d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
          a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
          b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
          c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
          d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
          a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
          b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
          c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
          d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
          a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
          b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
          c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
          d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
          a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
          b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
          c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
          d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
          a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
          b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
      }
      return rh(a)+rh(b)+rh(c)+rh(d);
    }

    json2str(obj, c, encode = false) {
      let ret = [];
      for (let keys of Object.keys(obj).sort()) {
        let v = obj[keys];
        if (v && encode) v = encodeURIComponent(v);
        ret.push(keys + '=' + v);
      }
      return ret.join(c);
    }

    str2json(str, decode = false) {
      let ret = {};
      for (let item of str.split('&')) {
        if (!item) continue;
        let idx = item.indexOf('=');
        if (idx == -1) continue;
        let k = item.substr(0, idx);
        let v = item.substr(idx + 1);
        if (decode) v = decodeURIComponent(v); ret[k] = v;
      }
      return ret;
    }

    object2formdata = function (obj) {
      let str = [];
      for (let p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }

    formdata2object = function (str) {
      return JSON.parse('{"' + str.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    }

    padStr(num, length, opt = {}) {
      let padding = opt.padding || '0'; let mode = opt.mode || 'l'; let numStr = String(num);
      let numPad = (length > numStr.length) ? (length - numStr.length) : 0; let pads = '';
      for (let i = 0; i < numPad; i++) {
        pads += padding;
      }
      if (mode == 'r') {
        numStr = numStr + pads;
      } else {
        numStr = pads + numStr;
      }
      return numStr;
    }
    /**
     * 系统通知
     *
     * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
     *
     * 示例:
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title 标题
     * @param {*} subt 副标题
     * @param {*} desc 通知详情
     * @param {*} opts 通知参数
     *
     */
    msg(title = name, subt = '', desc = '', opts) {
      const toEnvOpts = (rawOpts) => {
        if (!rawOpts) return rawOpts;
        if (typeof rawOpts === 'string') {
          if (this.isLoon()) return rawOpts;
          else if (this.isQuanX()) return { 'open-url': rawOpts };
          else if (this.isSurge()) return { url: rawOpts };
          else return undefined;
        } else if (typeof rawOpts === 'object') {
          if (this.isLoon()) {
            let openUrl = rawOpts.openUrl || rawOpts.url || rawOpts['open-url'];
            let mediaUrl = rawOpts.mediaUrl || rawOpts['media-url'];
            return { openUrl, mediaUrl };
          } else if (this.isQuanX()) {
            let openUrl = rawOpts['open-url'] || rawOpts.url || rawOpts.openUrl;
            let mediaUrl = rawOpts['media-url'] || rawOpts.mediaUrl;
            let updatePasteboard =
              rawOpts['update-pasteboard'] || rawOpts.updatePasteboard;
            return {
              'open-url': openUrl,
              'media-url': mediaUrl,
              'update-pasteboard': updatePasteboard,
            };
          } else if (this.isSurge()) {
            let openUrl = rawOpts.url || rawOpts.openUrl || rawOpts['open-url'];
            return { url: openUrl };
          }
        } else {
          return undefined;
        }
      };
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(title, subt, desc, toEnvOpts(opts));
        } else if (this.isQuanX()) {
          $notify(title, subt, desc, toEnvOpts(opts));
        }
      }
      if (!this.isMuteLog) {
        let logs = ['', '==============📣系统通知📣=============='];
        logs.push(title);
        subt ? logs.push(subt) : '';
        desc ? logs.push(desc) : '';
        console.log(logs.join('\n'));
        this.logs = this.logs.concat(logs);
      }
    }

    log(...logs) {
      if (this.noLog || (this.noLogKey && (this.getData(this.noLogKey) || 'N').toLocaleUpperCase() === 'Y')) {
        return;
      }
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs];
      }
      console.log(logs.join(this.logSeparator));
    }

    logErr(err, msg) {
      const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      if (!isPrintSack) {
        this.log('', `❗️${this.name}, 错误!`, err);
      } else {
        this.log('', `❗️${this.name}, 错误!`, err.stack);
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    async done(val = {}) {
      await this.showmsg();
      let e = Date.now();
      let s = (e - this.startTime) / 1000;
      this.log('');
      this.log(`[${this.name}]运行结束，共运行了${s}秒`, { time: true });
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(val);
      }
      else process.exit(0);
    }
  })(name, opts);
}
