<template>
  <div class="storefront">
    <div class="div1" bgcolor="#28222C">
      &nbsp;&nbsp;
      <center>
        <h1>
          <font color="#409EFF">Online Marketplace Application Demo</font>
        </h1>
        <br />
        <br />
          <a href="#" class="discover" v-scroll-to="'#products'">Discover more</a>
      </center>
      <!--<p>You can browse stores, products and even buy them with iota tokens! It's 100% free and feeless!</p>-->
      <!--<router-link to="/products">Discover Products!</router-link>-->
      &nbsp;&nbsp;
        &nbsp;&nbsp;
        <center>
          <div v-if="connected">
            <h2 color="#FFFFFF">You are connected to store:</h2>
            <strong v-if=" $store.state.shop.shop.data">{{ $store.state.shop.shop.data.name }}</strong>
          </div>
          <div v-else>
            <p>not connected</p>
          </div>
        </center>

      <p>
        <center>
          <font color="#FFFFFF">Connect to another shop?</font>
        </center>
      </p>
      <el-form :label-position="top" :model="form">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
        </el-row>
        <el-main>
          <div class="form_wrapper">
            <el-form-item label="Paste shop address">
              <el-input class="shop_input" autofocus v-model="form.root" placeholder="Shop address"></el-input>
            </el-form-item>
          </div>
        </el-main>
      </el-form>
      <ProductList />
    </div>
    <img class="wave" src="/src/assets/wave.svg" />
  </div>
</template>

<script>
import ProductList from "./components/productList";

export default {
  name: "Storefront",
  components: { ProductList },
  data() {
    return {
      connected: false,
      form: {
        root:
          ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      console.log("store!", this.$store);
      console.log("store2!", this.$store.state.shop.shop);
      this.$store.dispatch("FetchShopDetails", this.form.root).then(() => {
        console.log("store3!", this.$store.state.shop.shop);
        console.log("new shop loaded");
      });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.storefront {
  margin: -30px 0px 0px 0px;
  width: 100%;
  height: 100vh;
  display: block;
  background-color: #28222c;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #28222c;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-input {
  color: #ffffff;
}
.div1 {
  margin: 0 0 0px 0;
}
.wave {
  position: fixed;
  width: 100%;
  height: 148px;
  top: 100vh;
  left: 0;
  z-index: 1000;
}

.shop_input {
  width: 80%;
}

.form_wrapper {
  text-align: center;
}

.discover {
  color: var(--white);
  font-size: .8em;
  &:hover {
    color: var(--text) !important;
  }

}
p {
  color: #FFF;
}
</style>