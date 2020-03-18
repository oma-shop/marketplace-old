import { fetchShopDetails, fetchCatalog, fetchProduct } from '@/utils/MAM'

const shop = {
    state: {
        products: [],
        shop: {
            data: {
                name: ''
            }
        }
    },
    mutations: {
        FETCHED_SHOP_DETAILS: (state, shop_details) => {
            state.shop = shop_details
            state.products = []
    
        },   
        FETCHED_PRODCUT: (state, product) => {
            state.products.push(product)
        },
    },
    actions: {
        FetchShopDetails({ commit }, root ) {
            console.log('vuex - root', root)
            console.log('vuex - fetchShopDetails', fetchShopDetails)

            fetchShopDetails(root, 'TEST').then(function (shop) {
                console.log('vuex - shop', shop)
                commit("FETCHED_SHOP_DETAILS", shop);
                fetchCatalog(shop.catalog_root, 'TEST').then(function (cataloges) {
                    console.log('vuex - cataloges', cataloges)
                 
                    cataloges.forEach(cataloge => {
                        console.log('vuex - cataloge', cataloge)

                        if (cataloge.status === "add_blueprint") {
                            fetchProduct(cataloge.data.product).then(function (product) {
                                console.log('vuex - add_blueprint::product', product)
                                commit("FETCHED_PRODCUT", product);
                             })
                        }
                    });
                })
            })
        }
    }
}

export default shop
