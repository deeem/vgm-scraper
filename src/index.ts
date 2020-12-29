import axios from 'axios'
import cheerioModule = require('cheerio')
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Company } from './entity/Company'

import { System } from './entity/System'
import { SystemType } from './entity/SystemType'

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
  const html = await fetchHtml(systemsUrl)
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

const storeCompany = async (connection, name) => {
  const companyRepository = connection.getRepository(Company)

  const found = await companyRepository.findOne({ where: { name } })

  if (found) return

  const company = companyRepository.create({ name })

  await companyRepository.save(company)
}

const preloadSystemTypeByName = async (connection, name) => {
  const systemTypeRepository = connection.getRepository(SystemType)

  const found = await systemTypeRepository.findOne({ name })

  if (found) {
    return found
  }

  return systemTypeRepository.create({ name })
}

// const preloadTypeByName = async (connection, name) => {
//   const systemTypeRepository = connection.getRepository(SystemType)

//   const found = await systemTypeRepository.findOne({ name })

//   if (found) {
//     return found
//   }

//   return systemTypeRepository.create({ name })
// }

async function main() {
  const connection = await createConnection()

  const SystemTypeRepository = connection.getRepository(SystemType)
  const systemRepository = connection.getRepository(System)
  const companyRepository = connection.getRepository(Company)

  // const res = await connection.manager.getRepository(User).find()

  // console.log(res)

  const systemsOnPage = await grabSystemsPage()
  console.log('-->', systemsOnPage)

  return

  for (const systemInfo of systemsOnPage) {
    await storeCompany(connection, systemInfo.company)
  }

  // await systemsOnPage.forEach(async (systemInfo) => {
  //   await storeCompany(connection, systemInfo.company)

  //   // const company = new Company()
  //   // company.name = systemInfo.company
  //   // companyRepository.save(company)

  //   // const systemType = new SystemType()
  //   // systemType.name = systemInfo.type

  //   // const system = new System()
  //   // system.name = systemInfo.name
  //   // system.type = systemType
  //   // systemRepository.save(system)
  // })

  // await hardwareRepository.save(newHardware)

  // await systemsOnPage.forEach( async (systemInfo) => {
  //   await
  // })
}

main().catch(console.error)
