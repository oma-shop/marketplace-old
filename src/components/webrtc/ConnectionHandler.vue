<template>
<div>
      <p v-if="!answer">Loading...</p>
      <p v-else>{{answer}}</p>
      <p>{{connection_url}}</p>
      <div v-if="creating">
          <el-button @click="createOffer">createOffer</el-button>
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
            offer: ''
        }
    },
    created() {
        console.log("connector created") 
        console.log("Seed" ,this.$route.query.seed) 
        let seed = this.$route.query.seed
        if(seed) {
            
            let key = this.$route.query.key
            console.log("Key" ,this.$route.query.key)
            readStream(seed, key).then((data) => {

                if(data.type === 'offer') {
                    console.log("sucess getConnectionData ", data)
                    this.peer = new Peer({ initiator: false, trickle: false })
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
                } else {
                    console.log("its an answer!")
                    console.log("connect", data)
                    console.log("peer", this.peer)
                    this.peer.signal(data)
                    let self = this
                    this.peer.on('connect', () => {
                        // wait for 'connect' event before using the data channel
                        console.log("connected!")

                        self.peer.send('hey peer2, how is it going?')
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
            let self = this;
            this.peer.on('signal', function (data) {
                console.log("data", data)
                if(data.type === 'offer') {
                    // publish to mam
                    let seed = generateSeed()
                    let key = 'H'
                    self.connection_url = 'http://localhost:9528/#/connection?seed=' + seed + '&key=' + key
                    console.log("SEED", seed)
                    createWebRTC(seed, key, data).then((data) => {
                        console.log("sucess createWebRTC ", data)
                        console.log("sucess root ", data.root)
                    }).catch((err) => {
                        console.log("err createWebRTC ", err)
                    })
                    self.offer = JSON.stringify(data)
                }
            })

            this.peer.on('data', () => {
                // wait for 'connect' event before using the data channel
                console.log("data!", data)
            })
        },
    }
}
</script>

<style>

</style>