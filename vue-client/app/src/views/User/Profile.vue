<template>
  <v-form class="col-4 mx-auto">
    <v-text-field v-model="name" label="ユーザー名" />
    <v-text-field v-model="email" label="メールアドレス" />
    <v-btn v-on:click="updateUser" dark class="info">保存</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Profile",
  data: function () {
    return {
      name: this.$store.getters['user/getName'],
      email: this.$store.getters['user/getEmail'],
    };
  },
  methods: {
    updateUser() {
      this.$store.dispatch('user/updateUser', {name: this.name, email: this.email})
    }
  }
};
</script>

<style>
</style>