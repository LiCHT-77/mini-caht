<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>ルーム設定</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card outlined class="mx-auto mt-5" style="width: 60%">
          <v-card-title>ルーム情報</v-card-title>
          <v-card-text>
            <v-form v-on:submit="saveInfo">
              <v-text-field v-model="room.name" label="ルーム名" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="available"
              dark
              color="info"
              :loading="savingInfo"
              :disabled="savingInfo"
              @click="saveInfo"
            >
              保存
            </v-btn>
            <v-btn v-if="!available" icon color="info">
              <v-icon>
                {{ saveIcon }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card outlined class="mx-auto mt-5" style="width: 60%">
          <v-card-title>ルームメンバー</v-card-title>
          <v-card-text>
            <user-list-component :users="users">
              <template v-slot:info-actions="{ user, closeUserInfo }">
                <v-btn
                  dark
                  color="red"
                  @click="
                    exitRoom(user);
                    closeUserInfo();
                  "
                  >退出させる</v-btn
                >
              </template>
            </user-list-component>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <member-join-component :already="users" @addUser="joinRoom">
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined dark color="info" v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                  メンバーを追加
                </v-btn>
              </template>
            </member-join-component>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  GetRoomRequest,
  Room,
  JoinRoomRequest,
  ExitRoomRequest,
} from "../../pb/room_pb";
import { GetUsersRequest } from "../../pb/user_pb";
import UserListComponent from "../../components/User/UserListComponent.vue";
import MemberJoinComponent from "./MemberJoinComponent.vue";
export default {
  name: "RoomSettingComponent",
  components: {
    UserListComponent,
    MemberJoinComponent,
  },
  data: function () {
    return {
      dialog: false,
      savingInfo: false,
      available: true,
      saveIcon: "mdi-check",
      users: [],
      room: {
        id: 0,
        name: "",
        userIdList: [],
      },
    };
  },
  methods: {
    saveInfo: function () {
      this.savingInfo = true;
      let self = this;
      let request = new Room();
      request.setId(this.$route.params.roomId);
      request.setName(this.room.name);
      this.$store.state.RoomServiceClient.putRoom(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err) {
          self.available = false;
          if (err) {
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
              console.log(err);
              self.saveIcon = "mdi-close";
            }
          } else {
            self.saveIcon = "mdi-check";
          }
          self.savingInfo = false;
          self.getRoomInfo();
          setTimeout(() => (self.available = true), 2000);
        }
      );
    },
    joinRoom: function (userList) {
      let self = this;
      userList.forEach((user) => {
        let request = new JoinRoomRequest();
        request.setUserId(user.id);
        request.setRoomId(self.room.id);
        self.$store.state.RoomServiceClient.joinRoom(
          request,
          self.$store.getters.getGrpcMetadata,
          function (err) {
            if (!err) {
              self.users.push(user);
            } else {
              console.log(err);
              if (err.code === 16) {
                self.$store.dispatch("auth/logout");
              }
            }
          }
        );
      });
    },
    exitRoom: function (user) {
      let self = this;
      let request = new ExitRoomRequest();
      request.setUserId(user.id);
      request.setRoomId(this.room.id);
      this.$store.state.RoomServiceClient.exitRoom(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err) {
          if (!err) {
            if (self.$store.getters["user/getId"] === user.id) {
              self.$router.push({ name: "Rooms" }).catch(() => {});
            }
          } else {
            console.log(err);
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
          self.getRoomUsers();
        }
      );
    },
    getRoomUsers: function () {
      let self = this;
      let request = new GetUsersRequest();
      request.setIdsList(this.room.userIdList);
      this.$store.state.UserServiceClient.getUsers(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err, response) {
          if (!err) {
            self.users = response.toObject().userList;
          } else {
            console.log(err);
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
    },
    getRoomInfo: function () {
      let self = this;
      let request = new GetRoomRequest();
      request.setRoomId(this.$route.params.roomId);
      this.$store.state.RoomServiceClient.getRoom(
        request,
        this.$store.getters.getGrpcMetadata,
        async function (err, response) {
          if (!err) {
            self.room = response.toObject();
            await self.getRoomUsers();
          } else {
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
            console.log(err);
          }
        }
      );
    },
  },
  created: function () {
    this.getRoomInfo();
  },
};
</script>

<style>
</style>