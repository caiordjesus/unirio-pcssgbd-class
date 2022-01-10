<template>
  <base-section id="login">
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              label="E-mail"
              placeholder="ex: usuario@email.com"
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
              label="Senha"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              placeholder="Digite sua senha"
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
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionLogin',

    data: () => ({
      usuario: '',
      senha: '',
      show1: false,
    }),
    methods: {
      async login () {
        console.log('estou conectando à API e logando')
      },
    },
  }
</script>
