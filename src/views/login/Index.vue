<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Login',

    metaInfo: { title: 'Pro Features' },

    extends: View,

    mixins: [
      LoadSections(['login']),
    ],

    props: {
      id: {
        type: String,
        default: 'pro',
      },
    },
  }
</script>
