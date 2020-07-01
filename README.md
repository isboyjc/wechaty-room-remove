# wechaty-room-remove

[![Wechaty Plugin Contrib](https://img.shields.io/badge/Wechaty%20Plugin-wechaty--room--remove-brightgreen.svg)](https://github.com/isboyjc/wechaty-room-remove) [![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/Wechaty/wechaty)

Quick automatic removal from group chat

快捷自动移出群聊

## 开始

### 简介

你可以在群聊中@一个违规的人并携带你所设置的关键字，机器人监听到后会帮你快捷的移除他并且给出提示，这比手动删除群聊中某一个人要方便的多

### 安装

```txt
npm install wechaty-room-remove

or

yarn add wechaty-room-remove
```

### 使用

```js
const WechatyRoomRemove = require("wechaty-room-remove")

bot.use(WechatyRoomRemove(options))
```

如上所示

使用插件只要按需传入配置对象 `options` 即可

| Options 参数属性 | 类型          | 简介                                                         |
| ---------------- | ------------- | ------------------------------------------------------------ |
| keyword          | String\|Array | 触发移除该用户的关键字，只有一个可以使用字符串类型，多个关键字使用数组类型，默认为 ["飞机", "踢"] |
| time             | Number         | 触发移除后的延时/ms，默认3000，即3s |
| adminList            | Array        | 可触发命令的管理员列表，一个数组对象，单个数组对象属性请看下面配置示例 |
| replyInfo | String\|Function | 移除前@提示该用户的一句话，可为字符串类型，也可以是函数类型，函数类型时，有一个参数msg，即当前消息实例，函数最终需返回一个字符串function(msg){return ...}，此项有默认值，请看下文示例 |
| replyDone | String | 移除成功提示，字符串类型，默认成功时返回done |
| replyNoPermission | String | 无权限移除成员时机器人的回复，即当一个不在adminList配置中的用户发出命令时回复，默认不做出回复 |

我们来看 `adminList` 数组的配置示例

```js
adminList: [
  {
    // 管理员昵称，用以区分，可选
    name: "isboyjc",
    // 管理员id，必填
    id: "wxid_nrsh4yc8yupm22",
  },
  {
    name: "工具人小杨",
    id: "wxid_vkovzba0b0c212",
  },
  ...
]
```

### 示例

```js
const { Wechaty } = require("wechaty")
const { PuppetPadplus } = require("wechaty-puppet-padplus")
const Qrterminal = require("qrcode-terminal")
// 插件 WechatyRoomWelcome
const WechatyRoomWelcome = require("../index")

// 初始化 bot
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    // 机器人padplus协议token
    token: PUPPET_PADPLUS_TOKEN,
  }),
  // 机器人名字
  name: ROBOT_NAME,
})

const options = {
  // 触发关键字数组
  keyword: ["飞机", "踢", "慢走", "不送"],
  // 管理员列表
  adminList: [
    {
      name: "isboyjc",
      id: "wxid_nrsh4yc8yupm22",
    },
    {
      name: "工具人小杨",
      id: "wxid_vkovzba0b0c212",
    },
    {
      name: "便便",
      id: "wxid_4mnet5yeqo5d21",
    },
  ],
  // 延时
  time: 3000,
  // 移除前提示，以下配置是默认配置，这里用来展示函数类型配置
  // 可根据函数回调中msg消息实例参数自由发挥，也可直接填写一段字符串
  replyInfo: function (msg) {
    return `您可能违反了社群规则，并收到举报，${this.time / 1000}s后将您移出群聊，如有问题请联系管理！！！🚀\n\n移除原因：违反社群规则\n操作时间：${dateTimeFormat()}\n操作管理员：${msg.from().name()}\n\nYou may have violated the community rules and received a report. After ${this.time / 1000}S, you will be removed from the group chat. If you have any questions, please contact the management！！！🚀\n\nReason for removal：Violation of community rules\nOperation time：${dateTimeFormat()}\nOperation administrator：${msg.from().name()}`
  },
  // 移除成功后提示
  replyDone: "移除成功",
  // 无权限人员触发命令后回复，可选项，默认不进行回复
  replyNoPermission: "您暂时没有权限哦，联系管理员吧😊",
}

// 使用插件
bot.use(WechatyRoomRemove(options))

bot
  .on("scan", (qrcode, status) => {
    Qrterminal.generate(qrcode, { small: true })
  })
  .start()

/**
 * @description 日期时间转格式
 * @param {Object} date 时间，非必选，默认当前时间
 * @return {String}
 */
function dateTimeFormat(date = new Date()) {
  ...
}
```



### 最后

扫描二维码，加圈子微信，可进交流群哦，效果如下图，赶快来试试吧

<img src="https://gitee.com/IsboyJC/PictureBed/raw/master/other/asdakshdajshdas1.jpeg" width="200" height="200" alt="图片名称" align=left />

<div>
<img src="https://gitee.com/IsboyJC/PictureBed/raw/master/other/image-20200701221539434.png" width="200" height="420"  alt="图片名称" align=left />
<img src="https://gitee.com/IsboyJC/PictureBed/raw/master/other/image-20200701221855779.png" width="200" height="420"  alt="图片名称" align=left />
</div>



















