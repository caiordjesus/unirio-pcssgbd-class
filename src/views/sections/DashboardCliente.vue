<template>
  <base-section id="dashboard-cliente">
    <h1>DASHBOARD CLIENTE {{ getProdutos() }}</h1>
  </base-section>
</template>

<script>
  import { getApi } from '../../network/api'
  export default {
    name: 'SectionDashboardCliente',

    data: () => ({}),
    methods: {
      async getProdutos () {
        const resp = await getApi('v1/produtos')
        console.log(resp)
        return ''
      },
    },
  }
</script>
