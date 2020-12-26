import axios from 'axios'
import cheerioModule = require('cheerio')
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'

const companiesUrl = 'https://vgmrips.net/packs/companies'
const systemsUrl = 'https://vgmrips.net/packs/systems'

/*
createConnection()
  .then(async (connection) => {
    return

    console.log('Inserting a new user into the database...')
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await connection.manager.save(user)
    console.log('Saved a new user with id: ' + user.id)

    console.log('Loading users from the database...')
    const users = await connection.manager.find(User)
    console.log('Loaded users: ', users)

    console.log('Here you can setup and run express/koa/any other framework.')
  })
  .catch((error) => console.log(error))

*/

const fetchHtml = async (url) => {
  try {
    const { data } = await axios.get(url)

    return data
  } catch {
    console.log(`ERROR: while trying to fetch ${url}`)
  }
}

const extractInfoFromSystemItem = (element, $) => {
  const $item = $(element)

  const name = $item.find('.name a').text()
  const url = $item.find('.name a').attr('href')

  const [harwdare, company] = $item
    .find('.cat')
    .text()
    .trim()
    .split('•')
    .map((item) => item.trim())

  return {
    name,
    url,
    harwdare,
    company,
  }
}

const grabSystemsPage = async () => {
  const html = await fetchHtml(systemsUrl)
  const $ = cheerioModule.load(html)

  let systemsOnPage = []

  const $systems = $('#systems').find('.system')

  $systems.each((i, element) => {
    const system = extractInfoFromSystemItem(element, $)

    systemsOnPage = [...systemsOnPage, system]

    // console.log(system)
  })
  console.log('-->', systemsOnPage)
}

async function main() {
  const connection = await createConnection()

  // const res = await connection.manager.getRepository(User).find()

  // console.log(res)

  grabSystemsPage()
}

main().catch(console.error)
