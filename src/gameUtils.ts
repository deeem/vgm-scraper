import cheerioModule = require('cheerio')
import { fetchHtml } from './fetchHtml'

function extractGameInfo(game) {
  const name = game.find('.details a').eq(1).text()
  const packUrl = game.find('.details a').eq(2).attr('href')

  return {
    name,
    packUrl,
  }
}

async function grabGamesPage(url) {
  let html = await fetchHtml(url)
  let $ = cheerioModule.load(html)

  let $games = $('.result')

  let games = []
  $games.each((i, game) => {
    games.push(extractGameInfo($(game)))
  })

  return games
}

async function grabGamesMetas(systemUrl, system, gameRepository) {
  const html = await fetchHtml(systemUrl)
  const $ = cheerioModule.load(html)
  const $paginator = $('nav > div > ul.pagination').last().find('li')

  const pages =
    $paginator.length > 3
      ? parseInt($paginator.eq($paginator.length - 2).text(), 10)
      : 1

  for (let page = 0; page < pages; page++) {
    const pageGames = await grabGamesPage(`${systemUrl}?p=${page}`)

    console.log(`-> ${system.name} : page ${page} of ${pages}`)

    for (const gameInfo of pageGames) {
      const game = gameRepository.create({
        name: gameInfo.name,
        packUrl: gameInfo.packUrl,
        imageUrl: gameInfo.imageUrl,
        system,
      })

      await gameRepository.save(game)

      console.log(`> ${gameInfo.name}`)
    }
  }
}

export { grabGamesMetas }
