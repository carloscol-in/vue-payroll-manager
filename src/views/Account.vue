<template>
  <BasicLayout>
    <h1>Welcome to Account Settings</h1>

    <div class="account__section">
      <p class="title">
        <span v-if="!user.displayName">Add name</span>
        <span v-if="user.displayName">Change name ({{ user.displayName }})</span>
      </p>
      <ChangeName/>
    </div>

    <div class="account__section">
      <p class="title">
        Change Email (<span>{{ user.email }}</span>)
      </p>
      <ChangeEmail/>
    </div>

    <div class="account__section">
      <p class="title">
        Change Password (<span>{{ user.email }}</span>)
      </p>
      <ChangePassword/>
    </div>
  </BasicLayout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BasicLayout from '../layouts/BasicLayout.vue';
import ChangeName from '../components/Account/ChangeName.vue';
import ChangeEmail from '../components/Account/ChangeEmail.vue';
import ChangePassword from '../components/Account/ChangePassword.vue';

export default {
  name: 'Account',
  components: {
    BasicLayout,
    ChangeName,
    ChangeEmail,
    ChangePassword,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.account {
  h1 {
    margin: 50px 0;
    text-align: center;
  }

  &__section {
    position: relative;
    padding: 10px;
    border: 1px solid #16212b;
    padding-top: 25px;
    margin-top: 40px;

    .title {
      position: absolute;
      top: -12px;
      background-color: #16212b;
      color: #fff;
      padding: 2px 10px;
    }
  }
}
</style>
