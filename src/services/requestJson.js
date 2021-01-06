import logger from './logger'

const requestJson = async (url, options = {
  method: 'GET'
}) => {
  try {
    const response = await fetch(url, options)
    const { ok, status } = response

    if (!ok) {
      logger.error(`${status}: ${url}`)
      return {}
    }

    return await response.json()
  } catch (error) {
    logger.error(error)
  }
}

export default requestJson
