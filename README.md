# 台北市 Youbike 即時查詢系統

## 各組件功能說明
* `App.vue` 主要父層級畫面
* `StationItem.vue` 站點資訊vue元件
* `BikeStore.js` 主功能js Function
* `Toast.js` 顯示通知小功能

## App.vue
* `onMounted` 取得localStorage中收藏列表
* `ScrollTop` 滑到最頂端
* `watch` 監控當輸入框清空後，移除結果列表

## StationItem.vue
* 展示站點資訊，如:名稱, 地址, 所在地, 可租/還車輛數
* 於此子元件控制是否收藏該站點
* 利用`onOpenModal`控制彈出式卡片的啟閉
* `mapUrl` 用於存放 `Google iframe `的連結

## BikeStore.js
* `GetkeepList` 取得localStorage中收藏列表存於 `keepList`
* `Deletekeep` 移除收藏的單一站點
* `setKeep` 加入收藏的單一站點
* `getBikeInfo` 透過API取得站點最新資訊
* `updateBikeKeepStatus` 更新結果站點收藏狀態
