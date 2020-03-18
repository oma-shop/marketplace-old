const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  getShopDetails: state => state.shop,
  getNumberOfProducts: state => (state.shop.products) ? state.shop.products.length : 0,
  getAllProducts: state => state.shop.products,
}
export default getters
