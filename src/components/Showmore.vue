<template>
    <div id="showmore page">

        <div class="box">
            <article class="media">
                <div class="media-left animated bounce delay-5s">
                    <figure class="image is-128x128">
                        <img v-bind:src="imageURL" alt="test">
                    </figure>
                </div>

                <div class="media-content">
                    <div class="content">
                        <b class="tag is-primary">User's Profile</b>
                            <div class="columns is-multiline">
                                <div class="column is-4 animated fadeInUP">
                                    <b>Patient #: </b> {{ uid_user }}
                                </div>
                                <div class="column is-5">
                                    <b>Patient Name: </b> {{ firstname}} {{ middlename }} {{ lastname}}
                                </div>
                                <div class="column is-2">
                                    <b>Age: </b> {{ age }}
                                </div>
                                <div class="column is-4">
                                    <b>Date of Birth: </b> {{ dateOfBirth }}
                                </div>
                                <div class="column is-5">
                                    <b>Address: </b> {{ address }}
                                </div>
                                <div class="column is-2">
                                    <b>height: </b> {{ height }}
                                </div>
                                <div class="column is-4">
                                    <b>weight: </b> {{ weight }} kg
                                </div>
                                <div class="column is-5">
                                    <b>BP: </b> {{ bloodpressure }}
                                </div>
                                <div class="column is-3">
                                    <b>Temperature: </b> {{ temperature }} °C
                                </div>
                                <div class="column is-12">
                                    <router-link to="/" class="button is-light is-small" >Back</router-link>
                                    <router-link v-bind:to="{name: 'edit', params: {uid_user: uid_user}}" class="button is-warning is-small" >Edit</router-link>
                                    
                                    <!-- MODAL BUTTON -->
                                    <button class="button is-primary is-small" @click="launch">See ID</button>
                                    <!-- <button class="button is-danger is-small is-pulled-right" @click="deleteUser">Delete</button> -->

                                <!-- MODAL  -->
                                    <div class="modal animated zoomIn" v-bind:class="{'is-active':isActive}">
                                    
                                    <div class="modal-background"></div>
                                        <div class="modal-card">
                                            
                                            <vue-easy-print tableShow ref="easyPrint" >
                                            <template>
                                            
                                            <header class="modal-card-head">
                                            <p class="modal-card-title has-text-centered">Patient Information System</p>
                                            <button class="delete" aria-label="close" @click="close"></button>
                                            </header>
                                            <section class="modal-card-body">
                                            <!-- Content ... -->
                                                <div class="level-item has-text-centered">
                                                        <img :src="imageURL" class="has-text-centered" style="height: 128px; weight: 128px; margin-bottom: 40px;">
                                                </div>
                                                <div class="level-item has-text-centered">
                                                        <p>ID Number: <u> {{ uid_user }} </u></p>
                                                </div>
                                                <div class="level-item has-text-centered">
                                                        <p>Patient Name: <u> {{ firstname }} {{ middlename }} {{ lastname }} </u></p>
                                                </div>
                                            </section>

                                            </template>
                                            </vue-easy-print>

                                            <footer class="modal-card-foot">
                                                <div class="level-item has-text-centered">
                                                    <router-link v-bind:to="{name: 'edit', params: {uid_user: uid_user}}" class="button is-warning" >Edit</router-link>
                                                    <button class="button is-link" @click="print">Print</button>
                                                </div>
                                            </footer>
                                        </div>
                                    </div>



                                </div>
                            </div>
                    </div>
                    <hr>
                    <UserHistory :uid_user=uid_user />
                </div>
            </article>
        </div>

    </div>
</template>

<script>
import db from './firebaseInit'
import UserHistory from '@/components/UserHistory.vue'
import vueEasyPrint from 'vue-easy-print'

export default {
    name: 'showmore',
    components: {
        UserHistory,
        vueEasyPrint
    },
    data () {
        return {
            isActive: false,

            uid_user: null,
            id: null,
            findings: null,

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
            imageURL: null

        }
    },
    beforeRouteEnter (to, from ,next) {
        db.collection('users').where('uid_user', "==", to.params.uid_user)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.uid_user = doc.data().uid_user,
                    vm.name = doc.data().name,
                    vm.id = doc.id
                })
            })
        })
    },
    watch: {
        // '$route': 'fetchData'
    },
    created () {
        db.collection('users').where('uid_user', '==', this.$route.params.uid_user).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.uid_user = doc.data().uid_user
                this.firstname = doc.data().firstname
                this.lastname = doc.data().lastname
                this.middlename = doc.data().middlename
                this.age = doc.data().age
                this.dateOfBirth = doc.data().dateOfBirth
                this.address = doc.data().address
                this.height = doc.data().height
                this.weight = doc.data().weight
                this.bloodpressure = doc.data().bloodpressure
                this.imageURL = doc.data().imageURL,
                this.temperature = doc.data().temperature
            }) 
        })
    },
    methods: {
        deleteUser() {
            if(confirm('Are you ?')) {
                db.collection('users').where('uid_user', '==', this.$route.params.uid_user).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                        this.$router.push('/')
                    }) 
                })
            }
        },
        launch () {
            this.isActive = true;
        },
        close () {
            this.isActive = false;
        },
        print () {
            this.$refs.easyPrint.print()
        }
    }
}
</script>
<style>
@media print {
    button .button {
        display: none;
    }

    footer .modal-card-foot {
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

div {
    animation-duration: 3s;
}
</style>

