<template>
    <div>
      <div v-if="students.length" class="flex flex-col mt-12 text-center w-full py-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-fonttext-gray-900">List of Students</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">you can edit & delete a student</p>
        </div>

        <div class="p-10">
            <table class="w-3/3 mx-auto">
                <thead>
                    <tr class="border-b-2 border-gray-300">
                        <th class="p-2">S/N</th>
                        <th class="p-2">Surename</th>
                        <th class="p-2">Name</th>
                        <th class="p-2">National ID</th>
                        <th class="p-2">DOB</th>
                        <th class="p-2">Students Number</th>
                    </tr>
                </thead>
                <tbody v-for="(student, index) in students" :key="student.studentNumber">
                    <tr class="bg-gray-100 text-center my-8">
                        <td class="py-2">{{ index + 1 }}</td>
                        <td class="py-2">{{ student.surname }}</td>
                        <td class="py-2">{{ student.name }}</td>
                        <td class="py-2">{{ student.nationalId }}</td>
                        <td class="py-2">{{ student.dob? student.dob : '--'}}</td>
                        <td class="py-2">{{ student.studentNumber }}</td>
                        <td class="p-2">
                            <button @click="editStudent(student)"
                                class="text-green-500 py-2 px-4 rounded-lg hover:shadow-md ">Edit</button>
                            <button @click="deleteStudent(student.studentNumber)"
                                class="text-red-500 py-2 px-4 rounded-lg hover:shadow-md">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
      <Modal :show="isModalVisible" @close="closeModal">
        <StudentForm :editMode="true" :existingStudent="selectedStudent" @close="closeModal" />
      </Modal>
      </div>
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
  