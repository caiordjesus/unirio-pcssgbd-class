<template>
  <base-section id="dashboard-cliente">
    <!-- container-principal -->
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
              :to="'novoPedido'"
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
                    {{ new Date(pedido.date).toLocaleDateString('pt-BR') }}
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
                    Inicio
                  </th>
                  <th class="text-left">
                    Fim
                  </th>
                  <th class="text-right">
                    Intervalo
                  </th>
                  <th class="text-right">
                    Pedido Referencia
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="assinatura in assinaturas"
                  :key="assinatura.fk_recorrencia_id"
                >
                  <td>{{ new Date(assinatura.recorrencia.data_inicio).toLocaleDateString('pt-BR') }}</td>
                  <td>{{ assinatura.recorrencia.data_fim || '-' }}</td>
                  <td class="text-right">
                    {{ assinatura.recorrencia.intervalo_dias }} dias
                  </td>
                  <td class="text-right">
                    <v-btn
                      tile
                      color="success"
                      @click="explorarPedido(assinatura.fk_pedido_id)"
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
    </v-container>

    <!-- Explorar pedido -->
    <div class="text-center">
      <v-dialog
        v-model="explorar_pedido.modal"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Explorar pedido: {{ explorar_pedido.code }}
          </v-card-title>

          <v-simple-table
            fixed-header
            height="300px"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Item
                  </th>
                  <th class="text-right">
                    Qtd
                  </th>
                  <th class="text-right">
                    Valor Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in explorar_pedido.items"
                  :key="item.item"
                >
                  <td>{{ item.item }}</td>
                  <td class="text-right">
                    {{ item.qtd }}
                  </td>
                  <td class="text-right">
                    {{ item.totalValue }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-container>
            <div class="text-right">
              <h3>Entrega: {{ explorar_pedido.frete }}</h3>
              <h3>Valor total: {{ explorar_pedido.valor_total }}</h3>
            </div>
          </v-container>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="explorar_pedido.modal = false"
            >
              Pedir de novo
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </base-section>
</template>

<script>
  import { getApi } from '../../network/api'
  export default {
    name: 'SectionDashboardCliente',

    data: () => ({
      pedidos: [],
      enderecos: [],
      explorar_pedido: {
        modal: false,
        code: '',
        items: [],
        frete: 0,
        valor_total: 0,
      },
      id_cliente: 0,
      assinaturas: [],
    }),
    created () {
      this.checkLogin()
      this.getClientId()
      this.getPedidos()
      this.getEnderecos()
      this.getAssinaturas()
    },
    methods: {
      getClientId () {
        this.id_cliente = this.$store.state.id_cliente
      },
      checkLogin () {
        if (!this.$store.state.logged) {
          this.$router.push('/')
        }
      },
      async getPedidos () {
        const { data, status } = await getApi(`v1/cliente/${this.id_cliente}/pedidos`)

        if (status >= 200 && status < 300) {
          this.pedidos = data.pedidos
        }
      },
      async getEnderecos () {
        const { data, status } = await getApi(`v1/cliente/${this.id_cliente}/enderecos`)

        if (status >= 200 && status < 300) {
          this.enderecos = data.data
        }
      },
      async getAssinaturas () {
        const { data, status } = await getApi(`v1/cliente/${this.id_cliente}/assinaturas`)
        console.log(data)

        if (status >= 200 && status < 300) {
          this.assinaturas = data.data
        }
      },
      async explorarPedido (code) {
        const { data } = await getApi(`v1/pedidos/${code}`)
        this.explorar_pedido.code = data.order.id
        this.explorar_pedido.frete = data.order.frete
        this.explorar_pedido.valor_total = data.order.preco_total
        this.explorar_pedido.items = data.details
        this.explorar_pedido.modal = true
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
