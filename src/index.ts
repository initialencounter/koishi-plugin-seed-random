import { Context, Schema, Session } from 'koishi'

export const name = 'jrrp'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export const log = (s) => console.log(s)

export const luck_simple = (num: number) => {
  if (num < 18) {
    return '大吉'
  }
  else if (num < 53) {
    return '吉'
  }
  else if (num < 58) {
    return '半吉'
  }
  else if (num < 62) {
    return '小吉'
  }
  else if (num < 65) {
    return '末小吉'
  }
  else if (num < 71) {
    return '末吉'
  }
  else {
    return '凶'
  }
}

export function setRandomNumber(num:number) {
  while(1){
    const date = new Date()
    const numb:number = Math.abs(Math.sin(num + date.getDate()))
    const rand_str:string = numb.toString().replace('.','')
    if (rand_str.length>3){
      const rand_str_:string = rand_str.slice(-3,-1)
      return parseInt(rand_str_)
    }
    num++
  }
}
export function apply(ctx: Context) {
  ctx.i18n.define('zh', require('./locales/zh'))
  ctx.command('jrrp')
    .alias('今日人品')
    .action(({ session }) => {
      const luck_point: number = setRandomNumber(session.userId)
      const luck_text: string = luck_simple(luck_point)
      return `<>
        <at id="${session.userId}"/>
        您今日的幸运指数是${luck_point}/100(越低越好)，为"${luck_text}"
      </>`
    })
}
