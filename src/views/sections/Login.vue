<template>
  <base-section id="login">
    <v-form
      ref="form"
      lazy-validation
    >
      <v-container>
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
          <v-col>
            <v-btn
              color="warning"
              @click="login"
            >
              Login
            </v-btn>

            <v-btn
              color="blue"
              style="margin-left: 10px"
              to="/cadastro"
            >
              Cadastro
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
    name: 'SectionLogin',

    data: () => ({
      usuario: '',
      senha: '',
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
    methods: {
      validate () {
        return this.$refs.form.validate()
      },
      async login () {
        console.log('estou conectando à API e logando')
        if (this.validate()) {
          const { status, data } = await postApi('/v1/auth/login', {
            user: this.usuario,
            pass: this.senha,
          })

          if (status >= '200' && status < 300) {
            this.$store.commit('login')
            localStorage.setItem('token', data.data.token)
            if (data.data.id_cliente) {
              localStorage.setItem('id_cliente', data.data.id_cliente)
              this.$router.push('DashboardCliente')
            } else {
              localStorage.setItem('id_funcionario', data.data.id_funcionario)
            }
          }
        }
      },
    },
  }
</script>
