<template>
  <v-list>
    <v-subheader
      >{{ name }}
      <v-spacer></v-spacer>
      <v-btn v-if="refresh" v-on:click="$emit('refresh')" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-subheader>
    <template v-for="(user, index) in users">
      <v-list-item :key="index">
        <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.getName() }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider
        v-if="index !== users.length"
        :key="`divider-${index}`"
        inset
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "UserListComponent",
  props: {
    name: String,
    users: Array,
    refresh: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>