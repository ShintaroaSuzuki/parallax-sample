import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const URL = 'https://discord.com/api/webhooks/928640735899697164/Xh24OYiwtM1J0bq8Mswd0flLaZux-XgclnnUQuxVlIVO-vy_9a76jAWq79hrqAQzFaP-'

  const { name, notionUrl } = JSON.parse(req.body)

  return fetch(URL, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'お問い合わせ通知',
      content: `@everyone ${name} さんから問い合わせがありました\n${notionUrl}`,
      allowed_mentions: { parse: ['everyone'] }
    })    
  })
}


