import { createConnection } from 'typeorm'
import { Game } from './entity/Game'

async function main() {
  const connection = await createConnection()
  const gameRepository = connection.getRepository(Game)
  const games = await gameRepository.find({ relations: ['system'] })

  games.map((game) => {})
}

main().catch(console.error)
