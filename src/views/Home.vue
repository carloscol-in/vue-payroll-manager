<template>
  <div class="home">
    <h1>at home</h1>
    <button @click="logout">Sign Out</button>
  </div>
</template>

<script>
import { auth } from '../utils/firebase';

export default {
  name: 'Home',
  setup() {
    const logout = () => {
      auth.signOut();
    };

    return {
      logout,
    };
  },
};
</script>
