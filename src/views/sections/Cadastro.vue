<template>
  <base-section id="cadastro">
    <v-form
      ref="form"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="nome"
              label="Nome"
              :rules="[rules.required]"
              placeholder="ex: José das Couves"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="usuario"
              label="E-mail"
              placeholder="ex: usuario@email.com"
              :rules="[rules.email, rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="cpf"
              label="CPF"
              :rules="[rules.required]"
              placeholder="ex: 111.111.111-11"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="telefone"
              label="Telefone"
              placeholder="ex: (21) 3333-3333"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="celular"
              label="Celular"
              :rules="[rules.required]"
              placeholder="ex: (21) 99999-9999"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="senha"
              label="Senha"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              placeholder="Digite sua senha"
              :rules="[rules.required]"
              @click:append="show1 = !show1"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="senhaConfirmada"
              label="Confirmar Senha"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              placeholder="Digite sua senha novamente"
              :rules="[rules.required, passwordConfirmationRule]"
              @click:append="show1 = !show1"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="warning"
              @click.native="cadastrar"
            >
              Cadastrar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </base-section>
</template>

<script>
  import { postApi } from '../../network/api'

  export default {
    name: 'SectionCadastro',

    data: () => ({
      nome: '',
      cpf: '',
      telefone: '',
      celular: '',
      usuario: '',
      senha: '',
      senhaConfirmada: '',
      show1: false,
      rules: {
        required: value => !!value || 'Campo Obrigatório',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail inválido'
        },
      },
      mailMessage: '',
    }),
    computed: {
      passwordConfirmationRule () {
        return () => (this.senha === this.senhaConfirmada) || 'Senha não correspondentes'
      },
    },
    methods: {
      validate () {
        return this.$refs.form.validate()
      },
      async cadastrar () {
        console.log('estou conectando à API e cadastrando')
        if (this.validate()) {
          const { status, data } = await postApi('/v1/auth/signup', {
            nome: this.nome,
            pass: this.senha,
            usuario: this.usuario,
            cpf: this.cpf,
            telefone: this.telefone,
            celular: this.celular,
            senha: this.senha,
          })

          if (status >= '200' && status < 300) {
            localStorage.setItem('token', data.data.token)
            this.$store.commit('login')
            this.$router.push('DashboardCliente')
          }
        }
      },
    },
  }
</script>
