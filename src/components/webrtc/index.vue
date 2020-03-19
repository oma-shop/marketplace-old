<template>
  <div class="webrtc">
      <h2>WebRTC</h2>
      <div>
        <h3>Offer</h3>
         <el-button @click="createOffer" type="primary">
          Create an offer
        </el-button>
        <p>Or paste your friends offer and create an anwer</p>
        <el-input v-model="offer" />
      </div>
      <div>
        <h3>Answer</h3>
         <el-button @click="createAnswer" type="primary">
          Create answer
        </el-button>
        <p>Or paste your friends answer and connect</p>
        <el-input v-model="answer" />
        <el-button @click="connect" type="primary">
          Connect
        </el-button>
        data
        <pre>{{data}}</pre>
        <p>Connection URL: {{ connection_url }}</p>
      </div>
  </div>
</template>

<script>
var Peer = require('simple-peer')
import { generateSeed, createWebRTC } from '@/utils/MAM'
export default {
  data() {
    return {
      offer: '',
      answer: '',
      peer: null,
      data: [],
      connection_url: ''
    }
  }, 
  mounted() {

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
    createAnswer() {
      console.log("offer", this.offer)
      this.peer = new Peer({ initiator: false, trickle: false })
      let self = this;

      this.peer.signal(JSON.parse(this.offer))
      this.peer.on('signal', data => {
        console.log("data peer2", data)

        // got a data channel message
        if(data.type === 'answer') {
            self.answer = JSON.stringify(data)
          }
      })

      this.peer.on('data', data => {
        // got a data channel message
        console.log('got a message from peer1: ' + data)
        self.data.push(data)
      })
    },
    connect() {
      console.log("connect", this.answer)
      console.log("peer", this.peer)
      this.peer.signal(JSON.parse(this.answer))
      let self = this
      this.peer.on('connect', () => {
        // wait for 'connect' event before using the data channel
        console.log("connected!")

        self.peer.send('hey peer2, how is it going?')
      })
    }
  }
}
</script>

<style>
.webrtc {
  margin: 20px;
}
</style>