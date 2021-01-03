import { createConnection } from 'typeorm'
import { Game } from './entity/Game'
const https = require('https')
const fs = require('fs')

function download(url, name, callback) {
  const file = fs.createWriteStream(name)
  const request = https.get(url, function (response) {
    response.pipe(file)

    if (response.statusCode !== 200) {
      console.log(`failed to download: ${name}`)
    }
  })
}

async function downloadPack(url, callback) {
  const parts = decodeURI(url).split('/')
  const fileName = parts.pop()
  const systemSlug = parts.pop()
  const path = `./files/${systemSlug}/${fileName}`

  download(url, path, callback)

  console.log('~~', path)
}

async function main() {
  const connection = await createConnection()

  const gameRepository = connection.getRepository(Game)

  const firstGame = await gameRepository.findOne(1)

  downloadPack(firstGame.packUrl, () => {})

  //   download(firstGame.packUrl, 'fasldf.zip', () => {
  //     console.log('done')
  //   })

  console.log('-')
}

main().catch(console.error)
