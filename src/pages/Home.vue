<template>
  <div class="home">
    <Page
      title="Explore swiss railway stations"
      description="An interactive map that let you explore the dense network of railway stations in Switzerland"
    >
      <template v-slot:content>
        <Map
          :center="stationCenter"
          :markers="markers"
          @centerChanged="onCenterChanged"
          @markerClicked="onMarkerClicked"
        />
        <Station
          v-for="(station, index) in stations"
          :active="index === 0"
          :key="station.id"
          :address="getAddress(station)"
          :station="station"
          @click="onStationClick"
        />
      </template>
    </Page>
  </div>
</template>

<script>
import Page from '@/components/Page'
import Station from '@/components/Station'
import Map from '@/components/Map'
import sortByDistance from 'sort-by-distance'

export default {
  name: 'Home',
  created () {
    this.fetchAllStations()
  },
  components: {
    Map,
    Page,
    Station
  },
  data () {
    return {
      center: null,
      selectedStation: null
    }
  },
  computed: {
    markers () {
      return this.$store.state.cff.stations.map(
        ({ id, latitude, longitude }) => ({
          position: {
            lat: latitude,
            lng: longitude
          },
          title: id
        })
      )
    },
    stations () {
      // limit the visible station cards because of render issues
      return (this.center
        ? sortByDistance(this.center, this.$store.state.cff.stations, {
          yName: 'latitude',
          xName: 'longitude'
        })
        : this.$store.state.cff.stations).slice(0, 50)
    },
    stationCenter () {
      return this.selectedStation
        ? { lat: this.selectedStation.latitude, lng: this.selectedStation.longitude }
        : null
    }
  },
  methods: {
    fetchAllStations () {
      this.$store.dispatch('fetchAllStations')
    },
    getAddress ({ address, city, postalCode } = {}) {
      return `${address}, ${postalCode} ${city}`
    },
    onCenterChanged (center) {
      this.center = { latitude: center.lat, longitude: center.lng }
    },
    onMarkerClicked (id) {
      const station = this.$store.state.cff.stations.find(({id: stationId}) => id === stationId)
      this.onStationClick(station)
    },
    onStationClick (station) {
      const { latitude, longitude } = station
      this.center = { latitude, longitude }
      this.selectedStation = station
    }
  }
}
</script>

<style scoped>
</style>
