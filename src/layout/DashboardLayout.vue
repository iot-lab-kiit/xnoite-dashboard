<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Xonite"
      title="Xonite"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-info',
            path: '/dashboard',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Stock',
            icon: 'ni ni-money-coins text-primary',
            path: '/stock',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Crypto',
            icon: 'ni ni-credit-card text-danger',
            path: '/crypto',
          }"
        />
        <sidebar-item
          :link="{
            name: 'News',
            icon: 'ni ni-single-copy-04 text-success',
            path: '/news',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
