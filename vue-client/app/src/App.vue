<template>
  <v-app>
    <v-app-bar
      color="info accent-4"
      max-height="50px"
      dark
      dense
      app
      clipped-left
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        v-on:click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Mini Chat</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-if="isAuth" v-model="drawer" app clipped>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ userId }}: {{ userName }}
          </v-list-item-title>
          <v-list-item-subtitle> {{ userEmail }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-on:click="logout" link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data: function () {
    return {
      drawer: !this.$vuetify.breakpoint.mobile,
      items: [
        {
          title: "ダッシュボード",
          icon: "mdi-view-dashboard",
          link: { name: "Dashboard" },
        },
        {
          title: "プロフィール",
          icon: "mdi-account",
          link: { name: "Profile" },
        },
        {
          title: "ルーム",
          icon: "mdi-forum",
          link: { name: "Rooms" },
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      userId: "user/getId",
      userName: "user/getName",
      userEmail: "user/getEmail",
    }),
  },
  created: function () {
    this.$store.dispatch("connectClients", {
      hostname: "localhost",
      port: "8080",
    });
    this.$store.dispatch("auth/loadUser");
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
