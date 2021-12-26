<template>
  <v-list tree-line>
    <template v-for="(room, index) in rooms">
      <v-list-item :key="index">
        <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ room.getName() }}</v-list-item-title>
          <v-list-item-subtitle>Latest Message</v-list-item-subtitle>
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

<script>
import {GetRoomListRequest} from "../../pb/room_pb"
export default {
  name: "RoomList",
  data: function () {
    return {
      rooms: []
    }
  },
  methods: {
    getRooms: function() {
      var self = this
      var request = new GetRoomListRequest()
      request.setUserId(this.$store.getters['user/getId'])
      this.$store.state.RoomServiceClient.getRoomList(request, this.$store.getters.getGrpcMetadata, function(err, response) {
        if (!err) {
          self.rooms = response.getRoomList()
        } else {
          console.log(err)
        }
      })
    }
  },
  created: function() {
    this.getRooms()
  }
};
</script>

<style>
</style>