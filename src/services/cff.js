import get from 'lodash.get'
import uniqby from 'lodash.uniqby'
import requestJson from './requestJson'
import {API_URLS} from '@/constants'
import Station from '@/models/Station'

const START = 0
const ROWS = 100

let cacheStationNumber

const mapStationsToModel = stations => stations.map((station) => new Station(station))

export const getStations = async (start = START, rows = ROWS) => {
  const stations = await requestJson(`${API_URLS.CFF}/records/1.0/search/?dataset=kontaktadressen&facet=service&rows=${rows}&start=${start}`)
  cacheStationNumber = Number.parseInt(stations.nhits || 0)

  return mapStationsToModel(get(stations, 'records', []))
}

export const getAllStations = async () => {
  const stations = await getStations()
  const pages = Math.round(cacheStationNumber / ROWS) - 1
  const restStations = pages ? await Promise.all(
    (new Array(pages))
      .fill(true)
      .map(async (_, idx) => {
        const mapStations = await getStations(idx + 1 * ROWS)
        return mapStations
      })) : []

  const stationModels = restStations.reduce((acc, station) => station ? [...acc, ...station] : acc, stations)
  return uniqby(stationModels, 'id')
}
