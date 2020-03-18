<template>
  <div class="main">
    <nav-bar></nav-bar>
    <Storefront />
    <oma-chat 
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :isOpen="isChatOpen"
      :messageList="messageList"
      :messageStyling="messageStyling"
      :newMessagesCount="newMessagesCount"
      :onMessageWasSent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :showCloseButton="true"
      :showLauncher="true"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :titleImageUrl="titleImageUrl"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
    >
    <template v-slot:text-message-toolbox="scopedProps">
        <button v-if="!scopedProps.me && scopedProps.message.type==='text'" @click.prevent="like(scopedProps.message.id)">
          👍
        </button>
      </template>
      <template v-slot:text-message-body="scopedProps"> 
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
        <p v-if="scopedProps.message.data.meta" class='sc-message--meta' :style="{color: scopedProps.messageColors.color}">{{scopedProps.message.data.meta}}</p>
        <p v-if="scopedProps.message.isEdited || scopedProps.message.liked" class='sc-message--edited'>
          <template v-if="scopedProps.message.isEdited">✎</template>
          <template v-if="scopedProps.message.liked">👍</template>
        </p>
      </template>
    </oma-chat>
    <el-button @click.prevent="openChat()">Open Chat</el-button>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/index";
import Storefront from "@/components/Storefront/index";

import messageHistory from './messageHistory'
import chatParticipants from './chatProfiles'
import availableColors from './colors'

console.log("chatParticipants", chatParticipants)
console.log("availableColors", availableColors)

export default {
  name: "home",
  components: {
    NavBar, Storefront
  },
  data() {
    return {
      activeNames: ["1", "2", "3"],
      participants: chatParticipants,
      titleImageUrl:
        'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: '',
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      messageStyling: true,
      userIsTyping: false,
      scopedProps: {
        messageText: 'lalala',
        messageColors: {

        },
        message: {
          data: {
            meta: 'wthat meta?'
          }
        }
      }
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    sendMessage(text) {
        if (text.length > 0) {
          this.newMessagesCount = this.isChatOpen
            ? this.newMessagesCount
            : this.newMessagesCount + 1
          this.onMessageWasSent({
            author: 'support',
            type: 'text',
            id: Math.random(),
            data: { text }
          })
        }
      },
      handleTyping(text) {
        this.showTypingIndicator =
          text.length > 0
            ? this.participants[this.participants.length - 1].id
            : ''
      },
      onMessageWasSent(message) {
        this.messageList = [...this.messageList, Object.assign({}, message, {id: Math.random()})]
      },
      openChat() {
        console.log("openChat")
        this.isChatOpen = true
        this.newMessagesCount = 0
      },
      closeChat() {
        this.isChatOpen = false
      },
      setColor(color) {
        this.colors = this.availableColors[color]
        this.chosenColor = color
      },
      showStylingInfo() {
        this.$modal.show('dialog', {
          title: 'Info',
          text:
            'You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>'
        })
      },
      messageStylingToggled(e) {
        this.messageStyling = e.target.checked
      },
      handleOnType() {
        this.$root.$emit('onType')
        this.userIsTyping = true
      },
      editMessage(message){
        const m = this.messageList.find(m => m.id === message.id);
        m.isEdited = true;
        m.data.text = message.data.text;
      },
      removeMessage(message){
        if (confirm('Delete?')){
          const m = this.messageList.find(m => m.id === message.id);
          m.type = 'system';
          m.data.text = 'This message has been removed';
        }
      },
      like(id){
        const m = this.messageList.findIndex(m => m.id === id);
        var msg = this.messageList[m];
        msg.liked = !msg.liked;
        this.$set(this.messageList, m, msg);
      }
    },
    computed: {
      linkColor() {
        console.log("this.colors")
        return this.chosenColor === 'dark'
          ? this.colors.sentMessage.text
          : this.colors.launcher.bg
      },
      backgroundColor() {
        return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
      }
    },
    mounted(){
      console.log("mounted", this.colors)
      console.log("participants", this.participants)
      console.log("messageList", this.messageList)
      this.messageList.forEach(x=>x.liked = false);
    },
    created() {
      this.setColor('blue')
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container {
  width: 1200px;
  margin: 0 auto;
}

.section {
  padding: 100px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: var(--white);
  &-hero {
    margin-bottom: 30px;
  }
  &__light {
    background-color: #f5f8fa;
  }
  &__dark {
    background-color: var(--dark);
    color: var(--white);
  }
  &__primary {
    background-image: linear-gradient(
      to right bottom,
      #0b5d9e,
      #0074a9,
      #0089ae,
      #2e9db0,
      #5ab0b2
    );
    color: var(--white);
  }
  &__secondary {
    background-image: linear-gradient(
      to right bottom,
      #139b48,
      #48a84f,
      #69b558,
      #86c263,
      #a2cf6f
    );
    color: var(--white);
  }
}

.section--use-case {
  img {
    width: 500px;
  }
  hr {
    border-color: rgba(0, 0, 0, 0.05);
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}

.section--use-case {
  img {
    border-radius: 100%;
  }
  color: var(--dark);
}
.el-collapse {
  border: none;
  margin-left: 40px;
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item {
    background-color: transparent;
    margin-bottom: 30px;
    &__header {
      position: relative;
      border: none;
      font-size: 24px;
      font-weight: 700;
      background-color: transparent;
      i {
        display: none;
      }
    }
    &__content {
      font-size: 16px;
      line-height: 1.5;
    }
    .counter {
      position: absolute;
      left: -40px;
      height: 40px;
      width: 40px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--dark);
      background-color: rgba(0, 0, 0, 0.05);
      transition: all 200ms ease-in-out;
    }
    &.is-active {
      .counter {
        background-color: #69bae8;
        color: var(--white);
      }
    }
  }
}
</style>
