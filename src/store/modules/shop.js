import { fetchShopDetails, fetchCatalog, fetchProduct } from '@/utils/MAM'

const shop = {
    state: {
        all: [],
        shop: {
            data: {
                name: ''
            }
        }
    },
    mutations: {
        FETCHED_SHOP_DETAILS: (state, shop_details) => {
            state.shop = shop_details
            state.all = []
    
        },   
        FETCHED_PRODCUT: (state, product) => {
            state.all.push(product)
        },
    },
    actions: {
        FetchShopDetails({ commit }, root ) {
            console.log('vuex - root', root)
            console.log('vuex - fetchShopDetails', fetchShopDetails)

            fetchShopDetails(root, 'TEST').then(function (shop) {
                console.log('vuex - shop', shop)
                commit("FETCHED_SHOP_DETAILS", shop);
                fetchCatalog(shop.catalog_root, 'TEST').then(function (catalog) {
                    console.log('vuex - catalog', catalog)
                 
                    catalog.forEach(item => {
                        console.log('vuex - item', item)

                        if (item.status === "add_blueprint") {
                            fetchProduct(item.data.product).then(function (product) {
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
