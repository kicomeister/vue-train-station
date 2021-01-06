import { getAllStations } from '@/services/cff'

export default {
  state: () => ({
    stations: []
  }),
  mutations: {
    setStations (state, stations) {
      state.stations = stations
    }
  },
  actions: {
    async fetchAllStations (ctx) {
      const stations = await getAllStations()
      ctx.commit('setStations', stations)
    }
  }
}
