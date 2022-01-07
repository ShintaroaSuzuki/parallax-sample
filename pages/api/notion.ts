import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const notionDatabaseId = process.env.NOTION_DATABASE_ID as string


  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed`})
  }
  try {
    const { name, mailAddress, inquiry } = JSON.parse(req.body)
      const title = name;

      await notion.pages.create({
          parent: { database_id: notionDatabaseId },
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
                    name: '未対応',
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
      res.status(201).json({ msg: 'Success' })
    } catch (error) {
      res.status(500).json({ msg: 'There was an error' })
    }
}
