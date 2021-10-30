<template>
  <h2 class="upload-payroll">
    <button class="ui button primary" @click="showCloseForm">
      New payroll
    </button>

    <form class="ui form upload-payroll__form" :class="{ open: showForm }" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="file" class="ui icon button">
          <i class="file icon"></i>
          {{ fileMessage }}
          <span v-if="file">({{ file.name }})</span>
        </label>
        <input type="file" id="file" style="display: none" @change="uploadFile" >
      </div>

      <div class="field">
        <div class="ui calendar">
          <div class="ui input left icon">
            <input type="date" @change="changeDate" :value="date">
          </div>
        </div>
      </div>

      <button class="ui button positive" :class="{ loading }">
        Add Payroll
      </button>

      <p v-if="error">{{ error }}</p>
    </form>
  </h2>
</template>

<script>
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { collection, getFirestore, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../utils/firebase';

export default {
  name: 'UploadPayroll',
  props: {
    getPayrolls: Function,
  },
  setup(props) {
    let showForm = ref(false);
    let file = ref(null);
    let date = ref(null);
    let loading = ref(false);
    let error = ref(null);

    let fileMessage = computed(() => {
      if (file.value) return 'Selected Payroll:';
      return 'Select Payroll';
    });

    const auth = getAuth();
    const storage = getStorage(app);
    const db = getFirestore(app);

    const showCloseForm = () => {
      showForm.value = !showForm.value;
    };

    const uploadFile = (e) => {
      const currFile = e.target.files[0];
      if (currFile.type === 'application/pdf') {
        file.value = currFile;
      }
    };

    const handleSubmit = async () => {
      loading.value = true;
      if (file.value && date.value) {
        try {
          const fileName = uuidv4();
          const userId = auth.currentUser.uid;

          // file ref
          const storageUrl = `${userId}/${fileName}.pdf`;
          const fileRef = sRef(storage, storageUrl);

          // await to load the file
          await uploadBytes(fileRef, file.value);

          // get the storage reference
          const payrollUrlRef = sRef(storage, storageUrl);

          // get the download url
          const dUrl = await getDownloadURL(payrollUrlRef)
            .then((url) => url);

          // get collection in firestore with the user id
          const userCollection = collection(db, userId);

          // add document to that collection
          await addDoc(userCollection, {
            url: dUrl,
            date: new Date(date.value),
            date_string: date.value,
          });

          props.getPayrolls();
        } catch (err) {
          console.log('error:', err);
        }

        file.value = null;
        showForm.value = false;
        date.value = null;
        error.value = null;
        document.getElementById('file').value = '';
      } else {
        error.value = 'Upload a payroll and select a date';
      }
      loading.value = false;
    };

    const changeDate = (e) => {
      date.value = e.target.value;
    };

    return {
      // properties
      file,
      date,
      error,
      loading,
      showForm,
      fileMessage,

      // functions
      uploadFile,
      changeDate,
      handleSubmit,
      showCloseForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload-payroll {
  > .ui.button {
    margin-bottom: 30px;
  }

  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 0px;
    overflow: hidden;
    transition: height 0.3s ease;

    &.open {
      height: 200px;
    }
  }
}
</style>
