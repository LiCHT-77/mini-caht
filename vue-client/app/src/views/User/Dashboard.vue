<template>
  <v-card class="mx-auto mt-5">
    <user-list-component
      name="Friends"
      :users="this.friends"
      refresh
      @refresh="refreshFriends"></user-list-component>
    <v-card-actions>
      <v-btn v-on:click="addFriend">追加</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { GetFriendsRequest } from "../../pb/user_pb";
import UserListComponent from "../../components/User/UserListComponent.vue"
export default {
  name: "Dashboard",
  components: {
    UserListComponent,
  },
  data: function () {
    return {
      friends: [],
    };
  },
  computed: {
    ...mapState({
      user: function (state) {
        return state.user.user;
      },
      accessToken: function (state) {
        return state.user.accessToken;
      },
    }),
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
    addFriend: function () {
      this.$store.dispatch("user/addFriend", { id: 1 });
    },
    refreshFriends: function () {
      var self = this;
      var request = new GetFriendsRequest();
      request.setId(this.$store.getters["user/getId"]);
      this.$store.state.UserServiceClient.getFriends(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err, response) {
          if (!err) {
            self.friends = response.getFriendList();
          } else {
            console.log(err.message);
          }
        }
      );
    },
  },
  mounted: function () {
    this.refreshFriends();
  },
};
</script>

<style>
</style>