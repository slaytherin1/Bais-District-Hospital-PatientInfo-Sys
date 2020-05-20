
<template>
    <div id="edit" class="container page animated fadeInLeft">
        <div class="column is-four-fifths">
            <h1 class="has-text-white">Editing Users Profile</h1>
        <form @submit.prevent="updateUser">
                <div class="field is-grouped columns ">
                        <div class="column is-2">
                            <div class="control">
                                <input class="input" type="text" placeholder="uid_user" v-model="uid_user" readonly>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" type="text" placeholder="firstname" v-model="firstname">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" type="text" placeholder="lastname" v-model="lastname">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" type="text" placeholder="middlename" v-model="middlename">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" type="number" placeholder="age" v-model="age">
                            </div>
                        </div>
                </div>
                <div class="field is-grouped columns">
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" type="date" placeholder="dateOfBirth" v-model="dateOfBirth">
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" type="text" placeholder="address" v-model="address">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" type="number" placeholder="height" v-model="height">
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="control">
                                <input class="input" type="number" placeholder="weight" v-model="weight">
                            </div>
                        </div>
                </div>
                <div class="field is-group columns">
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" type="number" placeholder="bloodpressure" v-model="bloodpressure">
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="control">
                                <input class="input" type="number" placeholder="temperature in °C" v-model="temperature">
                            </div>
                        </div>
                </div>
                <div class="field is-group columns">
                        <div class="column is-12">
                            <div class="control">
                                <input class="button is-link" type="button" value="Update" @click="updateUser">
                                <router-link class="button is-warning" to="/">Cancel</router-link>
                            </div>
                        </div>
                </div>

        </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'edit',
    data () {
        return {
            uid_user: this.$route.params.uid_user,
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
            temperature: null
        }
    },
     beforeRouteEnter (to, from ,next) {
        db.collection('users').where('uid_user', "==", to.params.uid_user).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.uid_user = doc.data().uid_user
                })
            })
        })
    },
    // watch: {
    //     '$route': 'fetchData'
    // },
    created() {
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
                    this.temperature = doc.data().temperature
                }) 
            })
    },
    methods: {
        // fetchData () {
        //     db.collection('users').where('uid_user', '==', this.$route.params.uid_user).get().then(querySnapshot => {
        //         querySnapshot.forEach(doc => {
        //             this.uid_user = doc.data().uid_user
        //             this.firstname = doc.data().firstname
        //             this.lastname = doc.data().lastname
        //             this.middlename = doc.data().middlename
        //             this.age = doc.data().age
        //             this.dateOfBirth = doc.data().dateOfBirth
        //             this.address = doc.data().address
        //             this.height = doc.data().height
        //             this.weight = doc.data().weight
        //             this.bloodpressure = doc.data().bloodpressure
        //             this.temperature = doc.data().temperature
        //         }) 
        //     })
        // },
        updateUser () {
             db.collection('users').where('uid_user', '==', this.$route.params.uid_user).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        uid_user: this.uid_user,
                        firstname: this.firstname,
                        lastname: this.lastname,
                        middlename: this.middlename,
                        age: this.age,
                        dateOfBirth: this.dateOfBirth,
                        address: this.address,
                        height: this.height,
                        weight: this.weight,
                        bloodpressure: this.bloodpressure,
                    })
                    .then(() => {
                        this.$router.push({name: 'showmore', params: {uid_user: this.uid_user}})
                    })
                }) 
            })
        }
    }
}
</script>
<style>
    .page {
        position: fixed;
        width: inherit;
    }
</style>

 