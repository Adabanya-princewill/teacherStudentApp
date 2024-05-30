import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      teachers: JSON.parse(localStorage.getItem('teachers')) || [],
      students: JSON.parse(localStorage.getItem('students')) || []
    };
  },
  mutations: {
    addTeacher(state, teacher) {
      state.teachers.push(teacher);
      localStorage.setItem('teachers', JSON.stringify(state.teachers));
    },
    addStudent(state, student) {
      state.students.push(student);
      localStorage.setItem('students', JSON.stringify(state.students));
    },
    updateTeacher(state, updatedTeacher) {
      const index = state.teachers.findIndex(t => t.teacherNumber === updatedTeacher.teacherNumber);
      if (index !== -1) {
        state.teachers[index] = updatedTeacher;
        localStorage.setItem('teachers', JSON.stringify(state.teachers));
      }
    },
    updateStudent(state, updatedStudent) {
      const index = state.students.findIndex(s => s.studentNumber === updatedStudent.studentNumber);
      if (index !== -1) {
        state.students[index] = updatedStudent;
        localStorage.setItem('students', JSON.stringify(state.students));
      }
    },
    deleteTeacher(state, teacherNumber) {
      state.teachers = state.teachers.filter(t => t.teacherNumber !== teacherNumber);
      localStorage.setItem('teachers', JSON.stringify(state.teachers));
    },
    deleteStudent(state, studentNumber) {
      state.students = state.students.filter(s => s.studentNumber !== studentNumber);
      localStorage.setItem('students', JSON.stringify(state.students));
    }
  },
});

export default store;
