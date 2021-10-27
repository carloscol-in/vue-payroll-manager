<template>
  <form action="" class="ui form change-password" @submit.prevent="onChangePassword">
    <div class="three fields">
      <div class="field">
        <input type="password" placeholder="Current password" v-model="formData.password" :class="{ error: formError.password }">
      </div>

      <div class="field">
        <input type="password" placeholder="New password" v-model="formData.new_password" :class="{ error: formError.new_password }">
      </div>

      <div class="field">
        <input type="password" placeholder="Confirm new password" v-model="formData.confirm_new_password" :class="{ error: formError.confirm_new_password }">
      </div>
    </div>

    <p v-if="messageError">{{ messageError }}</p>

    <button class="ui button primary" type="submit" :class="{ loading }">
      Update
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import { auth, updatePassword } from '../../utils/firebase';
import { reauthenticate } from '../../utils/firebase-functions';

export default {
  name: 'ChangePassword',
  setup() {
    let formData = {};
    let formError = ref({});
    let loading = ref(false);
    let messageError = ref('');

    const schemaForm = Yup.object().shape({
      password: Yup.string().required(true),
      new_password: Yup.string().required(true),
      confirm_new_password: Yup.string().required(true).oneOf([Yup.ref('new_password')], true),
    });

    const onChangePassword = async () => {
      formError.value = {};
      messageError.value = '';
      loading.value = true;

      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          const {
            password,
            new_password,
          } = formData;
          await reauthenticate(password);
          await updatePassword(auth.currentUser, new_password);
          auth.signOut();
        } catch (error) {
          messageError.value = error.code;
        }
      } catch (error) {
        error.inner.forEach((e) => {
          formError.value[e.path] = e.code;
        });
      }

      loading.value = false;
    };

    return {
      formData,
      onChangePassword,
      formError,
      loading,
      messageError,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.form.change-password {
  text-align: center;

  input.error {
    color: #faa;
    background-color: #ffeded;
  }

  .ui.button {
    margin: 20px 0 0 0;
  }
}
</style>
