<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    @click:outside="$emit('close')"
    width="300"
  >
    <v-card>
      <v-card-title>
        <v-avatar class="mx-auto" color="grey darken-1" size="90"> </v-avatar>
      </v-card-title>
      <v-card-text>
        <p class="text-center text-md-h4">
          {{ user.name }}
        </p>
        <div class="text-center">
          <v-btn
            v-if="user.id !== this.$store.getters['user/getId']"
            class="mx-auto"
            color="success"
            :outlined="!isFriend"
            @click="
              if (!isFriend) addFriend();
              else removeFriend();
            "
            >{{ addFriendText }}</v-btn
          >
        </div>
      </v-card-text>
      <v-card-actions>
        <slot name="actions" v-bind="{user}"></slot>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')">close</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import {
  GetFriendsRequest,
  AddFriendRequest,
  RemoveFriendRequest,
} from "../../pb/user_pb";
export default {
  name: "UserInfoComponent",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
    },
  },
  computed: {
    isFriend: function () {
      let self = this;
      let friend = this.friends.find(function (user) {
        return user.id === self.user.id;
      });
      return friend;
    },
    addFriendText: function () {
      if (this.isFriend) return "友達に追加済み";
      return "友達に追加する";
    },
  },
  data: function () {
    return {
      friends: [],
    };
  },
  methods: {
    refreshFriends: function () {
      let self = this;
      let request = new GetFriendsRequest();
      request.setId(this.$store.getters["user/getId"]);
      this.$store.state.UserServiceClient.getFriends(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err, response) {
          if (!err) {
            self.friends = response.toObject().friendList;
          } else {
            console.log(err.message);
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
    },
    addFriend: function () {
      let self = this;
      let request = new AddFriendRequest();
      request.setId(this.user.id);
      this.$store.state.UserServiceClient.addFriend(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err) {
          if (!err) {
            self.refreshFriends();
          } else {
            console.log(err);
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
    },
    removeFriend: function () {
      let self = this;
      let request = new RemoveFriendRequest();
      request.setId(this.user.id);
      this.$store.state.UserServiceClient.removeFriend(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err) {
          if (!err) {
            self.refreshFriends();
          } else {
            console.log(err);
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
    },
  },
  watch: {
    dialog() {
      this.refreshFriends();
    },
  },
};
</script>

<style>
</style>