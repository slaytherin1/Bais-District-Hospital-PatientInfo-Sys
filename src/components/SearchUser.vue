<template>
    <div class="column is-half is-offset-one-quarter page">
    <div v-if="currentUser == isSecretary">  
        <!-- provide into the LIST an array you want to search -->
        <!-- whatever you pass in the event-name will be read in this.$on -->
        <!-- KEYS are the strings you want to search -->
        <div class="field">
            <div class="control">
                <VueFuse
                placeholder="Search for users"
                event-name="results"
                :list="users"
                :keys="['uid_user']"
                class="input is-rounded is-large animated fadeIn"
                />
            </div>
        </div>


        <!-- <button
          @click="runSearch">This Button Uses Search Method, with uid_user = 1</button> -->
        <div v-if="results.length >= 1 ">
            <div v-for="user in results" :key="user.uid_user">
                <router-link 
                    class="box has-text-centered animated fadeInUp delay-5s" 
                    v-bind:to="{name: 'showmore', 
                    params: {uid_user: user.uid_user}}">
                    <a>{{ user.uid_user }}</a> - 
                    <a> {{ user.firstname }}</a>      
                    <a> {{ user.lastname }}</a>      
                </router-link>
                

            </div>
        </div>
        <div v-else class="box">
            <p class="has-text-centered has-text-black is-link">No results found try adding them into the database</p>
        </div>
    </div>
    <div v-else>
        <p id="p" class="box has-background-danger has-text-light">
            Only Secretary can Access this page
            <span ><i class="fas fa-3x fa-exclamation-circle"></i></span>    
        </p>
    </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'SearchUser',
  data () {
    return {
      results: [],
      users: [],
      isSecretary: 'leeBwCnWn8bolFBMkWYfVRcNoiV2',
      isDoctor: 'tBZvsX581AOoPZu0ZeV4XG71FUi2', 
      currentUser: null
    }
  },
  props : [
  ],
  methods: {
    // runSearch () {
    //   this.$search('1', this.users, { keys: ['uid_user'] }).then(result => {
    //     this.results = result
    //   })
    // }
  },
  created () {
    db.collection('users').onSnapshot( querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = {
                'id': doc.id,
                'uid_user': doc.data().uid_user,
                'firstname': doc.data().firstname,
                'lastname': doc.data().lastname
            }
            this.users.push(data)
        })
    })

    this.$on('results', results => {
      this.results = results
    })

    //GET CURRENT USER
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            // if secretary
            if(user.uid == this.isSecretary) {
                this.currentUser = firebase.auth().currentUser.uid
                // else if doctor
            } else if(user.uid == this.isDoctor) {
                this.currentUser = firebase.auth().currentUser.uid
            } 
        }
    })
  },

}
</script>
