<template>
  <ul>
    <li v-for="todo in todos">{{todo}}</li>
    <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
  </ul>
</template>

<script>
  export default {
    computed: {
      todos() {
        return this.$store.state.todos.list
      }
    },
    methods: {
      addTodo(e){
        this.$store.commit('todos/add', e.target.value)
        e.target.value = ''
      }
    }
  }
</script>
