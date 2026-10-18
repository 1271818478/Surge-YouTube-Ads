# Surge-YouTube-Ads

Surge 模块：YouTube 去广告（MITM 拦截播放接口，剥离广告字段）

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `YouTube-Adblock.sgmodule` | Surge 模块主文件，可直接通过 URL 安装 |
| `youtube-ads-request.js` | 请求阶段脚本：剥离请求体里的广告参数 |
| `youtube-ads-response.js` | 响应阶段脚本：递归移除响应 JSON 中的广告字段/渲染器 |

## 安装步骤

1. Surge 5 打开，进入 **模块（Modules）** → **通过 URL 安装**；
2. 粘贴模块地址：
   `https://raw.githubusercontent.com/1271818478/Surge-YouTube-Ads/main/YouTube-Adblock.sgmodule`
3. 在 **设置 / 通用** 中开启 **MITM** 并信任已安装的 Surge 根证书；
4. Mac 端若开启后 YouTube 打不开，将 Surge 根证书加入系统信任。

## 说明

- 需 Surge 5 及以上（依赖 `binary-body-mode`）。
- 覆盖前/中/后贴片广告、信息流广告、搜索广告、Shorts 广告。
- YouTube 接口变动可能导致失效，届时把新增的广告渲染器 key 加入 `youtube-ads-response.js` 顶部的 `AD_PATTERN` 即可。
