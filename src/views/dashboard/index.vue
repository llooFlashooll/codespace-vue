<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
// 可以选择多个用户
// import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
import userDashboard from './user'

export default {
  name: 'Dashboard',
  components: { userDashboard },
  data() {
    return {
      currentRole: 'userDashboard'
    }
  },
  computed: {

  },
  created() {

  }
}
</script>
