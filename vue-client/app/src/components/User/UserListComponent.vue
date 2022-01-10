<template>
  <v-list>
    <template v-for="(user, index) in users">
      <slot name="item" v-bind="{ user, index }">
        <v-list-item :key="index" @click="openUserInfo(user)">
          <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider
          v-if="index !== users.length"
          :key="`divider-${index}`"
          inset
        ></v-divider>
      </slot>
    </template>
    <user-info-component
      :dialog="dialog"
      :user="infoUser"
      @close="closeUserInfo"
    >
      <template v-slot:actions="{ user }">
        <slot name="info-actions" v-bind="{ user, closeUserInfo }"></slot>
      </template>
    </user-info-component>
  </v-list>
</template>

<script>
import UserInfoComponent from "./UserInfoComponent";
export default {
  name: "UserListComponent",
  components: {
    UserInfoComponent,
  },
  props: {
    users: Array,
  },
  data: function () {
    return {
      dialog: false,
      infoUser: {},
    };
  },
  methods: {
    openUserInfo: function (user) {
      this.infoUser = user;
      this.dialog = true;
    },
    closeUserInfo: function () {
      this.dialog = false;
      this.$emit("user-info-close");
    },
  },
};
</script>

<style>
</style>