<template>
  <content-component title="ダッシュボード" icon="mdi-view-dashboard">
    <template v-slot:content>
      <v-card class="mx-auto mt-5">
        <v-app-bar flat outlined>
          <v-toolbar-title class="text-h6"> 友達 </v-toolbar-title>

          <v-spacer></v-spacer>

          <div style="width: 30%">
            <v-autocomplete
              v-model="keyword"
              :items="items"
              :loading="userSearchLoading"
              :search-input.sync="searchKeyword"
              item-text="name"
              item-value="id"
              label="新しい友達を追加"
              placeholder="ユーザー名を入力"
              prepend-inner-icon="mdi-magnify"
              outlined
              dense
              class="mt-6"
            >
              <template v-slot:item="{ item, attrs, on }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  @click="openUserInfo(item)"
                >
                  <v-list-item-avatar color="grey darken-1">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
          </div>
        </v-app-bar>
        <v-card-text>
          <user-list-component
            :users="friends"
            @user-info-close="refreshFriends"
          ></user-list-component>
        </v-card-text>
        <user-info-component
          :dialog="dialog"
          :user="user"
          @close="
            dialog = false;
            refreshFriends();
          "
        ></user-info-component>
      </v-card>
    </template>
  </content-component>
</template>

<script>
import { GetFriendsRequest, SearchRequest } from "../../pb/user_pb";
import UserListComponent from "../../components/User/UserListComponent.vue";
import UserInfoComponent from "../../components/User/UserInfoComponent";
import ContentComponent from "../../components/ContentComponent.vue";
export default {
  name: "Dashboard",
  components: {
    UserListComponent,
    UserInfoComponent,
    ContentComponent,
  },
  data: function () {
    return {
      friends: [],
      newFriendId: 0,
      keyword: null,
      searchKeyword: null,
      userSearchLoading: false,
      items: [],
      dialog: false,
      user: {},
    };
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
    addFriend: function () {
      this.$store.dispatch("user/addFriend", { id: this.newFriendId });
    },
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
    openUserInfo: function (user) {
      this.user = user;
      this.dialog = true;
    },
  },
  mounted: function () {
    this.refreshFriends();
  },
  watch: {
    searchKeyword(val) {
      if (this.userSearchLoading) return;

      if (!val) return;

      let self = this;
      this.userSearchLoading = true;

      let request = new SearchRequest();
      request.setKeyword(val);
      this.$store.state.UserServiceClient.search(
        request,
        this.$store.getters.getGrpcMetadata,
        function (err, response) {
          if (!err) {
            self.items = response.toObject().userList;
          } else {
            console.log(err);
          }
          self.userSearchLoading = false;
        }
      );
    },
  },
};
</script>

<style>
</style>