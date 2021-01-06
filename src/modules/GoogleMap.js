import GoogleMapsApiLoader from 'google-maps-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'

export default class GoogleMap {
  constructor ({ apiKey, center, mapElement, markers, mapEvents, onMarkerClick } = {}) {
    this.googleMap = null
    this.map = null
    this.apiKey = apiKey
    this.mapElement = mapElement
    this.center = center || { lat: 0, lng: 0 }
    this.markers = markers || []
    this.gMarkers = []
    this.mapEvents = mapEvents || {}
    this.onMarkerClick = onMarkerClick
  }

  loadMap = async () => {
    if (!this.apiKey) {
      throw new Error('Missing Google Maps API Key!')
    }

    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })

    this.googleMap = googleMapApi
  }

  init = async () => {
    if (!this.googleMap) {
      await this.loadMap()
    }

    this.map = new this.googleMap.maps.Map(this.mapElement, {
      zoom: 8,
      center: this.center
    })

    this.setEvents()
    this.setMarkers()
    this.setMarkerEvents()
    this.setMarkerClaster()
  }

  setEvents = () => {
    Object.entries(this.mapEvents).forEach(([event, handler]) => {
      this.map.addListener(event, handler)
    })
  }

  setMarkers = () => {
    this.gMarkers = this.markers.map(({ title, position }) => {
      return new this.googleMap.maps.Marker({
        title,
        position
      })
    })
  }

  setMarkerEvents = () => {
    this.gMarkers.map(marker => {
      marker.addListener('click', () => {
        if (this.map.getZoom() < 10) {
          this.map.setZoom(10)
        }

        this.map.setCenter(marker.getPosition())

        if (this.onMarkerClick) {
          this.onMarkerClick(marker.title)
        }
      })
    })
  }

  setMarkerClaster = () => {
    this.cluster = new MarkerClusterer(this.map, this.gMarkers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    })
  }

  setPosition = (position) => {
    this.map.panTo(position)
  }

  setZoom = (zoom) => {
    this.map.setZoom(zoom)
  }

  reload = ({ center, markers }) => {
    this.center = center
    this.markers = markers
    this.init()
  }
}
