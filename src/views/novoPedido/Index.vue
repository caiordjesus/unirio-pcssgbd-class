<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'NovoPedido',

    metaInfo: { title: 'Kipao' },

    extends: View,

    mixins: [
      LoadSections(['novo-pedido']),
    ],
  }
</script>
