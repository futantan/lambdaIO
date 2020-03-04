import React from 'react'
import style from './style.module.css'

export const WechatQrCode = () => (
  <div className={style.wechat}>
    <img className="mb-2" src="/images/wechat.png" alt="wechat" />
    <p className="text-center">欢迎关注公众号</p>
  </div>
)
