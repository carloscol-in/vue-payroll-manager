<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>My Payrolls</h1>
      <UploadPayroll/>
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout.vue';
import UploadPayroll from '../components/Payrolls/UploadPayroll.vue';

export default {
  components: {
    BasicLayout,
    UploadPayroll,
  },
};
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>
