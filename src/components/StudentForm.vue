<template>  
<div v-if="!editMode" class="bg-gray-100 inline-flex py-3 px-5 items-center hover:bg-gray-200 focus:outline-none">
    <router-link to="/" class="text-center">{{`<-- Home`}}</router-link>
</div>  
<div class="flex flex-col text-center w-full py-4">
    <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">{{ editMode ? 'Edit Student Modal' : 'Students' }}</h1>
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ editMode ? 'Edit' : 'Add' }} a student</p>
</div>
<form @submit.prevent="submitForm" class="text-gray-600 body-font relative">
    <!-- Form Fields -->
    <div class="md:w-2/3 mx-auto flex flex-wrap justify-center items-center">
        <div class="p-2 w-1/2">
            <div class="relative">
                <label for="id" class="leading-7 text-sm text-gray-600">National ID</label>
                <input type="number" v-model="student.nationalId" required min="0"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-1/2">
            <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                <input type="text" v-model="student.name" required
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-1/2">
            <div class="relative">
                <label for="surname" class="leading-7 text-sm text-gray-600">Surname</label>
                <input type="text" v-model="student.surname" required
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-1/2">
            <div class="relative">
                <label for="dob" class="leading-7 text-sm text-gray-600">Date of Birth</label>
                <input type="date" v-model="student.dob"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-full">
            <div class="relative">
                <label for="studentNumber" class="leading-7 text-sm text-gray-600">Student Number</label>
                <input type="number" v-model="student.studentNumber" required min="0"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-full">
            <p v-show="errorMessage" class="text-red-500 text-center mb-1">{{ errorMessage }}</p>
            <button type="submit" class="mt-4 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{{ editMode ? 'Update' : 'Add' }} Student</button>
        </div>
    </div>
</form>
</template>

<script>
import { ref, toRefs } from 'vue';
import { useStore } from 'vuex';

const validateStudentDob = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    }
    return age;
};

const validateText = (text) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(text);
};

export default {
    name: 'StudentForm',
    props: {
        editMode: Boolean,
        existingStudent: Object,
    },
    setup(props, { emit }) {
        const store = useStore();
        const { editMode, existingStudent } = toRefs(props);
        const student = ref(existingStudent.value || {
            nationalId: '',
            name: '',
            surname: '',
            dob: '',
            studentNumber: '',
        });
        const errorMessage = ref('');

        const submitForm = () => {
            if (!validateStudentDob(student.value.dob)) {
                errorMessage.value = 'Student must be at most 22 years old.';
                return;
            }

            if (!validateText(student.value.name)) {
                errorMessage.value = 'Name must contain only alphabetic characters.';
                return;
            }

            if (!validateText(student.value.surname)) {
                errorMessage.value = 'Surename must contain only alphabetic characters.';
                return;
            }

            if (editMode.value) {
                store.commit('updateStudent', student.value);
            } else {
                store.commit('addStudent', student.value);
            }

            emit('close');
            student.value = {
                nationalId: '',
                name: '',
                surname: '',
                dob: '',
                studentNumber: '',
            };
            errorMessage.value = '';
        };

        return {
            student,
            editMode,
            submitForm,
            errorMessage,
        };
    },
};
</script>
