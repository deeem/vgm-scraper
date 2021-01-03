import { createConnection } from 'typeorm'
import { Game } from './entity/Game'
const get = require('async-get-file')

async function downloadPack(url) {
  const parts = decodeURI(url).split('/')
  const fileName = parts.pop()
  const systemSlug = parts.pop()

  await get(url, { directory: `./files/${systemSlug}/`, filename: fileName })
}

async function downloadImg(url) {
  const parts = decodeURI(url).split('/')
  const fileName = parts.pop()
  const systemSlug = parts.pop()

  const newUrl = `https://vgmrips.net/files/${systemSlug}/${fileName}`

  await get(newUrl, {
    directory: `./files/${systemSlug}/`,
    filename: fileName,
  })
}

async function main() {
  const connection = await createConnection()

  const gameRepository = connection.getRepository(Game)

  const firstGame = await gameRepository.findOne(1)

  await downloadImg(firstGame.imageUrl)
  console.log(firstGame)

  return

  const games = await gameRepository.find()

  for (const game of games) {
    console.log(`pack: #${game.id} of ${games.length} - ${game.name}`)
    await downloadPack(game.packUrl)
  }
}

main().catch(console.error)
