<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind="{ attrs, on }"></slot>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>メンバー選択</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="overflow-y-auto" style="max-height: 700px">
        <user-list-component :users="friends">
          <template v-slot:item="{ user, index }">
            <v-list-item
              :key="index"
              v-if="!isAlready(user)"
              @click="toggleUser(user)"
            >
              <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="selectedUsers" :value="user"> </v-checkbox>
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="index !== friends.length"
              :key="`divider-${index}`"
            ></v-divider>
          </template>
        </user-list-component>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addUser"> 追加 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GetFriendsRequest } from "../../pb/user_pb";
import UserListComponent from "../../components/User/UserListComponent.vue";
export default {
  name: "MemberJoinComponent",
  components: {
    UserListComponent,
  },
  props: {
    already: {
      type: Array,
    },
  },
  data: function () {
    return {
      dialog: false,
      friends: [],
      selectedUsers: [],
    };
  },
  methods: {
    getFriends: function () {
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
    toggleUser: function (user) {
      let isSelected = this.selectedUsers.find((u) => {
        return u === user;
      });
      if (isSelected) {
        this.selectedUsers = this.selectedUsers.filter((u) => {
          return u != user;
        });
      } else {
        this.selectedUsers.push(user);
      }
    },
    addUser: function () {
      this.$emit("addUser", this.selectedUsers);
      this.close();
    },
    close: function () {
      this.dialog = false;
      this.selectedUsers = [];
    },
    isAlready: function (user) {
      return undefined != this.already.find(u => {return u.id === user.id})
    },
  },
  created: function () {
    this.getFriends();
  },
};
</script>

<style>
</style>