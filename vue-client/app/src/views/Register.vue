<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>新規登録</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="ユーザー名" />
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" type="password" label="パスワード" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn v-on:click="register" class="info" dark outlined>登録</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register: function () {
      // バリデーション
      this.$store.dispatch("user/register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style>
</style>