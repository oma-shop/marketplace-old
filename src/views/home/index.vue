<template>
  <div class="main">
    <nav-bar></nav-bar>
    <Storefront />
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/index";
import Storefront from "@/components/Storefront/index";

export default {
  name: "home",
  components: {
    NavBar, Storefront
  },
  data() {
    return {
      activeNames: ["1", "2", "3"]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
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
