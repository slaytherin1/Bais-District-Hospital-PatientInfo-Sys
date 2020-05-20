<template>
    <div id="userHistoryMore" class="container animated slideInLeft">

        <!-- PRINT START -->
        <vue-easy-print tableShow ref="easyPrint" >
        <template>
        <div class="box">
            <div class="media-left">
                <figure class="image is-128x128">
                    <img :src="imageURL" alt="user photo id here">
                </figure>
            </div>
            <div class="media-content media-right">
                <div class="content">
                    <div class="column">
                        <p><b class="tag is-primary">User Profile </b></p>
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
                            <div class="column is-2">
                                <b>weight: </b> {{ userProfile.weight }}
                            </div>
                            <div class="column is-2">
                                <b>BP: </b> {{ userProfile.bloodpressure }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="column">
                        <p><b class="tag is-primary">User History </b></p>
                        <!-- <p>Params: {{ this.$route.params.userHistoryId }}</p> -->
                        <div class="columns is-multiline is-vcentered">
                            <div class="column is-12">
                                <b>Date recorded: </b> {{ date }}
                            </div>
                            <div class="column is-12">
                                <b>Reason for Check up: </b> {{ reasonForCheckup }}
                            </div>
                            <div class="column is-12">
                                <div v-if="prescription != null">
                                    <b>Doctor's Prescription:</b> {{ prescription }}
                                </div>
                                <div v-else> <b class="has-text-danger">{{ noPrescription }} </b> </div>
                            </div>
                            <div class="column is-12">
                                <div v-if="isCheck == true">
                                    <button class="button is-success" @click="updateHistory" disabled>Sent Already</button>
                                </div>
                                <div v-else>
                                    <div v-if="status == false">
                                    <button class="button is-success" @click="updateHistory">Send</button>
                                    </div>
                                    <div v-else id="doneChecking"><div class="tag is-warning animated tada">Done Checking</div></div>
                                </div>

                                <div class="is-pulled-right">
                                    <button class="button is-link" @click="print">Print</button>
                                </div>
                                <div class="is-pulled-right">
                                    <router-link to="/" class="button is-warning">Cancel</router-link>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
        </template>
        </vue-easy-print>  


        <!-- MODAL  -->
        <div class="modal animated pulse" v-bind:class="{'is-active':isActive}">
        
        <div class="modal-background"></div>
            <div class="modal-card">
                
                <section class="modal-card-body">
                <!-- Content ... -->
                    <div class="level-item has-text-centered">
                        <p> {{ successTxt }}  </p>
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
</template>

<script>
import db from './firebaseInit'
import vueEasyPrint from 'vue-easy-print'

export default {
    name: 'userHistoryMore',
    components: {
        vueEasyPrint,
    },
    data() {
        return {
            userProfiles: [],
            date: null,
            reasonForCheckup: null,
            usersId: null,
            userProfileId: null,
            isCheck: null,
            status: null,
            prescription: null,
            imageURL: null,

            // if empty
            noPrescription: null,
            isActive: null,
            successTxt: null,

            // inputs
            firstname: null,
            lastname: null,
            middlename: null,
            age: null,
            dateOfBirth: null,
            address: null,
            height: null,
            weight: null,
            bloodpressure: null
        }
    },
    beforeRouteEnter (to, from, next) {
        // Get User Profile in previous route
        db.collection('users').where('uid_user', '==', to.params.userProfileId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(userProf => {
                    userProf.id = doc.id,
                    userProf.name = doc.data().name,
                    userProf.uid_user = doc.data().uid_user
                })
            })
        })
        // Get User History in previous route
        db.collection('history').where('usersId', '==', to.params.userHistoryId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(userHist => {
                    userHist.id = doc.id,
                    userHist.usersId = doc.data().usersId,
                    userHist.note = doc.data().note,
                    userHist.isCheck = doc.data().isCheck,
                    userHist.date = doc.data().date
                })
            })
        })
    },
    created() {
        // Get User Profile
        db.collection('users').where('uid_user', '==', this.$route.params.userProfileId).get().then(querySnapshot => {
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
                    this.isCheck = doc.data().isCheck
                    this.status = doc.data().status
                        if(doc.data().prescription != null) {
                            this.prescription = doc.data().prescription
                        } else {
                            this.noPrescription = 'Doctor has not yet provided Prescription'
                        }
                }
            })
    },
    methods: {
        updateHistory() {
            db.collection('history').doc(this.$route.params.userHistoryId).update({
                isCheck: true
            })
            .then(() => {
                this.successTxt = 'Successfully send to the doctor'
                this.launch()
            })
            .catch((error) => {
                alert('ERROR: ', error)
                this.router.push('/')
            })
        },
        print () {
            this.$refs.easyPrint.print()
        },
        launch () {
            this.isActive = true;
        },
    }
}
</script>

<style scoped>
@media print {
    .button {
        display: none;
    }
    figure, img {
        height: 128px;
        width: 128px;
        display: inherit;
    }
    #doneChecking {
        display: none;
    }


}

.button {
    margin-right: 10px;
}

.box {
    margin-top: 0%;
}

div {
    animation-duration: 3s;
}
</style>

