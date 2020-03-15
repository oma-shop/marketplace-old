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
            fetchShopDetails(root, 'TEST').then(function (shop) {
                commit("FETCHED_SHOP_DETAILS", shop);
                fetchCatalog(shop.catalog_root, 'TEST').then(function (catalog) {                 
                    catalog.forEach(item => {
                        if (item.status === "add_blueprint") {
                            fetchProduct(item.data.product).then(function (product) {
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
