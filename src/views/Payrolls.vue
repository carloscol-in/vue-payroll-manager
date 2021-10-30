<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>My Payrolls</h1>
      <UploadPayroll :getPayrolls="getPayrolls" />
      <PayrollList :payrolls="payrolls" :getPayrolls="getPayrolls" />
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
  getFirestore, collection, orderBy, query, getDocs,
} from 'firebase/firestore';
import { auth } from '../utils/firebase';
import BasicLayout from '../layouts/BasicLayout.vue';
import UploadPayroll from '../components/Payrolls/UploadPayroll.vue';

import PayrollList from '../components/Payrolls/PayrollList.vue';

export default {
  components: {
    BasicLayout,
    UploadPayroll,
    PayrollList,
  },
  setup() {
    const payrolls = ref(null);
    const db = getFirestore();
    const userId = auth.currentUser.uid;

    const getPayrolls = async () => {
      const cRef = await collection(db, userId);

      const q = query(cRef, orderBy('date', 'desc'));

      const response = await getDocs(q)
        .then((res) => res);

      let result = [];

      response.docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        result.push(data);
      });

      payrolls.value = result;
    };

    onMounted(() => {
      getPayrolls();
    });

    return {
      payrolls,
      getPayrolls,
    };
  },
};
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>
