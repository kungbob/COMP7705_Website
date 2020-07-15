<template>
  <div class="app">
    <AppHeader :style="{background: '#e6ffff'}" fixed>
      <SidebarToggler class="d-lg-none" display="md" :defaultOpen="false" mobile />
      <b-link class="navbar-brand" to="/">
        <div class="navbar-brand-full">
          <h2>COMP7705 <span>MASTER PROJECT</span></h2>
        </div>
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="false"/>
      <b-navbar-nav class="d-md-down-none">
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <main class="main mt-4 mb-4">
        <div class="container-fluid" style="height: 100%">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <TheFooter>
      <div class="ml-auto">
        <span class="mr-1">COMP7705 MASTER PROJECT</span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import { Header as AppHeader, Footer as TheFooter } from "@coreui/vue";

export default {
  name: "DefaultContainer",
  components: {
    AppHeader,
    TheFooter
  }
};
</script>

<style scoped>

</style>
