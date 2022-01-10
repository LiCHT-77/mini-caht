<template>
  <div>
    <v-app-bar
      absolute
      elevate-on-scroll
      color="white"
      scroll-target="#main-scroll"
      style="z-index: 3"
    >
      <v-icon>
        {{ icon }}
      </v-icon>
      <v-app-bar-title class="text-h6 ml-2">
        {{ title }}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <slot name="tool"></slot>
    </v-app-bar>
    <v-sheet id="main-scroll" class="overflow-y-auto pt-11" max-height="94vh">
      <v-container fluid ref="main">
        <slot name="content"> </slot>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "ContentComponent",
  props: {
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
    },
  },
  methods: {
    scrollToEnd() {
      document.getElementById("end-component").scrollIntoView();
    },
  },
};
</script>

<style>
</style>