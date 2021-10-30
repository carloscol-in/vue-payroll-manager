<template>
  <form action="" class="ui form change-name" @submit.prevent="onChangeName">
    <input type="text" placeholder="Name and Surname" v-model="name" :class="{ error: formError }">
    <button type="submit" class="ui button primary" :class="{ loading }">Add</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import * as Yup from 'yup';
import { updateProfile } from 'firebase/auth';

export default {
  name: 'ChangeName',
  setup() {
    const store = useStore();
    let name = ref('');
    let formError = ref(false);
    let loading = ref(false);
    let { user } = store.state;

    const schemaForm = Yup.object().shape({
      name: Yup.string().min(6, true).required(true),
    });

    const onChangeName = async () => {
      formError.value = false;
      loading.value = true;

      try {
        await schemaForm.validate({ name: name.value }, { abortEarly: false });

        try {
          await updateProfile(
            user,
            {
              displayName: name.value,
            },
          );
          store.dispatch('reloadUser');
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        err.inner.forEach((e) => {
          formError.value = e.message;
        });
      }

      loading.value = false;
    };

    return {
      name,
      onChangeName,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.form.change-name {
  text-align: center;

  input.error {
    border-color: #faa;
    background-color: #ffeded;
  }

  .ui.button {
    margin: 20px 0 0;
  }
}
</style>
