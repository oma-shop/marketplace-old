# Online Marketplace Application

> A decentralized, commission-free, local-economy focused online shopping platform.
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.17-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.4.11-brightgreen.svg" alt="element-ui">
  </a>
</p>

## Introduction

We creating together a decentral, free and open marketplace application that focused on local communities. 

The online markedplace application discovers local stores and show all global products. 
Store owners can create new stores for free. 

The buyer and the store communication is peer to peer. 

This project is based on [vue-element-admin](http://panjiachen.github.io/vue-element-admin). This is a front-end management background integration solution. It based on [vue](https://github.com/vuejs/vue) and use the UI Toolkit [element](https://github.com/ElemeFE/element).

## Build Setup

```bash
# Clone project
git clone https://github.com/oma-shop/marketplace

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

### Docker

```bash
# Build the container
docker build -t oma-shop/marketplace .

# Run the app
docker run -p 8080:8080 oma-shop/marketplace
``` 