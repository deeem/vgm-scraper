import { createConnection } from 'typeorm'
import { Game } from './entity/Game'
const get = require('async-get-file')

async function downloadPack(url) {
  const parts = decodeURI(url).split('/')
  const fileName = parts.pop()
  const systemSlug = parts.pop()

  await get(url, { directory: `./files/`, filename: fileName })
}

async function downloadImg(url) {
  const parts = decodeURI(url).split('/')
  const fileName = parts.pop()
  const systemSlug = parts.pop()

  const newUrl = `https://vgmrips.net/files/${systemSlug}/${fileName}`

  await get(newUrl, {
    directory: `./files/`,
    filename: fileName,
  })
}

async function main() {
  const connection = await createConnection()

  const gameRepository = connection.getRepository(Game)

  const games = await gameRepository.find()

  for (const game of games) {
    if (game.isDone === 'true') continue

    console.log(`pack: #${game.id} of ${games.length} - ${game.name}`)
    try {
      await downloadPack(game.packUrl)

      game.isDone = 'true'
      await gameRepository.save(game)
    } catch (e) {
      console.log(`pack error: ${game.name}`)
      console.error(e)
    }

    try {
      await downloadImg(game.imageUrl)
    } catch (e) {
      console.log(`image error: ${game.name}`)
      console.error(e)
    }
  }
}

main().catch(console.error)
