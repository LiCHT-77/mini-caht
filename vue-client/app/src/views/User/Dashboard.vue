<template>
  <v-card class="mx-auto mt-5">
    <v-list>
      <template v-for="(friend, index) in friends">
        <v-list-item :key="index">
          <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ friend.getName() }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider v-if="index !== friends.length" :key="`divider-${index}`" inset></v-divider>
      </template>
    </v-list>
    <v-card-actions>
      <v-btn v-on:click="addFriend">追加</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapState({
      user: function (state) {
        return state.user.user;
      },
      accessToken: function (state) {
        return state.user.accessToken;
      },
      friends: function (state) {
        return state.user.friends;
      }
    }),
  },
  methods: {
    logout: function () {
      this.$store.dispatch("user/logout");
    },
    addFriend: function() {
      this.$store.dispatch("user/addFriend", {id: 1});
    },
    refreshFriends: function() {
      this.$store.dispatch('user/getFriends');
    }
  },
  created: function () {
    this.refreshFriends();
  }
};
</script>

<style>
</style>