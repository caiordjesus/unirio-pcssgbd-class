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

      <!-- Cesta -->
      <div class="row">
        <div class="col-12">
          <h1> Cesta </h1>
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
                    Quantidade
                  </th>
                  <th class="text-left">
                    Valor total
                  </th>
                  <th class="text-left">
                    Personalizações
                  </th>
                  <th class="text-left">
                    Remover
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in cesta"
                  :key="item.id"
                >
                  <td>{{ item.nome }}</td>
                  <td>{{ item.qtd }}</td>
                  <td>{{ item.vl_total }}</td>
                  <td>{{ item.personalizacoes }}</td>
                  <td class="text-right">
                    <v-btn
                      tile
                      color="error"
                      @click="removerDaCesta(item.id)"
                    >
                      Remover
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>

      <hr class="solid">

      <div class="text-right">
        <span style="font-size: 36px; font-weight: bold">Valor total: {{ valor_total }}</span>
        <p />
        <v-btn
          tile
          color="success"
          :disabled="valor_total == 0"
          @click="finalizarPedido()"
        >
          Finalizar pedido
        </v-btn>
      </div>
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
            <v-text-field
              v-model="adicionarPedido.qtd"
              label="Quantidade"
              outlined
            />
            <v-btn
              color="primary"
              text
              @click="adicionarProdutoACesta()"
            >
              Adicionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Finalizar Pedido -->
    <v-dialog
      v-model="finalizarPedidoModal.modal"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Finalizar Pedido
        </v-card-title>

        <v-data-table
          v-model="endereco_selecionado"
          hide-default-footer
          :headers="enderecosHeaders"
          :items="enderecos"
          :single-select="true"
          item-key="name"
          show-select
          class="elevation-1"
        />

        <hr class="solid">

        <v-data-table
          v-model="formasPagamentoSelecionado"
          hide-default-footer
          :headers="formasParamentoHeaders"
          :items="formasPagamento"
          :single-select="true"
          item-key="nome"
          show-select
          class="elevation-1"
        />

        <hr class="solid">
        <v-container>
          <v-text-field
            v-model="observacao"
            label="OBS"
            outlined
          />
        </v-container>

        <v-card-actions>
          <div class="text-right">
            <span style="font-size: 36px; font-weight: bold">Valor total: {{ valor_total }}</span>
            <p />
          </div>
          <v-spacer />
          <v-btn
            color="primary"
            text
            :disabled="endereco_selecionado.length == 0 || formasPagamentoSelecionado.length == 0"
            @click="confirmarPedido()"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </base-section>
</template>

<script>
  import { getApi, postApi } from '../../network/api'
  export default {
    name: 'SectionDashboardCliente',

    data: () => ({
      produtos: [],
      enderecos: [],
      enderecosHeaders: [
        { text: 'Cep', value: 'cep' },
        { text: 'Logradouro', value: 'logradouro' },
        { text: 'Número', value: 'numero' },
        { text: 'Complemento', value: 'complemento' },
      ],
      endereco_selecionado: [],
      formasPagamento: [],
      formasParamentoHeaders: [
        { text: 'Forma de Pagamento', value: 'nome' },
      ],
      formasPagamentoSelecionado: [],
      adicionarPedido: {
        code: 0,
        modal: false,
        nome: '',
        personalizacoes: [],
        qtd: 1,
      },
      finalizarPedidoModal: {
        modal: false,
      },
      cesta: [],
      valor_total: 0,
      id_cliente: 0,
      observacao: '',
    }),
    created () {
      this.checkLogin()
      this.getClientId()
      this.getProdutos()
      this.getEnderecos()
      this.getFormasPagamento()
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

      async getFormasPagamento () {
        const { data, status } = await getApi('v1/metodo_pagamento')
        console.log(data)

        if (status >= 200 && status < 300) {
          this.formasPagamento = data.data
        }
      },

      async adicionarProdutoModal (code) {
        this.adicionarPedido.code = code
        const { data } = await getApi(`v1/produtos/${code}`)
        this.adicionarPedido.nome = data.data.nome

        const obj = {}
        data.data.produto_personalizacao.forEach(x => {
          obj[x.personalizacao.id] = { ...x, add: false }
        })
        this.adicionarPedido.personalizacoes = obj

        this.adicionarPedido.modal = true
      },

      async adicionarProdutoACesta () {
        const produto = this.produtos.find(x => parseInt(x.id) === parseInt(this.adicionarPedido.code))
        const personalizacoesSelecionadas = []

        Object.entries(this.adicionarPedido.personalizacoes).forEach(([_, value]) => {
          if (value.add) personalizacoesSelecionadas.push(value)
        })

        const vlUnitario = parseFloat(produto.preco_unitario) + personalizacoesSelecionadas.reduce((prev, act) => prev + parseFloat(act.personalizacao.preco_unitario), 0)
        const vlTotal = vlUnitario * this.adicionarPedido.qtd

        this.cesta.push({
          id: this.cesta.length,
          nome: this.adicionarPedido.nome,
          qtd: this.adicionarPedido.qtd,
          vl_total: vlTotal,
          personalizacoes: personalizacoesSelecionadas.length > 0 ? personalizacoesSelecionadas.map(x => x.personalizacao.nome).join(',') : '-',
          personalizacoesIds: personalizacoesSelecionadas.map(x => x.personalizacao.id),
          preco_unitario: produto.preco_unitario,
          produtoId: produto.id,
        })
        this.attValorTotal()
        this.resetAdicionarPedido()
      },
      resetAdicionarPedido () {
        this.adicionarPedido = {
          code: 0,
          modal: false,
          nome: '',
          personalizacoes: [],
          qtd: 1,
        }
      },
      removerDaCesta (id) {
        const indexToDelete = this.cesta.findIndex(x => x.id === id)
        delete this.cesta[indexToDelete]
        this.cesta = this.cesta.filter(x => x.id)
        this.attValorTotal()
      },

      attValorTotal () {
        this.valor_total = this.cesta.reduce((a, b) => a + b.vl_total, 0)
      },

      finalizarPedido () {
        this.finalizarPedidoModal.modal = true
      },

      async confirmarPedido () {
        const postObj = {
          clientId: this.id_cliente,
          formaPagamentoId: this.formasPagamentoSelecionado[0].id,
          frete: 5,
          observacao: this.observacao,
          preco_total: this.valor_total,
          item: this.cesta,
        }
        const { status } = await postApi('/v1/produtos', postObj)
        if (status >= 200 && status <= 299) {
          // TODO: Chamar sweet alert
          console.log('dale familia')
        } else {
          console.log('não dale familia')
        }
      },

      async getEnderecos () {
        const { data, status } = await getApi(`v1/cliente/${this.id_cliente}/enderecos`)

        if (status >= 200 && status < 300) {
          this.enderecos = data.data
        }
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
