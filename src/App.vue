<template>
  <div v-if="user">
    <router-view/>
  </div>

  <Auth v-if="!user && user !== undefined" />
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import Auth from './views/Auth.vue';

export default {
  name: 'App',
  components: {
    Auth,
  },
  setup() {
    const auth = getAuth();
    const store = useStore();
    const user = computed(() => store.state.user);

    onMounted(() => {
      auth.onAuthStateChanged((u) => {
        store.commit('setUser', u);
      });
    });

    return {
      user,
    };
  },
};
</script>

<style lang="scss">

</style>
