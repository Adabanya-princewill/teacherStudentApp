<template>
    <div>
        <div v-if="teachers.length" class="flex flex-col mt-12 text-center w-full py-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-fonttext-gray-900">List of Teachers</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">you can edit & delete a teacher</p>
        


        <div class="p-10">
            <table class="w-3/3 mx-auto">
                <thead>
                    <tr class="border-b-2 border-gray-300">
                        <th class="p-2">S/N</th>
                        <th class="p-2">Title</th>
                        <th class="p-2">Surename</th>
                        <th class="p-2">Name</th>
                        <th class="p-2">National ID</th>
                        <th class="p-2">DOB</th>
                        <th class="p-2">Teachers Number</th>
                        <th class="p-2">Salary</th>
                    </tr>
                </thead>
                <tbody v-for="(teacher, index) in teachers" :key="teacher.teacherNumber">
                    <tr class="bg-gray-100 text-center">
                        <td class="py-2">{{ index + 1 }}</td>
                        <td class="py-2">{{ teacher.title }}</td>
                        <td class="py-2">{{ teacher.surname }}</td>
                        <td class="py-2">{{ teacher.name }}</td>
                        <td class="py-2">{{ teacher.nationalId }}</td>
                        <td class="py-2">{{ teacher.dob}}</td>
                        <td class="py-2">{{ teacher.teacherNumber }}</td>
                        <td class="py-2">{{ teacher.salary ? teacher.salary : '--' }}</td>
                        <td class="p-2">
                            <button @click="editTeacher(teacher)"
                                class="text-green-500 py-2 px-4 rounded-lg hover:shadow-md ">Edit</button>
                            <button @click="deleteTeacher(teacher.teacherNumber)"
                                class="text-red-500 py-2 px-4 rounded-lg hover:shadow-md">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Modal :show="isModalVisible" @close="closeModal">
                <TeacherForm :editMode="true" :existingTeacher="selectedTeacher" @close="closeModal" />
            </Modal>
        </div>
    </div>

       <!--  <ol>
            <div v-for="teacher in teachers" :key="teacher.teacherNumber"
                class="mx-auto border mt-2 py-3 rounded-lg max-w-lg px-2 flex justify-between items-center">
                <span class="ml-3 text-xl font-medium text-gray-900">{{ teacher.title }}. {{ teacher.name }} {{
            teacher.surname }}</span>
                <div class="space-x-3">
                    <button @click="editTeacher(teacher)"
                        class="inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none">Edit</button>
                    <button @click="deleteTeacher(teacher.teacherNumber)"
                        class="inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none">Delete</button>
                </div>
            </div>
        </ol> 
        <Modal :show="isModalVisible" @close="closeModal">
            <TeacherForm :editMode="true" :existingTeacher="selectedTeacher" @close="closeModal" />
        </Modal>-->
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';
import TeacherForm from './TeacherForm.vue';

export default {
    name: 'TeacherList',
    components: {
        Modal,
        TeacherForm,
    },
    setup() {
        const store = useStore();
        const teachers = computed(() => store.state.teachers);
        const selectedTeacher = ref(null);
        const isModalVisible = ref(false);

        const editTeacher = (teacher) => {
            selectedTeacher.value = { ...teacher };
            isModalVisible.value = true;
        };

        const deleteTeacher = (teacherNumber) => {
            store.commit('deleteTeacher', teacherNumber);
        };

        const closeModal = () => {
            isModalVisible.value = false;
            selectedTeacher.value = null;
        };

        return {
            teachers,
            selectedTeacher,
            isModalVisible,
            editTeacher,
            deleteTeacher,
            closeModal,
        };
    },
};
</script>