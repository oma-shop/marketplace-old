<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');

html {
  font-family: 'Nunito', sans-serif;
}

body {
    margin: 0px;
}

.main {
  margin-top: 70px;
  padding-top: 24px;
}

:root {
  --primary: #139B48;
  --primary-2: #A2CF6F;
  --secondary: #0B5D9E;
  --secondary-2: #5AB0B2;
  --dark: #081C1D;
  --darker: #0F3535;
  --light: #E2E2E2;
  --white: #FFFFFF;
  --white_5: rgba(255,255,255,.05);
  --white_10: rgba(255,255,255,.1);
  --white_25: rgba(255,255,255,.25);
  --white_50: rgba(255,255,255,.5);
  --red: #F16465;
  --orange: #E69255;
  --yellow: #E6BE54;
  --purple: #8F60A8;
  --background: #28222C;
  --text: #409EFF;

  --border-radius: 10px;
  --border-radius-sm: 5px;

  --box-shadow: 0 3px 6px rgba(0,0,0,.15);

  --transition-in-out: all 0.3s ease-in-out;

}
</style>
