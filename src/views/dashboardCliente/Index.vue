<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Login',

    metaInfo: { title: 'Kipao' },

    extends: View,

    mixins: [
      LoadSections(['dashboard-cliente']),
    ],

    props: {
      id: {
        type: String,
        default: 'pro',
      },
    },
  }
</script>
