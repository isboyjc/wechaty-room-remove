/*
 * @Author: isboyjc
 * @Date: 2020-07-01 19:26:06
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-07-01 22:12:11
 * @Description: wechaty plugin 快捷移出群聊
 */
const DEFAULT_CONFIG = {
  keyword: ["飞机", "踢"],
  adminList: [],
  time: 3000,
  replyInfo: function (msg) {
    return `您可能违反了社群规则，并收到举报，${
      this.time / 1000
    }s后将您移出群聊，如有问题请联系管理！！！🚀\n\n移除原因：违反社群规则\n操作时间：${dateTimeFormat()}\n操作管理员：${msg
      .from()
      .name()}\n\nYou may have violated the community rules and received a report. After ${
      this.time / 1000
    }S, you will be removed from the group chat. If you have any questions, please contact the management！！！🚀\n\nReason for removal：Violation of community rules\nOperation time：${dateTimeFormat()}\nOperation administrator：${msg
      .from()
      .name()}`
  },
  replyDone: "done",
  replyNoPermission: "",
}

module.exports = function WechatyRoomRemove(config = {}) {
  config = Object.assign({}, DEFAULT_CONFIG, config)

  if (typeof config.keyword === "string") config.keyword = [config.keyword]
  if (typeof config.replyInfo === "string") {
    let info = config.replyInfo
    config.replyInfo = () => info
  }

  return (bot) => {
    // 消息监听
    bot.on("message", async (msg) => {
      if (msg.self()) return

      // 校验消息类型为文本 且 来自群聊
      if (msg.type() === bot.Message.Type.Text && msg.room()) {
        // 获取群聊实例
        const room = await msg.room()

        // 是否为@的用户列表
        if (msg.mentionList()) {
          // 获取在群中@的用户列表
          let contactList = await msg.mentionList()
          let sendText = msg.text(),
            aite = ""
          for (let i = 0; i < contactList.length; i++) {
            // 获取@ +  群聊别称 || 名字
            let name =
              (await room.alias(contactList[i])) || contactList[i].name()
            aite = "@" + name
            // 匹配删除名字信息
            sendText = sendText.replace(aite, "")
          }
          // 删除首尾空格
          sendText = sendText.replace(/(^\s*)|(\s*$)/g, "")

          if (config.keyword.some((v) => v === sendText)) {
            if (config.adminList.some((v) => v.id == msg.from().id)) {
              room.say(config.replyInfo(msg), ...contactList)

              setTimeout(async () => {
                contactList.map(async (item) => {
                  try {
                    await room.del(item)
                  } catch (e) {
                    console.error(e)
                  }

                  room.say(config.replyDone)
                })
              }, config.time)
            } else {
              if (config.replyNoPermission) {
                room.say(config.replyNoPermission, msg.from())
              }
            }
          }
        }
      }
    })
  }
}

/**
 * @description 日期时间转格式
 * @param {Object} date 时间，非必选，默认当前时间
 * @return {String}
 */
function dateTimeFormat(date = new Date()) {
  let year = date.getFullYear() //获取当前年份
  let mon = date.getMonth() + 1 //获取当前月份
  let da = date.getDate() //获取当前日
  let day = date.getDay() //获取当前星期几
  let h = date.getHours() //获取小时
  let m = date.getMinutes() //获取分钟
  let s = date.getSeconds() //获取秒

  //判断当数字小于等于9时 显示 01 02 ----- 08 09
  if (mon >= 1 && mon <= 9) {
    mon = "0" + mon
  }

  if (da >= 0 && da <= 9) {
    da = "0" + da
  }

  if (h >= 0 && h <= 9) {
    h = "0" + h
  }

  if (m >= 0 && m <= 9) {
    m = "0" + m
  }

  if (s >= 0 && s <= 9) {
    s = "0" + s
  }

  switch (day) {
    case 1:
      day = "一"
      break
    case 2:
      day = "二"
      break
    case 3:
      day = "三"
      break
    case 4:
      day = "四"
      break
    case 5:
      day = "五"
      break
    case 6:
      day = "六"
      break
    default:
      day = "日"
  }
  return `${year}-${mon}-${da} ${h}:${m}:${s} 星期${day}`
}
