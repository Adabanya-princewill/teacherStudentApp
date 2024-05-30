<template>
    <div>
      <div v-if="students.length" class="flex flex-col mt-12 text-center w-full py-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-fonttext-gray-900">List of Students</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">you can edit & delete a student</p>
        </div>
        <ul>
            <li v-for="student in students" :key="student.studentNumber" class="mx-auto border mt-2 py-3 rounded-lg max-w-lg px-2 flex justify-between items-center">
                <span class="ml-3 text-xl font-medium text-gray-900"> {{ student.name }} {{ student.surname }}</span>
                <div class="space-x-3">
                    <button @click="editStudent(student)"
                class="inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none">Edit</button>
            <button @click="deleteStudent(student.studentNumber)"
                class="inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none">Delete</button>
            </div>                
            </li>
        </ul>
      <Modal :show="isModalVisible" @close="closeModal">
        <StudentForm :editMode="true" :existingStudent="selectedStudent" @close="closeModal" />
      </Modal>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import Modal from './Modal.vue';
  import StudentForm from './StudentForm.vue';
  
  export default {
    name: 'StudentList',
    components: {
      Modal,
      StudentForm,
    },
    setup() {
      const store = useStore();
      const students = computed(() => store.state.students);
      const selectedStudent = ref(null);
      const isModalVisible = ref(false);
  
      const editStudent = (student) => {
        selectedStudent.value = { ...student };
        isModalVisible.value = true;
      };
  
      const deleteStudent = (studentNumber) => {
        store.commit('deleteStudent', studentNumber);
      };
  
      const closeModal = () => {
        isModalVisible.value = false;
        selectedStudent.value = null;
      };
  
      return {
        students,
        selectedStudent,
        isModalVisible,
        editStudent,
        deleteStudent,
        closeModal,
      };
    },
  };
  </script>
  