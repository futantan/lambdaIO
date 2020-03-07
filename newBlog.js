const fs = require('fs').promises
const path = require('path')
const dayjs = require('dayjs')

const blogName = process.argv[process.argv.length - 1]
const folderPrefix = dayjs().format('YYYY-MM-DD-')
const date = dayjs().format('YYYY-MM-DD HH:mm:ss')

const TEMPLATE = `---
title:
date: ${date}
tags: ['']
desc:
path: ${blogName}
---`

const folder = path.join('./src/blog', `${folderPrefix}${blogName}`)
fs.mkdir(folder)
  .then(() => fs.writeFile(path.join(folder, `${blogName}.md`), TEMPLATE))
  .then(() => console.log('Created'))
  .catch(console.log)
