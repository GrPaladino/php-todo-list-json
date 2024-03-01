const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      title: "Todo App",
      tasks: [],
      newName: '',

      newTask: {
        name: "",
        type: false,
        showEdit: false, 

      },

      
    };

    
  },

  methods: {
    fetchTodoList() {
        axios.get('../backend/api/get-list.php').then((response) => {
            this.tasks = response.data
        })
    },

    fetchNewTask() {
      const item = this.newTask;

      
      
      const data = { text: item.name, type: item.type, showEdit: item.showEdit};
      
      const params = {
          headers: { 'Content-type': 'multipart/form-data' },
      };
      
      axios.post('../backend/api/store-list.php', data, params).then((response) => {
          
          this.tasks = response.data;
      });
      
      this.newTask.name = '';
    },

    fetchUpdateTaskStatus(index, item) {
      const newStatus = !item.type;

      const data = { index, text: item.name, type: newStatus, showEdit: item.showEdit };
      
      const params = {
          headers: { 'Content-type': 'multipart/form-data' },
      };
      
      axios.post('../backend/api/update-task.php', data, params).then((response) => {
          
          this.tasks = response.data;
      });

    },

    

    fetchDeleteTask(index, item) {

      const data = { index, text: item.name, type: item.type, showEdit: item.showEdit };
      
      const params = {
          headers: { 'Content-type': 'multipart/form-data' },
      };
      
      axios.post('../backend/api/delete-task.php', data, params).then((response) => {
          
          this.tasks = response.data;
      });
    },
  
    showEditTask(index) {
      this.tasks[index].showEdit = !this.tasks[index].showEdit;
    },

    fetchTaskName(index, item) {

      const data = { index, text: this.newName, type: item.type, showEdit: !item.showEdit};
      
      const params = {
          headers: { 'Content-type': 'multipart/form-data' },
      };
      
      axios.post('../backend/api/update-task.php', data, params).then((response) => {
          this.tasks = response.data;
      });

      this.newName = '';


    }
  },

  mounted() {
    this.fetchTodoList()
  }
});
app.mount("#root");