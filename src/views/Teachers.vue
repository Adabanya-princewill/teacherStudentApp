<script>
import TeacherForm from '../components/TeacherForm.vue';
import TeacherList from '../components/TeacherList.vue';

export default {
    name: 'Teachers',
    components: {
        TeacherForm,
        TeacherList,
    },
};
</script>

<template>
    <div>
        <TeacherForm />
        <TeacherList />
    </div>
</template>