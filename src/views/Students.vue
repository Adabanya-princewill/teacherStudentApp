<script>
  import StudentForm from '../components/StudentForm.vue';
  import StudentList from '../components/StudentList.vue';
  
  export default {
    name: 'Students',
    components: {
      StudentForm,
      StudentList,
    },
  };
  </script>

  <template>
    <div>
      <StudentForm />
      <StudentList />
    </div>
  </template>