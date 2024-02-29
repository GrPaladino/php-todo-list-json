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

    removeTask(i) {
      this.tasks.splice(i, 1);

    },

    pushNewTask() {
        const item = this.newTask;

        
        
        const data = { item: this.newTask.name };
        
        const params = {
            headers: { 'Content-type': 'multipart/form-data' },
        };
        
        axios.post('../backend/api/store-list.php', data, params).then((response) => {
            
            this.tasks = response.data;
        });
        
        this.newTask.name = '';
    },

    deleteTask(i) {

      const data = { index: i };

      const params = {
            headers: { 'Content-type': 'multipart/form-data' },
        };
    
            axios.post('../backend/api/store-list.php', data, params).then((response) => {
        
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