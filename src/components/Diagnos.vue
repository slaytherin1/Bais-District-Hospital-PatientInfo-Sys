<template>
    <div id="diagnos" class="container animated slideInLeft">
        <div class="box">
            <div class="media-left">
                <figure class="image is-128x128">
                    <img :src="imageURL" alt="user photo id here">
                </figure>
            </div>
            <div class="media-content media-right">
                <div class="content">
                    <div class="column">
                        <h3><b class="tag is-primary">User Profile</b></h3>
                        <!-- <p>Params: {{ this.$route.params.usersId }}</p> -->
                        <div v-for="userProfile in userProfiles" :key="userProfile.id">
                            <div class="columns is-multiline" v-for="userProfile in userProfiles" :key="userProfile.uid_user">
                                <div class="column is-5">
                                    <b>Patient #: </b> {{ userProfile.uid_user }}
                                </div>
                                <div class="column is-5">
                                    <b>Patient Name: </b> {{ userProfile.firstname}} {{ userProfile.middlename }} {{ userProfile.lastname}}
                                </div>
                                <div class="column is-2">
                                    <b>Age: </b> {{ userProfile.age }}
                                </div>
                                <div class="column is-5">
                                    <b>Date of Birth: </b> {{ userProfile.dateOfBirth }}
                                </div>
                                <div class="column is-5">
                                    <b>Address: </b> {{ userProfile.address }}
                                </div>
                                <div class="column is-2">
                                    <b>height: </b> {{ userProfile.height }}
                                </div>
                                <div class="column is-5">
                                    <b>weight: </b> {{ userProfile.weight }}
                                </div>
                                <div class="column is-2">
                                    <b>BP: </b> {{ userProfile.bloodpressure }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="column is-multiline">
                        <h3><b class="tag is-primary">User History</b></h3>
                        <!-- <p>Params: {{ this.$route.params.usersId }}</p> -->
                        <div class="column is-12">
                           <b>Date:</b> {{ date }}
                        </div>
                        <div class="column is-multiline">
                            <b>Reason For Check up:</b> {{ reasonForCheckup }}
                        </div>
                    </div>

                    <hr>

                    <!-- Diagnostics area -->
                    <div class="column">
                        <h3><b>Enter Diagnostics here</b></h3>
                        <div class="is-12">
                            <div class="field">
                                <label class="label">Prescription</label>
                                <div class="control">
                                    <textarea class="textarea" v-model="prescription"></textarea>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="is-6">
                            <button class="button is-link is-pulled-right" @click="giveDiagnostics">Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <!-- MODAL  -->
        <div class="modal animated pulse" v-bind:class="{'is-active':isActive}">
        
        <div class="modal-background"></div>
            <div class="modal-card">
                
                <section class="modal-card-body">
                <!-- Content ... -->
                    <div class="level-item has-text-centered">
                        <p>You have successfully give your inputs  </p>
                    </div>
                    <br>
                    <div class="level-item has-text-centered">
                        <router-link to="/doctor" class="button is-success" >Confirm</router-link>
                    </div>
                </section>

            </div>
        </div>
        <!-- END OF MODAL -->

    
    </div>
</template>
<script>
import db from './firebaseInit'

export default {
    name: 'diagnos',
    data() {
        return {
            userProfiles: [],
            date: null,
            reasonForCheckup: null,
            userProfileId: null,
            usersId: null,
            // doctor inputs
            reason: null,
            prescription: null,
            imageURL: null,
            isActive: null
        }
    },
    beforeRouteEnter(to, from ,next) {
        // Get User Profile in previous route
        db.collection('users').where('uid_user', '==', to.params.usersId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(usersProf => {
                    usersProf.id = doc.id,
                    usersProf.name = doc.data().name,
                    usersProf.uid_user = doc.data().uid_user
                })
            })
        })
        // Get User History in previous route
        db.collection('history').where('usersId', '==', to.params.usersId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(usersHist => {
                    usersHist.id = doc.id,
                    usersHist.usersId = doc.data().usersId,
                    usersHist.reasonForCheckup = doc.data().reasonForCheckup,
                    usersHist.isCheck = doc.data().isCheck,
                    usersHist.date = doc.data().date
                })
            })
        })
    },
    created() {
        // Get User Profile 
        db.collection('users').where('uid_user', '==', this.$route.params.usersId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.imageURL = doc.data().imageURL
                const data = {
                    'id': doc.id,
                    'uid_user': doc.data().uid_user,
                    'firstname': doc.data().firstname,
                    'middlename': doc.data().middlename,
                    'lastname': doc.data().lastname,
                    'age': doc.data().age,
                    'dateOfBirth': doc.data().dateOfBirth,
                    'address': doc.data().address,
                    'height': doc.data().height,
                    'weight': doc.data().weight,
                    'bloodpressure': doc.data().bloodpressure,
                }
                this.userProfiles.push(data)
            })
        })
        // Get User History
        db.collection('history').doc(this.$route.params.userHistoryId).get()
        .then(doc => {
            if(doc.exists) {
                this.userProfileId = doc.id
                this.date = doc.data().date.toString()
                this.reasonForCheckup = doc.data().reasonForCheckup
                this.usersId = doc.data().usersId
            }
        })
    },
    methods: {
        giveDiagnostics() {
            db.collection('history').doc(this.$route.params.userHistoryId).set({
                reasonForCheckup: this.reason,
                prescription: this.prescription,
                isCheck: false,
                status: true
            }, {merge: true})
            .then(() => {
                this.launch()
            }).catch(error => alert('ERROR: ', error))
        },
        launch() {
            this.isActive = true
        }
    }
}
</script>

<style scoped>
.button {
    margin-right: 10px;
}

</style>


