<template>
    <div>
        <div v-if="!editMode" class="bg-gray-100 inline-flex py-3 px-5 items-center hover:bg-gray-200 focus:outline-none">
                    <router-link to="/" class="text-center">{{`<-- Home`}}</router-link>
                </div> 
        <form @submit.prevent="submitForm" class="text-gray-600 body-font relative">
            <!-- Form Fields -->
            <div class="container mx-auto">
                <div class="flex flex-col text-center w-full py-4">
                    <h1 class="sm:text-3xl text-2xl font-medium title-fonttext-gray-900">{{ editMode ? 'Edit Teacher Modal' : 'Teachers' }}</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ editMode ? 'Edit' : 'Add' }} a teacher</p>
                </div>
                <div class="md:w-2/3 mx-auto flex flex-wrap justify-center items-center">
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="id" class="leading-7 text-sm text-gray-600">National ID</label>
                            <input type="number" v-model="teacher.nationalId" required min="0"
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="title" class="leading-7 text-sm text-gray-600">Title</label>
                            <select v-model="teacher.title"
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                required>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Dr">Dr</option>
                                <option value="Prof">Prof</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" v-model="teacher.name" required
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="surname" class="leading-7 text-sm text-gray-600">Surename</label>
                            <input type="text" v-model="teacher.surname" required
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="dob" class="leading-7 text-sm text-gray-600">Date of Birth</label>
                            <input type="date" v-model="teacher.dob" required
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="teacherNumber" class="leading-7 text-sm text-gray-600">Teacher Number</label>
                            <input type="number" v-model="teacher.teacherNumber" required min="0"
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <div class="relative">
                            <label for="salary" class="leading-7 text-sm text-gray-600">Salary</label>
                            <input type="number" v-model="teacher.salary" min="0"
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <p v-if="errorMessage" class="text-red-500 text-center mb-1">{{ errorMessage }}</p>
                        <button type="submit"
                            class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{{
            editMode ? 'Update' : 'Add' }} Teacher</button>
                    </div>
                </div>
            </div>

            
        </form>


    </div>
</template>

<script>
import { ref, toRefs } from 'vue';
import { useStore } from 'vuex';

const validateTeacherDob = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 21;
};

const validateText = (text) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(text);
};

export default {
    name: 'TeacherForm',
    props: {
        editMode: Boolean,
        existingTeacher: Object,
    },
    setup(props, { emit }) {
        const store = useStore();
        const { editMode, existingTeacher } = toRefs(props);
        const teacher = ref(existingTeacher.value || {
            nationalId: '',
            title: 'Mr',
            name: '',
            surname: '',
            dob: '',
            teacherNumber: '',
            salary: '',
        });
        const errorMessage = ref('');

        const submitForm = () => {
            if (!validateTeacherDob(teacher.value.dob)) {
                errorMessage.value = 'Teacher must be at least 21 years old.';
                return;
            }
            if (!validateText(teacher.value.name)) {
                errorMessage.value = 'Name must contain only alphabetic characters.';
                return;
            }

            if (!validateText(teacher.value.surname)) {
                errorMessage.value = 'Surename must contain only alphabetic characters.';
                return;
            }

            if (editMode.value) {
                store.commit('updateTeacher', teacher.value);
            } else {
                store.commit('addTeacher', teacher.value);
            }

            emit('close');
            teacher.value = {
                nationalId: '',
                title: 'Mr',
                name: '',
                surname: '',
                dob: '',
                teacherNumber: '',
                salary: '',
            };
            errorMessage.value = '';
        };

        return {
            teacher,
            editMode,
            submitForm,
            errorMessage,
        };
    },
};
</script>