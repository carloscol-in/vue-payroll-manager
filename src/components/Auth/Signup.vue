<template>
  <div class="signup">
    <h1>Create Account</h1>

    <form class="ui form" @submit.prevent="onRegister">
      <div class="field">
        <input type="email" placeholder="example@email.com" v-model="formData.email" :class="{ 'error': formError?.email }">
      </div>
      <div class="field">
        <input type="password" placeholder="Password" v-model="formData.password" :class="{ 'error': formError?.password }">
      </div>
      <div class="field">
        <input type="password" placeholder="Repeat password" v-model="formData.password_confirm" :class="{ 'error': formError?.password_confirm }">
      </div>

      <button type="submit" class="ui button positive fluid" :class="{ loading }">Register</button>
    </form>

    <div class="extra">
      <p @click="changeForm">Go to Login</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import { auth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'Signup',
  props: {
    changeForm: Function,
  },
  setup(props) {
    const formData = {};
    const formError = ref({
      email: null,
      password: null,
      password_confirm: null,
    });
    const loading = ref(false);

    const schemaForm = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
      password_confirm: Yup.string().required(true).oneOf([Yup.ref('password')], true),
    });

    const onRegister = async () => {
      loading.value = true;
      formError.value = {};

      try {
        await schemaForm.validate(formData, { abortEarly: false });

        try {
          const { email, password } = formData;
          await createUserWithEmailAndPassword(auth, email, password);
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
      onRegister,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.signup {
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
      border-color: #faa;
      background-color:#ffeded;
    }
  }

  .extra {
    display: flex;
    justify-content: center;

    p {
      display: inline-block;
      margin: 0 auto;
      margin-top: 30px;
      align-self: center;
      color: grey;

      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }
  }
}
</style>
