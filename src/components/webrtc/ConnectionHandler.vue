<template>
    <div>
        <h1>Connection Handler</h1>
        <p v-if="loading">Loading...</p>
        <p v-if="answer">{{answer}}</p>
        <p>{{connection_url}}</p>
        <div v-if="creating">
            <el-button v-if="!waiting_for_connection" @click="createOffer">createOffer</el-button>
        </div>
    </div>
</template>

<script>
import { readStream, createAnswer, createWebRTC } from './connection'
var Peer = require('simple-peer')
import { generateSeed } from '@/utils/MAM'

export default {
 data() {
        return {
            creating: false,
            peer: null,
            answer: false,
            connection_url: '',
            offer: '',
            waiting_for_connection: false,
            seed: '',
            loading: false
        }
    },
    created() {
        console.log("connector started") 
        console.log("Seed" ,this.$route.query.seed) 
        let seed = this.$route.query.seed
        if(seed) {
            this.peer = new Peer({ initiator: false, trickle: false })
            
            this.peer.on('data', data => {
                // got a data channel message
                console.log('got a message from peer1: ' + data)
            })
            let key = this.$route.query.key
            console.log("Key" ,key)
            readStream(seed, key).then((data) => {
            console.log("data" , data)

                if(data.type === 'offer') {
                    console.log("its an offer!")
                    console.log("sucess getConnectionData ", data)
                    let self = this;

                    this.peer.signal(data)

                    this.peer.on('signal', data => {
                        console.log("data peer2", data)

                        // got a data channel message
                        if(data.type === 'answer') {

                            createAnswer(seed, key, data).then((response) => {
                                console.log("createAnswer ", response)
                                
                            }).catch((err) => {
                                console.log("err getConnectionData ", err)
                            })

                            self.answer = JSON.stringify(data)
                        }
                    })
                } 
            }).catch((err) => {
                console.log("err getConnectionData ", err)
            })
        } else {
            console.log("no seed providet ")
            this.creating = true
            this.answer = ''
        }
    },
    methods: {
        createOffer() {
            this.peer = new Peer({ initiator: true, trickle: false })
            console.log("peer", this.peer)
            this.loading = true;
            let self = this;
            this.peer.on('signal', function (data) {
                console.log("data", data)
                if(data.type === 'offer') {
                    // publish to mam
                    self.seed = generateSeed()
                    let key = 'H'
                    self.connection_url = 'http://localhost:9528/#/connection?seed=' + self.seed + '&key=' + key
                    console.log("SEED", self.seed)
                    this.waiting_for_connection = true
                    createWebRTC(self.seed, key, data).then((data) => {
                        console.log("sucess createWebRTC ", data)
                        console.log("sucess root ", data.root)
                        self.startWatcher(data.root) 
                    }).catch((err) => {
                        console.log("err createWebRTC ", err)
                    })
                    self.offer = JSON.stringify(data)
                }
            })

            this.peer.on('data', () => {
                // wait for 'connect' event before using the data channel
                console.log("peer:on data!", data)
            })
        },
        startWatcher(root) {
            let self = this
            this.watcher = setInterval(function() {
                // 1 fetch mam message
                console.log("read stream from seed: ", this.seed)
                readStream(this.seed, 'H').then((data) => {
                        console.log("sucess createWebRTC ", data)
                        if(!data) {
                            console.log("No new data found:", data)
                        } else {
                            if(data.type === 'answer') {    
                                console.log("answer found!", data)
                                // is answer? 
                                // connect!
                                console.log("connect!")
                                console.log("peer", self.peer)
                                self.peer.signal(data)
                                self.peer.on('connect', () => {
                                    // wait for 'connect' event before using the data channel
                                    console.log("connected!!!")

                                    self.peer.send('hey peer2, how is it going?')
                                })
                                self.loading = true;
                                clearInterval(self.watcher)
                            } else if(data.type === 'offer') {    
                                console.log("Data still in offer", data)
                            }    else  {    
                                console.log("something went wront", data)
                            }   
                        }
                       
                    }).catch((err) => {
                        console.log("err createWebRTC ", err)
                    })

                // 2 is offer? weiter

            }.bind(this), 10000)
        }
    }
}
</script>

<style>

</style>