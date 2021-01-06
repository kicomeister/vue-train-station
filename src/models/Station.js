import get from 'lodash.get'
import {CFF_SERVICES} from '@/constants'

const {LUGGAGE, LOUNGE, EXCHANGE} = CFF_SERVICES

const hasService = (allServices, expectedServices) => allServices.some(service => expectedServices.includes(service))

export default class Station {
  constructor (params = {}) {
    const {fields = {}, recordid} = params

    this.id = recordid
    this.name = get(fields, 'stationsbezeichnung', '')
    this.email = get(fields, 'mail', '')
    this.latitude = get(fields, 'geopos[0]', 0)
    this.longitude = get(fields, 'geopos[1]', 0)
    this.postalCode = get(fields, 'plz', '')
    this.address = get(fields, 'adresse', '')
    this.city = get(fields, 'ort', '')
    this.services = get(fields, 'service', '').split(',').map(service => service.trim())
    this.hasLuggage = hasService(this.services, LUGGAGE)
    this.hasLounge = hasService(this.services, LOUNGE)
    this.hasExchange = hasService(this.services, EXCHANGE)
  }
}
