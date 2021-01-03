import 'reflect-metadata'
import { createConnection, Exclusion } from 'typeorm'
import { grabSystemsPage } from './systemUtils'
import { System } from './entity/System'
import cheerioModule = require('cheerio')
import { fetchHtml } from '../fetchHtml'

const systemUrl = 'https://vgmrips.net/packs/system/nintendo/family-computer'
// const systemUrl = 'https://vgmrips.net/packs/system/taito/fx-1a'

function extractGameInfo(game, $) {
  const imageUrl = $(game).find('.image img').attr('src')
  const name = $(game).find('.details a').eq(1).text()
  const url = $(game).find('.details a').eq(1).attr('href')
  const packUrl = $(game).find('.details a').eq(2).attr('href')

  return {
    name,
    url,
    imageUrl,
    packUrl,
  }
}

async function grabGamesMetas(systemUrl) {
  const html = await fetchHtml(systemUrl)

  const $ = cheerioModule.load(html)

  const $paginator = $('nav > div > ul.pagination').last().find('li')

  const pages =
    $paginator.length > 3
      ? parseInt($paginator.eq($paginator.length - 2).text(), 10)
      : 1

  for (let page = 0; page < pages; page++) {
    let url = `${systemUrl}?p=${page}`

    let pageHtml = await fetchHtml(url)
    let $page = cheerioModule.load(pageHtml)

    let $games = $page('.result')

    $games.each((i, game) => {
      console.log('--------------------------------------------')

      // console.log($(game).text())

      console.log(extractGameInfo(game, $))
    })

    // console.log('game', $games)

    throw 'asdf'
  }
}

async function main() {
  /*
  const connection = await createConnection()
  const systemRepository = connection.getRepository(System)

  const fetchedSystems = await grabSystemsPage()

  for (const systemInfo of fetchedSystems) {
    const system = systemRepository.create({
      name: systemInfo.name,
      url: systemInfo.url,
    })

    // await systemRepository.save(system)
  }

  // console.log('-->', fetchedSystems)
 */

  await grabGamesMetas(systemUrl)
}

main().catch(console.error)
