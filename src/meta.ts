import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { System } from './entity/System'
import { Game } from './entity/Game'
import { grabSystemsPage } from './systemUtils'
import { grabGamesMetas } from './gameUtils'

async function main() {
  const connection = await createConnection()
  const systemRepository = connection.getRepository(System)
  const gameRepository = connection.getRepository(Game)

  const fetchedSystems = await grabSystemsPage()

  for (const systemInfo of fetchedSystems) {
    console.log(`--> system: ${systemInfo.name}`)

    const system = systemRepository.create({
      name: systemInfo.name,
    })

    const storedSystem = await systemRepository.save(system)
    await grabGamesMetas(systemInfo.url, storedSystem, gameRepository)
  }
}

main().catch(console.error)
