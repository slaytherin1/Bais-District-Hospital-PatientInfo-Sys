<template>
    <div id="add" class="container page animated lightSpeedIn">
    <div v-if="currentUser == isSecretary"> 
        <div class="column is-four-fifths">

            <form @submit.prevent="addUser" v-bind:class="{'animated shake': isRequired}">
                <div v-if="isEmpty != null"><b class="tag animated shake is-danger column is-5"> {{ isEmpty }} </b></div>
                <div class="columns">
                    <div class="column is-4">
                        <figure class="image is-128x128">
                            <img :src="downloadURL" alt="" height="256" width="256">
                        </figure>

                        <div v-if="!disbleUploadButton">
                            <div class="file control">
                                <label class="file-label">
                                    <input class="file-input"  type="file" name="resume" @change="uploadImage($event)" accept="image/*">
                                    <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload" v-bind:class="{ 'has-text-danger': isRequired}"></i>
                                    </span>
                                    <span class="file-label" v-bind:class="{ 'has-text-danger': isRequired}">
                                        Choose a file…
                                    </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped columns">
                        <div class="column is-2">
                            <div class="control">
                                <input class="input" type="text" placeholder="uid_user" v-model="num" readonly>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="firstname" v-model="firstname">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="lastname" v-model="lastname">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="middlename" v-model="middlename">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="number" placeholder="age" v-model="age">
                            </div>
                        </div>
                </div>
                <div class="field is-grouped columns">
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="date" placeholder="dateOfBirth" v-model="dateOfBirth">
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="address" v-model="address">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="height" v-model="height">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="weight" v-model="weight">
                            </div>
                        </div>
                </div>
                <div class="field is-group columns">
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="bloodpressure" v-model="bloodpressure">
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" v-bind:class="{ 'is-danger': isRequired}" type="text" placeholder="temperature in °C" v-model="temperature">
                            </div>
                        </div>
                </div>

                <div class="control column">
                    <button type="submit" class="button is-link">Save</button>
                    <router-link class="button is-warning" to="/">Cancel</router-link>
                </div>
            </form>
        </div>

         <!-- MODAL  -->
        <div class="modal animated pulse" v-bind:class="{'is-active':isActive}">
        
        <div class="modal-background"></div>
            <div class="modal-card">
                
                <section class="modal-card-body">
                <!-- Content ... -->
                    <div class="level-item has-text-centered">
                        <p>You have successfully added {{ uid_user }} :  {{ firstname }} {{ lastname}}  </p>
                    </div>
                    <br>
                    <div class="level-item has-text-centered">
                        <router-link to="/" class="button is-success" >Confirm</router-link>
                    </div>
                </section>

            </div>
        </div>
        <!-- END OF MODAL -->

    </div>

    <!-- Error if auth not sec -->
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
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth';


export default {
    name: 'add',
    data () {
        return {
            isActive: null,
            uid_user: null,
            num: Math.floor((Math.random() * 9999) + 1),
            downloadURL: null,
            disbleUploadButton: false,

            // inputs
            firstname: null,
            lastname: null,
            middlename: null,
            age: null,
            dateOfBirth: null,
            address: null,
            height: null,
            weight: null,
            bloodpressure: null,
            temperature: null,

            // Auth
            isSecretary: 'leeBwCnWn8bolFBMkWYfVRcNoiV2',
            isDoctor: 'tBZvsX581AOoPZu0ZeV4XG71FUi2',
            currentUser: null,

            isRequired: false,
            isEmpty: null
        }
    },
    created() {
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
    methods: {
        addUser () {
            if(this.firstname != null && this.lastname != null && this.middlename != null && this.age != null && this.dateOfBirth != null && this.address != null && this.height != null && this.weight != null && this.bloodpressure != null && this.downloadURL != null && this.temperature != null ) {
                db.collection('users').add({
                    uid_user: this.num,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    middlename: this.middlename,
                    age: this.age,
                    dateOfBirth: this.dateOfBirth,
                    address: this.address,
                    height: this.height,
                    weight: this.weight,
                    bloodpressure: this.bloodpressure,
                    temperature: this.temperature,
                    imageURL: this.downloadURL
                })
                .then(() => {
                    // alert('You just successfully added a patient', this.firstname, ' ', this.lastname)
                    this.launch()
                    // this.$router.push('/')
                })
            } else {
                this.isRequired = true
                this.isEmpty = 'Fill out all forms'
            }
        },
        uploadImage (e) {
            // disble upload button so user cant click again
            this.disbleUploadButton = true
            // Get file
            let file = e.target.files[0]
            // Create a storage ref
            let storageRef = firebase.storage().ref()
            //Upload file
            let uploadTask = storageRef.child('userImages/' + file.name)
            uploadTask.put(file)
            uploadTask.getDownloadURL().then((downloadURL) => {
                this.downloadURL = downloadURL
            }).catch(error => alert('You can only add one picture per prpfile', error.code, ' try refreshing the page'))
        },
        launch () {
            this.isActive = true;
        },
    }
}
</script>

