import { createConnection } from 'typeorm'
import { Game } from './entity/Game'
const get = require('async-get-file')

async function main() {
  const connection = await createConnection()

  const gameRepository = connection.getRepository(Game)

  const games = await gameRepository.find()

  for (const game of games) {
    if (game.isDone === 'true') continue

    console.log(`pack: #${game.id} of ${games.length} - ${game.name}`)
    try {
      await get(game.packUrl, {
        directory: `./vgmrips/`,
        filename: decodeURI(game.packUrl).split('/').pop(),
      })

      game.isDone = 'true'
      await gameRepository.save(game)
    } catch (e) {
      console.log(`pack error: ${game.name}`)
      console.error(e.message)
    }
  }
}

main().catch(console.error)
