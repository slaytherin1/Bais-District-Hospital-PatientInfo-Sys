<template>
    <div id="UserHistory" class="columns is-multiline">
        <div class="column is-12">
            <b class="tag is-primary">User's History</b>

            <router-link 
            :to="{name: 'addUserHistory', 
            params: {uid_user: route_uid_user}}" 
            class="button is-primary is-link is-pulled-right">
                Add Record
            </router-link>
        </div>

        <div class="column is-12">

        <h3><b>Date of Added Record: </b></h3>
        <br>
        <div v-if="usersHistorys.length > 0">
            <div v-for="usersHistory in usersHistorys" :key="usersHistory.id">
                <div class="box animated fadeInUp">
                    <div class="media-content">
                        {{ usersHistory.date }}

                        <div v-if="usersHistory.status == true">
                            <router-link 
                            v-bind:to="{name: 'userHistoryMore', params: {userProfileId: route_uid_user, userHistoryId: usersHistory.id }}"
                            class="button is-small is-primary is-link is-pulled-right">
                            See more
                            </router-link>
                            <div class="tag is-small is-success is-pulled-right animated tada">Done Checking</div>
                        </div>

                        <div v-else>
                            <router-link 
                            v-bind:to="{name: 'userHistoryMore', params: {userProfileId: route_uid_user, userHistoryId: usersHistory.id }}"
                            class="button is-small is-primary is-link is-pulled-right" >
                            See more
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else> <p>There is no History of this User</p>  </div>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'UserHistory',
    data() {
        return {
            usersHistorys: [],
            route_uid_user: null,
        }
    },
    props: ['uid_user'],
    beforeRouteEnter (to, from, next) {
        db.collection('history').where('usersId', '==', to.params.uid_user)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.id = doc.id,
                    vm.usersId = doc.data().usersId,
                    vm.note = doc.data().note
                })
            })
        })     
    },
    created () {
        db.collection('history').where('usersId', '==', this.$route.params.uid_user).orderBy("date" , "desc").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'usersId': doc.data().usersId,
                    'date': doc.data().date,
                    'isCheck': doc.data().isCheck,
                    'status': doc.data().status
                }
                this.usersHistorys.push(data)
            })
            this.route_uid_user = this.$route.params.uid_user
        })
        // // REAL TIME UPDATES
        // db.collection('history').where('usersId', '==', this.route_uid_user).onSnapshot( (snapshot) => {
        //     snapshot.docChanges().forEach((change) => {

        //         if(change.type === 'added') {
        //             const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server"; 
        //             if(source === 'Server') {
        //                 const data = {
        //                     'id': change.doc.id,
        //                     'usersId': change.doc.data().usersId,
        //                     'note': change.doc.data().note,
        //                     'isCheck': change.doc.data().isCheck
        //                 }
        //                 this.usersHistorys.push(data)
        //                 this.usersHistorys.splice(data, 1)
        //             }
        //         }
        //         if(change.type === 'modified') {
        //             const data = {
        //                 'id': change.doc.id,
        //                 'usersId': change.doc.data().usersId,
        //                 'note': change.doc.data().note,
        //                 'isCheck': change.doc.data().isCheck
        //             }
        //             this.usersHistorys.push(data)
        //         }
        //         if(change.type === 'removed') {
        //             const data = {
        //                 'id': change.doc.id,
        //                 'usersId': change.doc.data().usersId,
        //                 'note': change.doc.data().note,
        //                 'isCheck': change.doc.data().isCheck
        //             }
        //             this.usersHistorys.push(data)
        //         }
        //     })
        // })   

    },
    methods: {

    }   
}
</script>

<style scoped>
.tag {
    margin-right: 5px;
}

</style>

