<template>
<div class="payroll-list">
  <h3>Payroll List</h3>
  <p v-if="payrolls?.length === 0" class="payroll-list__not-found">You have no payrolls yet.</p>
</div>

<div class="payroll-list__payroll" v-for="payroll in payrolls" :key="payroll.id">
  <p>{{ formatDate(payroll.date_string) }}</p>
  <div class="action">
    <a :href="payroll.url" target="_blank" class="ui button positive">
      Download
    </a>
    <!-- <button class="ui button red" @click="deletePayroll(payroll.id)" :class="{ loading: payrollDeleteLoading }">Delete</button> -->
    <DeleteButton :payrollDeleteLoading="payrollDeleteLoading.value" :payroll="payroll" :deletePayroll="deletePayroll" />
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import moment from 'moment';
import 'moment/locale/es-mx';
import {
  getFirestore,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import DeleteButton from './DeleteButton.vue';

export default {
  name: 'PayrollList',
  components: {
    DeleteButton,
  },
  props: {
    payrolls: Array,
    getPayrolls: Function,
  },
  setup(props) {
    const payrollDeleteLoading = ref(false);
    const formatDate = (date) => moment(date).format('MMMM [del] YYYY');
    const db = getFirestore();
    const auth = getAuth();

    const deletePayroll = async (id) => {
      // payrollDeleteLoading.value = true;

      try {
        const docRef = doc(db, auth.currentUser.uid, id);
        await deleteDoc(docRef);
        props.getPayrolls();
      } catch (error) {
        console.log(error);
      }

      // payrollDeleteLoading.value = false;
    };

    return {
      formatDate,
      deletePayroll,
      payrollDeleteLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.payroll-list {
  &__not-found {
    text-align: center;
    font-size: 20px;
  }

  &__payroll {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    p {
      margin:0;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>
