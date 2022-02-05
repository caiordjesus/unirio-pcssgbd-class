<template>
  <base-section id="novo-pedido">
    <!-- container-principal -->
    <v-container>
      <span style="font-size: 60px">Novo Pedido</span>
      <hr class="solid">
      <!-- Produtos -->
      <div class="row">
        <div class="col-12">
          <h1>Produtos disponíveis</h1>
          <v-simple-table
            fixed-header
            height="300px"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Produto
                  </th>
                  <th class="text-left">
                    Valor
                  </th>
                  <th class="text-left">
                    Metrica
                  </th>
                  <th class="text-right">
                    Adicionar à cesta
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="produto in produtos"
                  :key="produto.id"
                >
                  <td>{{ produto.nome }}</td>
                  <td>{{ produto.preco_unitario }}</td>
                  <td>{{ produto.metrica }}</td>
                  <td class="text-right">
                    <v-btn
                      tile
                      color="success"
                      @click="adicionarProdutoModal(produto.id)"
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

      <!-- Meus Endereços -->
      <!-- <div class="row">
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
      </div> -->
    </v-container>

    <!-- Explorar pedido -->
    <div class="text-center">
      <v-dialog
        v-model="adicionarPedido.modal"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Adicionar: {{ adicionarPedido.nome }}
          </v-card-title>

          <v-simple-table
            fixed-header
            height="300px"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Adicionar
                  </th>
                  <th> Personalização </th>
                  <th class="text-right">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="p in adicionarPedido.personalizacoes"
                  :key="p.personalizacao.id"
                >
                  <td>
                    <v-checkbox
                      v-model="adicionarPedido.personalizacoes[p.personalizacao.id].add"
                    />
                  </td>
                  <td> {{ p.personalizacao.nome }} </td>
                  <td class="text-right">
                    {{ p.personalizacao.preco_unitario }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="adicionarPedido.modal = false"
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
      produtos: [],
      adicionarPedido: {
        modal: false,
        nome: '',
        personalizacoes: [],
      },
    }),
    created () {
      this.checkLogin()
      this.getClientId()
      this.getProdutos()
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
      async getProdutos () {
        const { data, status } = await getApi('v1/produtos')

        if (status >= 200 && status < 300) {
          this.produtos = data.data
        }
      },

      async adicionarProdutoModal (code) {
        const { data } = await getApi(`v1/produtos/${code}`)
        this.adicionarPedido.nome = data.data.nome

        const obj = {}
        data.data.produto_personalizacao.forEach(x => {
          obj[x.personalizacao.id] = { ...x, add: false }
        })
        this.adicionarPedido.personalizacoes = obj

        this.adicionarPedido.modal = true
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
