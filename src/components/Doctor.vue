<template>
    <div id="doctor">
    <div v-if="currentUser == isDoctor">    
        <div class="column">
            <div>
                <b class="is-pulled-left" style="color: white">Patients to be Check:</b>
                <b class="is-pulled-right"><div class="tag is-warning is-large"> {{ count }} </div> </b>
            </div>
            <br>
            <hr>
            <div class="column">
                <b class="is-pulled-left tag is-link">Patient ID Number</b>
                <b class="is-pulled-right tag is-warning">Date Check by Secretary</b>
            </div>
            <br>
            <hr>
            <div v-if="userHistorys.length >= 1">
                <div v-for="userHistory in userHistorys" :key="userHistory.id">
                    <router-link
                    v-bind:to="{name: 'diagnos', params: {usersId: userHistory.usersId, userHistoryId: userHistory.id}}"
                    class="box"
                    >
                    <div class="is-pulled-left">{{ userHistory.usersId }}</div>
                    <div class="is-pulled-right">{{ userHistory.date }}</div>
                    </router-link>

                </div>
            </div>
            <div v-else>
                <div class="box has-text-centered animated shake">There is no patient to check</div>
            </div>
        </div>
    </div>
    <div v-else>
        <p id="p" class="box has-background-danger has-text-light">
            Only Doctor can Access this page
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
    name: 'doctor',
    data () {
        return {
            userHistorys: [],
            userProfile: [],
            usersId: null,
            count: null,
            currentUser: null,
            isSecretary: 'leeBwCnWn8bolFBMkWYfVRcNoiV2',
            isDoctor: 'tBZvsX581AOoPZu0ZeV4XG71FUi2'

        }
    },
    created () {
        //get users history
        db.collection('history').orderBy('date').where('isCheck', '==', true).get().then(querySnapshot => {

            //count
            const size = querySnapshot.size
            //looping data
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'date': doc.data().date.toString(),
                    'reasonForCheckup': doc.data().reasonForCheckup,
                    'usersId': doc.data().usersId
                }
                this.userHistorys.push(data)
                this.usersId = doc.data().usersId
            })
            this.count = size
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
<style>
.box {
    margin-bottom: 7px;
    padding-bottom: 30px;
}

#p {
    text-align: center;
    font-size: 30px;
}

</style>


