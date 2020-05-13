<template>
  <div v-if="cars.length !== 0">
    <div class="grid md:grid-cols-2 gap-4">
      <nuxt-link class="w-full" v-bind:to="'/details/' + car.id" v-bind:key="car.id" v-for="car in cars">
        <Car v-bind:key="car.id" v-bind:car="car" v-bind:details="false"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
    import Car from './CarElement'

    export default {
        props: ["cars", "isHalf"],
        components: { Car }
    }
</script>
