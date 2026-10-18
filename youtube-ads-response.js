/**
 * YouTube 去广告 — 响应脚本 (http-response)
 *
 * 适用：Surge 5
 * 拦截：youtubei.googleapis.com/youtubei/v1/(browse|next|player|search|reel/reel_watch_sequence|guide|account/get_setting)
 * 原理：递归遍历响应 JSON，删除命中的广告字段与广告渲染器节点，交给播放器/页面时已无广告数据。
 * 覆盖：前贴片/中贴片/后贴片广告、信息流广告、搜索广告、Shorts 广告。
 */

// 命中即删除的广告字段 / 渲染器 key 规则
var AD_PATTERN = /(^|[._-])ad|playerAds|AdRenderer|AdSlot|AdPlacement|adBreak|adCueRange|adParams|paidContent|sponsored|promotedSparkles|bannerAd/;

function walk(node) {
  if (!node) return;

  if (Array.isArray(node)) {
    for (var i = node.length - 1; i >= 0; i--) {
      var item = node[i];
      if (item && typeof item === 'object') {
        walk(item);
      } else if (typeof item === 'string' && AD_PATTERN.test(item)) {
        node.splice(i, 1); // 渲染器名称列表里去掉广告项
      }
    }
    return;
  }

  if (typeof node === 'object') {
    Object.keys(node).forEach(function (key) {
      if (AD_PATTERN.test(key)) {
        delete node[key];
        return;
      }
      var val = node[key];
      if (val && typeof val === 'object') walk(val);
    });
  }
}

try {
  var body = $response.body;
  if (!body) {
    $done({});
    return;
  }
  var obj = JSON.parse(body);
  walk(obj);
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  // 非 JSON 或不支持的响应，原样放行，避免破坏播放
  $done({});
}
