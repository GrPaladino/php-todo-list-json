const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      title: "Todo App",

      tasks: [],

      newTask: {
        name: "",
        type: false,
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

      
      
      const data = { text: item.name, type: item.type, };
      
      const params = {
          headers: { 'Content-type': 'multipart/form-data' },
      };
      
      axios.post('../backend/api/store-list.php', data, params).then((response) => {
          
          this.tasks = response.data;
      });
      
      this.newTask.name = '';
    },

    removeTask(i) {
      this.tasks.splice(i, 1);

    },

    

    fetchDeleteTask(index, item) {

      const data = { index, text: item.name, type: item.type, };
      
      const params = {
          headers: { 'Content-type': 'multipart/form-data' },
      };
      
      axios.post('../backend/api/delete-task.php', data, params).then((response) => {
          
          this.tasks = response.data;
      });
    },



    setTypeStatus(task) {
      task.type = !task.type;
    },
  },

  mounted() {
    this.fetchTodoList()
  }
});
app.mount("#root");