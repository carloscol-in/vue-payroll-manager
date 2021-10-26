<template>
  <form action="" class="ui form change-password">
    <div class="three fields">
      <div class="field">
        <input type="password" placeholder="Current password">
      </div>

      <div class="field">
        <input type="password" placeholder="New password">
      </div>

      <div class="field">
        <input type="password" placeholder="Confirm new password">
      </div>
    </div>

    <button class="ui button primary" type="submit">
      Update
    </button>
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
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
