<template>
    <div id="addUserHistory container">
        <div class="animated fadeInRight">
        <h1><b class="has-text-white"> Adding Patients's record </b></h1>


            <form @submit.prevent="addUsersHistory">
            <div class="field is-grouped columns is-multiline" >
                    <div class="column is-2">
                        <div class="control">
                            <input class="input" type="text" placeholder="uid_user" v-model="usersId" readonly>
                        </div>
                    </div>

                    <div v-if="isEmpty != null"><b class="tag animated shake is-danger column is-12"> {{ isEmpty }} </b></div>

                    <div class="column is-12" v-bind:class="{'animated shake': isRequired}">
                            <textarea class="textarea" v-bind:class="{'is-danger': isRequired}" placeholder="Reason for check up" v-model="reasonForCheckup"></textarea>
                    </div>
                    <div class="column is-12">
                        <button type="submit" class="button is-link">Add History</button>
                        <router-link class="button is-warning" to="/">Cancel</router-link>
                    </div>
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
                        <p>You have successfully added a Record  </p>
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

export default {
    name: 'addUserHistory',
    data () {
        return {
            usersId: this.$route.params.uid_user,
            reasonForCheckup: null,
            date: Date(),
            isRequired: false,
            isEmpty: null,
            isActive: null
        }
    },
    // beforeRouterEnter (to, from, next) {
    //     db.collection('history').where('usersId', '==', to.params.uid_user).get().then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //             next(vm => {
    //                 vm.usersId = doc.data().usersId,
    //                 vm.note = doc.data().note
    //             })
    //         })
    //     })
    // },
    methods: {
        addUsersHistory () {
            if(this.reasonForCheckup != null) {
                db.collection('history').add({
                usersId: this.usersId,
                date: this.date,
                isCheck: false,
                status: false,
                reasonForCheckup: this.reasonForCheckup
                })
                .then(() => {
                    this.launch()
                })
            } else {
                this.isRequired = true
                this.isEmpty = 'Enter a Reason for checkup!'
            }
        },
        launch () {
            this.isActive = true;
        },
    }
}
</script>
<style>
.page {
    position: fixed;
    width: inherit;
}
</style>


