<template>
  <div>
    <content-component title="ルーム" icon="mdi-forum">
      <template v-slot:tool>
        <create-room-component @createdRoom="getRooms"></create-room-component>
      </template>
      <template v-slot:content>
        <v-list tree-line>
          <template v-for="(room, index) in rooms">
            <v-list-item
              :key="index"
              @click="
                $router.push({
                  name: 'Room',
                  params: { roomId: room.getId() },
                })
              "
            >
              <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ room.getName() }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider
              v-if="index !== rooms.length"
              :key="`divider-${index}`"
              inset
            ></v-divider>
          </template>
        </v-list>
      </template>
    </content-component>
  </div>
</template>

<script>
import CreateRoomComponent from "../../components/Room/CreateRoomComponent.vue"
import { GetRoomListRequest } from "../../pb/room_pb";
export default {
  name: "RoomList",
  components: {
    CreateRoomComponent
  },
  data: function () {
    return {
      rooms: [],
    };
  },
  methods: {
    getRooms: function () {
      let self = this;
      let request = new GetRoomListRequest();
      request.setUserId(this.$store.getters["user/getId"]);
      this.$store.state.RoomServiceClient.getRoomList(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err, response) {
          if (!err) {
            self.rooms = response.getRoomList();
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
  created: function () {
    this.getRooms();
  },
};
</script>

<style>
</style>