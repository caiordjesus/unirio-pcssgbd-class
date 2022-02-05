<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Cadastro',

    metaInfo: { title: 'Cadastro de Usuário' },

    extends: View,

    mixins: [
      LoadSections(['cadastro']),
    ],

    props: {
      id: {
        type: String,
        default: 'pro',
      },
    },
  }
</script>
