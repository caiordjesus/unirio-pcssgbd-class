<template>
  <base-section id="dashboard-cliente">
    <v-container>
      <!-- Meus pedidos -->
      <div class="row">
        <div class="col-12">
          <h1>
            Meus pedidos
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </h1>
          <v-simple-table
            fixed-header
            height="300px"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Pedido
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-center">
                    Data
                  </th>
                  <th class="text-right">
                    Explorar
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="pedido in pedidos"
                  :key="pedido.code"
                >
                  <td>{{ pedido.code }}</td>
                  <td>{{ pedido.status }}</td>
                  <td class="text-center">
                    {{ pedido.date }}
                  </td>
                  <td class="text-right">
                    <v-btn
                      tile
                      color="success"
                      @click="explorarPedido(pedido.code)"
                    >
                      Ver
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      <hr class="solid">
      <!-- Meus Endereços -->
      <div class="row">
        <div class="col-12">
          <h1>
            Meus endereços
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </h1>
          <v-simple-table
            fixed-header
            height="300px"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Cep
                  </th>
                  <th class="text-left">
                    Logradouro
                  </th>
                  <th class="text-left">
                    Número
                  </th>
                  <th class="text-left">
                    Complemento
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="endereco in enderecos"
                  :key="endereco.cep"
                >
                  <td>{{ endereco.cep }}</td>
                  <td>{{ endereco.logradouro }}</td>
                  <td>{{ endereco.numero }}</td>
                  <td>{{ endereco.complemento }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      <hr class="solid">
      <!-- Minhas Assinaturas -->
      <div class="row">
        <div class="col-12">
          <h1>Minhas Assinaturas</h1>
          <v-simple-table
            fixed-header
            height="300px"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Pedido
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-center">
                    Data
                  </th>
                  <th class="text-right">
                    Explorar
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in pedidos"
                  :key="item.name"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      <hr class="solid">
    </v-container>
    <template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Click Me
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  </base-section>
</template>

<script>
  import { getApi } from '../../network/api'
  export default {
    name: 'SectionDashboardCliente',

    data: () => ({
      pedidos: [],
      enderecos: [],
    }),
    created () {
      this.checkLogin()
      this.getPedidos()
      this.getEnderecos()
    },
    methods: {
      checkLogin () {
        if (!this.$store.state.logged) {
          this.$router.push('/')
        }
      },
      async getPedidos () {
        const { data, status } = await getApi('v1/pedidos')

        if (status >= 200 && status < 300) {
          this.pedidos = data.data.pedidos
        }
      },
      async getEnderecos () {
        const { data, status } = await getApi('v1/cliente/1/enderecos')
        console.log(data.data.enderecos)
        if (status >= 200 && status < 300) {
          this.enderecos = data.data.enderecos
        }
      },
      async explorarPedido (code) {
        // TODO: chamar modal
        console.log('Explorando pedido')
        return true
      },
    },
  }
</script>

<style scoped>
hr.solid {
  border-top: 3px solid #bbb;
  margin-bottom: 3em;
}
</style>
