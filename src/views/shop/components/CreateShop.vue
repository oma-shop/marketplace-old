<template>
  <div v-loading="loading" class="shop-details-form-container">
    <el-alert v-if="published" title="Shop is not published yet!" type="warning">
      <p>You can add your shop details and publish it!</p>
    </el-alert>

    <el-form ref="form" :model="form" class="form-container">
      <p>You can add your shop details and publish it to the tangle!</p>

      <div class="shop-details-form-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Name:">
              <el-input
                v-model="form.name"
                :rows="1"
                type="text"
                class="shop-name"
                autosize
                placeholder="Your shop name"
              />
            </el-form-item>

            <el-form-item label="Location">
                <LocationChooseMap @update="updateIac"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-button @click="onCancel" type="warning">Cancel</el-button>
      <el-button style="margin-left: 10px;" type="success" @click="onSubmit">Create</el-button>
    </el-form>
  </div>
</template>

<script>
import Sticky from "@/components/Sticky";

import { createShop } from "@/utils/MAM";
import LocationChooseMap from "@/components/LocationChooseMap";

export default {
  name: "CreateShop",
  components: { Sticky, LocationChooseMap },
  props: {
    published: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      shop: {},
      form: {
        name: ""
      }
    };
  },
  created() {
    // fetch shop from database
    let shop_string = localStorage.getItem("shop") || "{}";
    this.shop = JSON.parse(shop_string);
  },
  methods: {
    onSubmit: async function() {
      // save it to mam!
      this.loading = true;

      if(this.iac && this.showMap) {
        this.form.iac = this.iac
      }

      let shop = await createShop(this.form, "shop");

      // save new shop secrets in database
      const parsed = JSON.stringify(shop);
      localStorage.setItem("shop", parsed);

      this.loading = false;
      this.$router.push("/dashboard");
    },
    onCancel() {
      this.$router.push("/dashboard");
    },
    updateIac(newIac) {
      this.form.iac = newIac
    }
  }
};
</script>