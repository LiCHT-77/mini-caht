<template>
  <div>
    <content-component ref="content" :title="room.name" icon="mdi-forum">
      <template v-slot:tool>
        <room-setting-component></room-setting-component>
      </template>
      <template v-slot:content>
        <v-container>
          <v-timeline dense>
            <v-slide-x-transition group>
              <v-timeline-item
                v-for="message in messages"
                :key="message.id"
                :color="getMessageAvatar(message.userId)"
              >
                <v-subheader>{{
                  getMessageUserName(message.userId)
                }}</v-subheader>
                <v-card class="elevation-2">
                  <v-card-text>{{ message.text }}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-slide-x-transition>
            <v-timeline-item
              fill-dot
              id="end-component"
              class="white--text mb-12"
              color="orange"
              large
            >
              <template v-slot:icon>
                <span ref="end">New</span>
              </template>
              <v-text-field
                ref="input"
                v-model="input"
                append-outer-icon="mdi-send"
                @click:append-outer="postMessage"
              >
              </v-text-field>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </template>
    </content-component>
  </div>
</template>

<script>
import RoomSettingComponent from "../../components/Room/SettingComponent.vue";
import { GetMessageListRequest, Message } from "../../pb/message_pb";
import { GetRoomRequest } from "../../pb/room_pb";
import { GetUsersRequest } from "../../pb/user_pb";
export default {
  name: "TimelineComponent",
  components: {
    RoomSettingComponent,
  },
  data: function () {
    return {
      stream: null,
      roomId: this.$route.params.roomId,
      input: "",
      room: {
        id: 0,
        name: "",
        userIdList: {},
      },
      users: [],
      messages: [],
      colors: [
        "red",
        "purple",
        "blue",
        "indigo",
        "cyan",
        "teal",
        "lime",
        "yellow",
        "green",
        "orange",
        "pink",
        "brown",
      ],
    };
  },
  methods: {
    postMessage: function () {
      if (this.input === "") {
        return;
      }
      let self = this;
      let request = new Message();
      request.setType(0);
      request.setText(this.input);
      request.setRoomId(this.room.id);
      this.$store.state.MessageServiceClient.postMessage(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err) {
          if (!err) {
            self.input = "";
          } else {
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
      this.input = "";
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
            if (err.code === 16) {
              self.$store.dispatch("auth/logout");
            }
          }
        }
      );
    },
    getMessageStream() {
      let self = this;
      let request = new GetMessageListRequest();
      request.setRoomId(this.room.id);
      this.stream = this.$store.state.MessageServiceClient.getMessageList(
        request,
        this.$store.getters.getGrpcMetadata
      );
      this.stream.on("data", function (response) {
        self.messages.push(response.toObject());
        self.$nextTick(function () {
          self.$refs.content.scrollToEnd();
        });
      });
      this.stream.on("status", function (status) {
        console.log(status);
        if (status === 16) {
          this.$store.dispatch("auth/logout");
        }
      });
      this.stream.on("end", function (end) {
        console.log(end);
      });
    },
    getMessageAvatar: function (userId) {
      return this.colors[
        this.users.findIndex(function (user) {
          return user.id === userId;
        })
      ];
    },
    getMessageUserName: function (userId) {
      let user = this.users.find((user) => {
        return user.id === userId;
      });

      if (user != undefined) {
        return user.name;
      }

      return "unknown";
    },
    getRoomInfo: function () {
      let self = this;
      let roomRequest = new GetRoomRequest();
      roomRequest.setRoomId(this.$route.params.roomId);
      this.$store.state.RoomServiceClient.getRoom(
        roomRequest,
        this.$store.getters.getGrpcMetadata,
        async function (err, response) {
          if (!err) {
            self.room = response.toObject();
            await self.getRoomUsers();
            await self.getMessageStream();
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
  destroyed: function () {
    if (this.stream) {
      this.stream.cancel();
    }
  },
};
</script>

<style>
</style>