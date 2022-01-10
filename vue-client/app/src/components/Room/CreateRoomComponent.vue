<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>ルーム作成</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card flat class="mx-auto mt-5" style="width: 60%">
          <v-form v-on:submit="createRoom">
            <v-card-title>ルーム情報</v-card-title>
            <v-card-text style="width: 50%">
              <div>
                <v-text-field v-model="room.name" label="ルーム名" />
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title>ルームメンバー</v-card-title>
            <v-card-text>
              <user-list-component :users="users">
                <template v-slot:item="{ user, index }">
                  <v-list-item :key="index">
                    <v-list-item-avatar
                      color="grey darken-1"
                    ></v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ user.name }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon @click="removeUser(user)"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider
                    v-if="index !== users.length"
                    :key="`divider-${index}`"
                  ></v-divider>
                </template>
              </user-list-component>
              <member-join-component :already="users" @addUser="addUser">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined dark color="info" v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                    メンバーを追加
                  </v-btn>
                </template>
              </member-join-component>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn dark color="info" @click="createRoom"> 保存 </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import UserListComponent from "../../components/User/UserListComponent.vue";
import MemberJoinComponent from "./MemberJoinComponent.vue";
import { Room } from "../../pb/room_pb";
export default {
  name: "CreateRoomComponent",
  components: {
    UserListComponent,
    MemberJoinComponent,
  },
  data: function () {
    return {
      dialog: false,
      users: [],
      room: {
        name: "",
        userIdList: [],
      },
    };
  },
  methods: {
    createRoom: function () {
      let self = this;
      let request = new Room();
      request.setName(this.room.name);
      let userIds = this.users.map((user) => {
        return user.id;
      });
      userIds.push(this.$store.getters["user/getId"]);
      request.setUserIdList(userIds);
      this.$store.state.RoomServiceClient.createRoom(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err) {
          if (!err) {
            self.close();
            self.$emit("createdRoom")
          } else {
            console.log(err);
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
    },
    addUser: function (userList) {
      this.users.push(...userList);
      this.users = [...new Set(this.users)];
    },
    close: function () {
      this.users = [];
      this.room = {
        id: 0,
        name: "",
        userIdList: [],
      };
      this.dialog = false;
    },
    removeUser: function (user) {
      this.users = this.users.filter((u) => {
        return u != user;
      });
    },
  },
};
</script>

<style>
</style>