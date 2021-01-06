<template>
  <div class="station" :class="{active: active}" @click="$emit('click', station)">
    <div v-if="active" class="active-text">
      NEAREST STATION
    </div>
    <div class="row">
      <h2>{{ station.name }}</h2>
      <div class="services">
        <div class="service">
          <img v-if="station.hasLuggage" src="../assets/luggage.svg" alt="" />
        </div>
        <div class="service">
          <img v-if="station.hasLounge" src="../assets/lounge.svg" alt="" />
        </div>
        <div class="service">
          <img v-if="station.hasExchange" src="../assets/money.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="row">
      <p>{{ address }}</p>
      <a :href="`mailto:${station.email}`">{{ station.email }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Station',
  props: {
    active: {
      type: Boolean
    },
    address: {
      type: String
    },
    station: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .station {
    background: var(--light);
    border: 1px solid var(--grey2);
    box-shadow: 0px 3px 12px #0000000D;
    margin: 0 0 24px;
    padding: 40px;
    cursor: pointer;
  }

  .active {
    background: var(--action2light);
    border: 1px solid var(--action2);
    position: relative;
  }

  .active-text {
    position: absolute;
    left: -10px;
    top: 10px;
    background: var(--action);
    color: var(--light);
    font-size: 13px;
    font-weight: 900;
    line-height: 26px;
    text-align: center;
    text-transform: uppercase;
    width: 198px;
  }

  .active-text:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 0;
    border-color: transparent var(--action3) transparent transparent;
  }

  h2, h3 {
    margin: 0;
  }

  h2 {
    font-size: 34px;
    line-height: 40px;
    font-weight: 800;
  }

  p, a {
    color: var(--dark3);
    font-weight: 500;
  }

  p {
    font-size: 22px;
    line-height: 26px;
    margin: 0;
  }

  a {
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .row:not(:last-of-type) {
    margin-bottom: 10px;
  }

  .services {
    display: flex;
    align-items: center;
  }

  .service {
    width: 34px;
    height: 34px;
  }

  img {
    width: 100%;
    height: 100%;
  }

</style>
