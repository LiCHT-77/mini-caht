<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title> ログイン </v-card-title>
    <v-card-text>
      <v-form v-on:submit="login">
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" type="password" label="パスワード" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn v-on:click="login" class="info" dark outlined> ログイン </v-btn>
      <v-btn :to="{ name: 'Register' }" outlined>新規登録</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      // validate
      this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style>
</style>