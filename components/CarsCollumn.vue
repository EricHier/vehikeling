<template>
  <div v-if="cars.length !== 0" class="column" >
    <div class="columns is-multiline">
      <div class="column car is-full" v-bind:key="car.id" v-for="car in cars">
        <nuxt-link v-bind:to="'/details/' + car.id">
          <Car v-bind:key="car.id" v-bind:car="car" v-bind:details="false"/>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
    import Car from '../components/Car'

    export default {
        name: "CarsCollumn",
        props: ["cars", "isHalf"],
        components: { Car }
    }
</script>
