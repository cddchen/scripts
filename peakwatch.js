var objc = JSON.parse($response.body);

if (objc.features) {
  objc.features = Object.fromEntries(
    Object.entries(objc.features).map(([name]) => {
      return [name, true];
    })
  );
}

if (objc.content) {
  objc.content.isSubscriber = true
  objc.content.needForceUpgrade = false
}

console.log(JSON.stringify(objc));
$done({
  body: JSON.stringify(objc),
});
