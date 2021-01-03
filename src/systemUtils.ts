import cheerioModule = require('cheerio')
import { fetchHtml } from '../fetchHtml'

const extractInfoFromSystemItem = (element, $) => {
  const $item = $(element)

  const name = $item.find('.name a').text()
  const url = $item.find('.name a').attr('href')

  const [type, company] = $item
    .find('.cat')
    .text()
    .trim()
    .split('•')
    .map((item) => item.trim())

  return {
    name,
    url,
    type,
    company,
  }
}

const grabSystemsPage = async () => {
  const html = await fetchHtml('https://vgmrips.net/packs/systems')
  const $ = cheerioModule.load(html)

  let systemsOnPage = []

  const $systems = $('#systems').find('.system')

  $systems.each((i, element) => {
    const system = extractInfoFromSystemItem(element, $)

    systemsOnPage = [...systemsOnPage, system]

    // console.log(system)
  })

  return systemsOnPage
}

export { grabSystemsPage }
