<template>
  <div class="app">
    <AppHeader class="app-header navbar" :style="{background: '#e6ffff'}" fixed>
      <b-link class="navbar-brand" to="home">
        <div class="screen-large scrollto ">
          <h2>COMP7705 <span>MASTER PROJECT</span></h2>
        </div>
        <div class="screen-small scrollto">
          <h4>COMP7705 MASTER PROJECT</h4>
        </div>
      </b-link>
    </AppHeader>
    <div class="app-body">
      <main class="main mt-4 mb-4">
        <div class="container-fluid" style="height: 100%">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <footer class="app-footer">
        <div class="footer-wrapper">
            <div class="footer-text">COMP7705 MASTER PROJECT</div>
        </div>
    </footer>

  </div>
</template>

<script>
import { Header as AppHeader } from "@coreui/vue";

export default {
  name: "DefaultContainer",
  components: {
    AppHeader
  }
};
</script>

<style scoped>
.scrollto {
color: #0c2e8a;
line-height: 1;
display: inline-block;
}

@media screen and (min-width: 448px) and (max-width: 800px) {
  .screen-small {
    display: block;
  }
  .screen-large {
    display: none;
  }
}
@media screen and (min-width: 800px) {
  .screen-small {
    display: none;
  }
  .screen-large {
    display: block;
  }
}
@media screen and (max-width: 448px) {
  .screen-small {
    display: none;
  }
  .screen-large {
    display: none;
  }
}

.footer-wrapper {
  display:flex; 
  width: 100%;
}

.footer-text {
  line-height: 35px; 
  flex: 1;
}
.footer-tool {
  width: 50%;
}

@media only screen and (max-width: 756px) {
  .footer-text {
    display: none;
  }
  .footer-tool {
    width: 100%;
  }
} 

</style>
