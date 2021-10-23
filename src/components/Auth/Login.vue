<template>
  <div class="login">
    <h1>Login</h1>

    <form class="ui form" @submit.prevent="onLogin">
      <div class="field">
        <input type="text" placeholder="Email" v-model="formData.email" :class="{ error: formError.email }">
      </div>
      <div class="field">
        <input type="password" placeholder="Password" v-model="formData.password" :class="{ error: formError.password }">
      </div>
      <button type="submit" class="ui button positive fluid" :class="{ loading }">
        Login
      </button>
    </form>
    <p @click="changeForm">Create new account</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import { auth, signInWithEmailAndPassword } from '../../utils/firebase';

export default {
  name: 'Login',
  props: {
    changeForm: Function,
  },
  setup(props) {
    const formData = {};
    const formError = ref({});
    const loading = ref(false);

    const schemaForm = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    });

    const onLogin = async () => {
      loading.value = true;
      formError.value = {};
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          const { email, password } = formData;
          signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
      loading.value = false;
    };
    return {
      formData,
      onLogin,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 38px -5px rgba(0, 0, 0, 0.45);
  width: 400px;
  border-radius: 10px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  form {
    input.error {
      background-color: #faa;
      background-color: #ffeded;
    }
  }

  p {
    text-align: center;
    margin-top: 30px;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
