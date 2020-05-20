<template>
  <div id="app">

    <!-- <div class="tabs is-centered">
        <ul>
          <li><router-link to="/">Search User</router-link></li>
          <li><router-link to="/add">Add</router-link></li>
          <li><router-link to="/doctor">Doctor</router-link></li>
          
        </ul>
    </div> -->
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
            <!-- <div class="navbar-brand">
              <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
              </a>
            </div> -->

            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start">
                  <div v-if="!isLoggedIn" style="margin: 5px 0 0 20px; font-size: 30px;">Patient Information System</div>
                  <div v-if="isLoggedIn && isSecretary"><router-link to="/" class="navbar-item">Search Patient &nbsp;<span ><i class="fas fa-search"></i></span></router-link></div>
                  <div v-if="isLoggedIn && isSecretary"><router-link to="/add" class="navbar-item">Add &nbsp;<span ><i class="fas fa-folder-plus"></i></span></router-link></div>
                  <div v-if="isLoggedIn && isDoctor"><router-link to="/doctor" class="navbar-item" style="color: white">Doctor Dashboard &nbsp;<span ><i class="fas fa-user-md"></i></span></router-link></div>
              </div>

              <div class="navbar-end">
                <div class="navbar-item">
                  <div class="buttons">
                      <router-link v-if="!isLoggedIn" to="/login" class="tag is-primary">Login</router-link>
                      <div id="currentUser" v-else>{{ currentUser }}</div>  
                  </div>
                  <div class="buttons" v-if="isLoggedIn" id="logout">
                    <div class="tag is-primary" @click="logout">Logout</div>
                  </div>
                </div>
              </div>
            </div>
        </nav>
        <div style="margin: 0 5% 0 5%">
          <!-- <transition name="router-animations" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight"> -->
            <router-view/>
          <!-- </transition> -->
        </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      isLoggedIn: false,
      currentUser: false,
      isSecretary: false,
      isDoctor: false,
      backgroundimageLink: './assets/image.jpg',
    }
  },
  created () {
    if(firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            // if secretary
            if(user.uid == 'leeBwCnWn8bolFBMkWYfVRcNoiV2') {
                this.isSecretary = true
                // else if doctor
            } else if(user.uid == 'tBZvsX581AOoPZu0ZeV4XG71FUi2') {
                this.isDoctor = true
            }
        }
    })
},
  methods: {
    logout () {
      firebase.auth().signOut().then(() => this.$router.go({path: this.$router.path}))
    }
  }
}
</script>
<style>
/* #app {
  margin-top: 50px;
} */
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

html {
  background-image: url('./assets/image.jpg');
  height: 100%;
  z-index: -1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.navbar {
  margin-bottom: 70px;
}

#logout:hover {
  cursor: pointer;
}

#currentUser {
  margin-right: 30px;
}

.page {
  position: fixed;
  width: inherit;
}
</style>
