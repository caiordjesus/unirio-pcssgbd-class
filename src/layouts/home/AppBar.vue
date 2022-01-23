<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      elevation="1"
      elevate-on-scroll
      height="80"
    >
      <base-img
        :src="require('@/assets/kipao.png')"
        class="mr-3 hidden-xs-only"
        contain
        max-width="46"
        width="100%"
      />

      <v-spacer />

      <div v-if="!logged">
        <v-tabs
          class="hidden-sm-and-down"
          optional
          background-color="transparent"
        >
          <v-tab
            v-for="(name, i) in items"
            :key="i"
            :to="{ name }"
            :exact="name === 'Home'"
            :ripple="false"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      </div>
      <div v-else>
        <v-tabs
          class="hidden-sm-and-down"
          optional
          background-color="transparent"
        >
          <v-tab
            v-for="(name, i) in whenLogged"
            :key="i"
            :ripple="true"
            class="font-weight-bold"
            min-width="96"
            text
            @click="logout()"
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      />
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'HomeAppBar',

    data: () => ({
      drawer: null,
      items: [
        'Home',
        'Login',
      ],
      whenLogged: [
        'Sair',
      ],
    }),
    computed: {
      logged () {
        return this.$store.state.logged
      },
    },
    watch: {
      logged (newVal, oldVal) {
        console.log(`Alternando estado de login. Antes: ${oldVal}, agora: ${newVal}`)
      },
    },
    methods: {
      logout () {
        localStorage.clear()
        this.$store.commit('logout')
        this.$router.push('/')
      },
    },

  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
