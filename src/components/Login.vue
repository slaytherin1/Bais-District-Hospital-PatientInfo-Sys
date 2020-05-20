<template>
    <div id="login columns is-centered">
<vue-particles
        color="#ccffff"
        :particleOpacity="0.7"
        :particlesNumber="70"
        shapeType="circle"
        :particleSize="8"
        linesColor="#ccffff"
        :linesWidth="3"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
        <form @submit.prevent="login" id="form" class="animated fadeInUp">
            <div class="field column is-4 is-offset-4">
            <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded is-medium" type="email" placeholder="Email"  v-model="email">
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
            </p>
            </div>
            <div class="field column is-4 is-offset-4">
            <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded is-medium" type="password" placeholder="Password"  v-model="password">
                <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
                </span>
            </p>
            </div>
            <div class="field column is-4 is-offset-4" id="loginbtn">
                <input class="button is-link is-rounded is-medium" type="submit" value="Login" readonly>
            </div>
        </form>

    </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'login',
    data () {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login (e) {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                        if(user) {
                            // IF ERROR OCCURED TRY CHANGING PATIENT UID BASED ON THE USER'S UID AT FIREBASE
                            // if secretary
                            if(user.uid == 'UID HERE') {
                                this.$router.go({path: this.$router.path})
                                // else if doctor
                            } else if(user.uid == 'UID HERE') {
                                this.$router.go({path: this.$router.replace('/doctor')})
                            } else {
                                // else if not authorized
                                alert('This account is not authorized to view contents in this site')
                                this.password = ''
                                firebase.auth().signOut().then(() => this.$router.replace('/'))
                            }
                        }
                    })
                })
                .catch(error => {
                    alert(error.message)
                    this.password = ''
                })
        }
    }
}
</script>
<style scope>
.field {
    padding: 0px;
}

#loginbtn {
    text-align: center;
}

form #form {
    position: absolute;
    z-index: 1;
}

canvas {
    position: absolute;
    z-index: -1;
}
</style>

