<template>
  <div class="wrapper">
    <div class="map" ref="mapRef"></div>
    <div class="text">Based on data from <img src="../assets/logo_cff.png" alt=""></div>
  </div>
</template>

<script>
import get from 'lodash.get'
import GoogleMap from '@/modules/GoogleMap'
import { MAP_API_KEY } from '@/constants'

export default {
  name: 'Map',
  props: {
    center: {
      type: Object
    },
    markers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      map: null
    }
  },
  async mounted () {
    this.initMap()
  },
  methods: {
    async initMap () {
      this.map = new GoogleMap({
        apiKey: MAP_API_KEY,
        center: get(this.markers, '[0].position'),
        markers: this.markers,
        mapElement: this.$refs.mapRef,
        mapEvents: {
          center_changed: this.onCenterChanged
        },
        onMarkerClick: this.onMarkerClick
      })
      await this.map.init()
    },
    onCenterChanged () {
      const {lat, lng} = this.map.map.getCenter()
      this.$emit('centerChanged', {lat: lat(), lng: lng()})
    },
    onMarkerClick (id) {
      this.$emit('markerClick', id)
    }
  },
  watch: {
    center: function () {
      this.map.setPosition(this.center)
      this.map.setZoom(12)
      window.scrollTo({top: this.$refs.mapRef.offsetTop})
    },
    markers: function () {
      this.map.reload({ center: get(this.markers, '[0].position'), markers: this.markers })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    margin-bottom: 60px;
  }

  .map {
    width: 100%;
    height: 440px;
    margin-bottom: 20px;
  }

  .text {
    text-align: right;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  img {
    height: 13px;
    display: block;
    margin-left: 13px;
  }
</style>
