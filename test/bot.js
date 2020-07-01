/*
 * @Author: isboyjc
 * @Date: 2020-07-01 19:25:53
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-07-01 22:05:51
 * @Description: file content
 */
// Wechaty核心包
const { Wechaty } = require("wechaty")
// padplus协议包
const { PuppetPadplus } = require("wechaty-puppet-padplus")
// qr码
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
  keyword: ["飞机", "踢", "慢走", "不送"],
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
  time: 3000,
  replyDone: "移除成功",
  replyNoPermission: "您暂时没有权限哦，联系管理员吧😊",
}

// 使用插件
bot.use(WechatyRoomRemove(options))

bot
  .on("scan", (qrcode, status) => {
    Qrterminal.generate(qrcode, { small: true })
  })
  .start()
