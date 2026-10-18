/**
 * YouTube 去广告 — 请求脚本 (http-request)
 *
 * 适用：Surge 5
 * 拦截：youtubei.googleapis.com/youtubei/v1/(browse|next|player|reel/reel_watch_sequence)
 * 原理：在请求发出前，剥离请求体里的 adBreakParams 等广告参数，让服务端尽量不预置广告数据。
 */

try {
  var body = $request.body;
  if (!body) {
    $done({});
    return;
  }
  var req = JSON.parse(body);
  if (req && typeof req === 'object') {
    delete req.adBreakParams;
    if (req.playerRequest && typeof req.playerRequest === 'object') {
      delete req.playerRequest.adBreakParams;
    }
  }
  $done({ body: JSON.stringify(req) });
} catch (e) {
  // 解析失败则原样放行
  $done({});
}
