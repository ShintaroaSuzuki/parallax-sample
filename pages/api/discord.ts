import { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const URL = process.env.DISCORD_WEBHOOK_URL as string

  const { name, mailAddress, inquiry } = JSON.parse(req.body)

  try {
    fetch(URL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'お問い合わせ通知',
        content: '@everyone',
        embeds: [{
          title: `お問い合わせがありました`,
          description: `氏名: ${name}\nメールアドレス: ${mailAddress}` 
            + ((!!inquiry) ? `\nお問い合わせ内容: ${inquiry}` : '')
            + '\n\n[お問い合わせリスト](https://www.notion.so/shintaroa/58b095bfbe3746649ba058d4b32ca18f?v=e22824636f0d4a02bc8649f4cf29c743)から確認してください'
        }],
        allowed_mentions: { parse: ['everyone'] }
      })    
    })
    res.status(201).json({ msg: 'Success' })
  } catch(error) {
    res.status(500).json({ msg: 'There was an error' })
  }
}

