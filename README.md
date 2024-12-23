#d2p - WIP
## 功能
根据正则匹配下载文件到指定的子目录

## 起因
调试pdf和excel下载的时候生成了很多临时文件在下载目录，导致找东西很麻烦 \
虽然有其他扩展实现类似功能（大概，只看了介绍没仔细研究），但不想替换chrome原生的下载管理（从插件截图上看就没吸引力）

## 其他
** 由于chrome安全性限制，无法在下载主目录之外保存 **  
** 是否能够自动创建子目录尚不确定，先玩几天再说 **  

## TODO
调整顺序尚未实现，angular cdk \
`background.js` 用 angular 实现，暂未找到合适的方式

## 使用方法
1. `npm run build`
2. chrome 从 `dist/d2p/browser` 目录加载插件

## History
- 2024-12-23 \
修改为 angular

- 2015-05-18 \
初版
