import axios from 'axios'

const fetchHtml = async (url: string) => {
  try {
    const { data } = await axios.get(url)

    return data
  } catch {
    console.log(`ERROR: while trying to fetch ${url}`)
  }
}

export { fetchHtml }
