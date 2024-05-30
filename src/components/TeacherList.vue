<template>
    <div>
        <div v-if="teachers.length" class="flex flex-col mt-12 text-center w-full py-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-fonttext-gray-900">List of Teachers</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">you can edit & delete a teacher</p>
        </div>
        <ol>
            <div v-for="teacher in teachers" :key="teacher.teacherNumber" class="mx-auto border mt-2 py-3 rounded-lg max-w-lg px-2 flex justify-between items-center">
                <span class="ml-3 text-xl font-medium text-gray-900">{{ teacher.title }}. {{ teacher.name }} {{ teacher.surname }}</span>
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
        </Modal>
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