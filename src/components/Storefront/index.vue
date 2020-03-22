<template>
  <div class="storefront">
    <div class="div1" bgcolor="#28222C">
      &nbsp;&nbsp;
      <center>
        <h1>
          <font color="#409EFF">Online Marketplace Application Demo</font>
        </h1>
      </center>
      <!--<p>You can browse stores, products and even buy them with iota tokens! It's 100% free and feeless!</p>-->
      <!--<router-link to="/products">Discover Products!</router-link>-->
      &nbsp;&nbsp;
      <h2>
        &nbsp;&nbsp;
        <center>
          <font color="#FFFFFF">
            
            You are connected to store:
          </font>
          <strong v-if=" $store.state.shop.shop.data">{{ $store.state.shop.shop.data.name }}</strong>
        </center>
      </h2>
      <h3>
        <center>
          <font color="#FFFFFF">Connect to another shop?</font>
        </center>
      </h3>

      <el-form :inline="false" :model="form">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
        </el-row>
        <el-main><el-form-item size="large" label="Fill in shop root"><el-link href="https://google.de" type="primary">(?)</el-link>
          <el-input autofocus v-model="form.root" placeholder="Shop root address"></el-input>
        </el-form-item></el-main>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Change Shop</el-button>
        </el-form-item>
      </el-form>
      <div class="wave">
        <img src="/src/assets/wave.svg" />
      </div>
      <h2>All Products</h2>
      
      <ProductList />
      <a href="#" v-scroll-to="'#element'">Scroll to #element</a>
    </div>
  </div>
</template>

<script>
import ProductList from "./components/productList";
import Popup from './components/popup'

export default {
  name: "Storefront",
  components: { ProductList, Popup },
  data() {
    return {
      form: {
        root:
          "NHHBDSISWAIT9BSA9JNON9CDYZHDEXFAOJFTF9MDVMLCWQFQB9IBIAMQTDBTZFQDEGQZSPLDASVIWQPGD"
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
  height: 90vh;
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
  color: #FFFFFF;
}
.div1
{
margin:0 0 0px 0; 
}
.wave
{
position: absolute;
width: 100%; 
height: 100vh;
}

</style>