import { writeFileSync } from 'fs'
import { createConnection } from 'typeorm'
import { Game } from './entity/Game'

async function main() {
  const connection = await createConnection()
  const gameRepository = connection.getRepository(Game)
  const games = await gameRepository.find({ relations: ['system'] })

  let json = {}

  for (const game of games) {
    const filename = decodeURI(game.packUrl).split('/').pop()
    json[game.system.name] = { ...(json[game.system.name] || {}) }

    json[game.system.name][game.name] = filename
  }

  try {
    writeFileSync('./vgmrips/games.json', JSON.stringify(json))
  } catch (e) {
    console.log(e)
  }
}

main().catch(console.error)
