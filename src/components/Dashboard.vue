<template>
    <div id="dashboard" class="container">
            <div v-for="user in users" :key="user.id">
                <span class="tag is-link">
                    <router-link 
                        v-bind:to="{name: 'showmore', 
                        params: {uid_user: user.uid_user}}"
                        class="has-text-white">
                        {{ user.uid_user }} {{ user.name }}
                    </router-link>
                </span>
            </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'dashboard',
    data () {
        return {
            users: []
        }
    },
    created () {
        db.collection('users').orderBy('uid_user').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'uid_user': doc.data().uid_user,
                    'name': doc.data().name
                }
                this.users.push(data)
            })
        })

        // db.collection('users').orderBy('uid_user').get().then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //         const data = {
        //             'id': doc.id,
        //             'uid_user': doc.data().uid_user,
        //             'name': doc.data().name
        //         }
        //         this.users.push(data)
        //     })
        // })
    }
}
</script>
