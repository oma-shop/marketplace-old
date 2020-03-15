<template>
  <div class="storefront">
    <h1>Online Marketplace Application Demo</h1>
    <p>You can browse stores, products and even buy them with iota tokens! It's 100% feeless!</p>
    <router-link to="/products">Discover Products!</router-link>
    <h2>
      Your connected to store:
      <strong v-if="shop.data">{{ shop.data.name }}</strong>
    </h2>
    <h3>Connect to another shop?</h3>
    <el-form :inline="true" :model="form">
      <el-form-item label="Fill in shop root">
        <el-input v-model="form.root" placeholder="Shop root address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Change Shop</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Storefront",
  data() {
    return {
      form: {
        root: ""
      }
    };
  },
  computed: {
    shop: function() {
      return this.$store.getters.getShopDetails;
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      this.$store.dispatch("fetchShopDetails", this.form.root).then(() => {
        console.log("new shop loaded");
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.storefront {
  margin: 50px;
}
</style>