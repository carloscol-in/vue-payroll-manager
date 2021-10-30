<template>
  <div class="ui secondary menu">
    <div class="ui container">
      <div class="menu left">
        <router-link class="item" to="/">Nominas</router-link>
      </div>

      <router-link class="menu center" to="/">
        <img src="@/assets/nomina.png" alt="" srcset="" class="ui small image">
      </router-link>

      <div class="menu right">
        <router-link class="item" to="/account">
          Hola, {{ user.displayName || user.email }}
        </router-link>

        <span class="ui item logout">
          <i class="sign-out icon" @click="logout"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getAuth } from 'firebase/auth';

export default {
  name: 'Menu',
  setup() {
    const store = useStore();
    const auth = getAuth();
    const user = computed(() => store.state.user);

    const logout = () => auth.signOut();

    return {
      user,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
  background-color: #16202b;

  .item {
    color: #fff;

    &:hover {
      color: #43cf43;
    }
  }

  .menu.left {
    width: 50%;
  }

  .menu.right {
    width: 50%;
    justify-content: flex-end;

    .logout:hover {
      cursor: pointer;
      i {
        color: #f00;
      }
    }
  }

  .menu.center {
    background-color: #16212b;
    position: relative;
    padding: 5px;
    transition: all 0.5s ease;

    &:hover {
      box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);

      .ui.image {
        transform: scale(1.1);
      }
    }

    .ui.image {
      width: 30px;
      transition: all 0.5s ease;
    }
  }
}
</style>
