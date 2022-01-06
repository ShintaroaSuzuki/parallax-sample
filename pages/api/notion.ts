import { Client } from '@notionhq/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({
  auth: 'secret_L1FNadtJlkQiaKQ3S79qaLiYgTFId4NHLjpEJP53ZDe',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed`})
  }
  try {
    const { name, mailAddress, inquiry } = JSON.parse(req.body)
      const title = name;

      await notion.pages.create({
          parent: { database_id: '58b095bfbe3746649ba058d4b32ca18f' },
          properties: {
              '氏名': {
                  type: 'title',
                  title: [
                      {
                          text: {
                              content: title
                          }
                      }
                  ]
              },
              'メールアドレス': {
                  type: 'email',
                  email: mailAddress
              },
              'ステータス': {
                  type: 'select',
                  select: {
                    name: 'リード',
                    color: 'purple'
                  }
              }
          },
          children: [
              {
                  type: 'heading_1',
                  //...other keys excluded
                  heading_1: {
                      text: [
                          {
                              type: 'text',
                              text: {
                                  content: 'お問い合わせ内容',
                                  link: null
                              }
                          }
                      ]
                  }
              },
              {
                type: 'paragraph',
                paragraph: {
                  text: [{
                    type: 'text',
                    text: {
                      content: inquiry,
                      link: null
                    }
                  }]
                }
              }
          ]
      });
      res.status(201).json({ msg: 'Success'})
    } catch (error) {
      res.status(500).json({ msg: 'There was an error'})
    }
}
