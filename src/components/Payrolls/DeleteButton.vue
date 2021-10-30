<template>
  <button class="ui button red" @click="deletePayrollDoc(payroll.id)" :class="{ loading }">Delete</button>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DeleteButton',
  props: {
    payrollDeleteLoading: Boolean,
    deletePayroll: Function,
    payroll: Object,
  },
  setup(props) {
    let loading = ref(false);

    const deletePayrollDoc = async (id) => {
      loading.value = true;

      await props.deletePayroll(id);

      loading.value = false;
    };

    return {
      deletePayrollDoc,
      loading,
    };
  },
};
</script>

<style>

</style>
