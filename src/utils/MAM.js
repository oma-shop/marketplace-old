const Mam = require('@iota/mam');
import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import { provider } from '../config.json';
import { composeAPI } from '@iota/core'

const iota = composeAPI({
    provider: provider
})
// Publish to tangle
const publish = async (data, mamState) => {


    try {

        // Create MAM Payload - STRING OF TRYTES
        const trytes = asciiToTrytes(JSON.stringify(data));
        const message = Mam.create(mamState, trytes);
        
        // Attach the payload.
        await Mam.attach(message.payload, message.address, 3, 10);
        return { root: message.root, state: message.state };
    } catch (error) {
        return null;
    }
};

export const fetchShopDetails = async (root, secretKey) => {

    let state_object = Mam.init(provider, generateSeed(), 2)
    state_object = Mam.changeMode(state_object, 'restricted', secretKey)

    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)

        return itemEvents[0];

    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};

export const fetchCatalog = async (root, secretKey) => {

    let state_object = Mam.init(provider, generateSeed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', secretKey)
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)

        return itemEvents;

    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};



export const appendAttributesUpdate = async (product, status, seed, next_root, start) => {

    const mamState = {
        subscribed: [],
        channel: {
            side_key: "TEST",
            mode: 'restricted',
            next_root: next_root,
            security: 2,
            start: start,
            count: 1,
            next_count: 1,
            index: 0,
        },
        seed: seed,
    };

    const promise = new Promise(async (resolve, reject) => {
        try {
            if (product) {
                const eventBody = {};
                eventBody.data = product;
                eventBody.timestamp = Date.now();
                eventBody.status = status

                const messageBody = {
                    ...eventBody
                };



                const mamData = await publish(eventBody, mamState);

                if (mamData) {
                    // Create a new item entry using that item ID
                    //await createItem(eventBody, channel, secretKey);
                    eventBody.root = mamData.root;
                    eventBody.secretKey = mamData.state.channel.secretKey;
                    eventBody.next_root = mamData.state.channel.next_root;
                    eventBody.start = mamData.state.channel.start;

                }

                return resolve(eventBody);

            }
            return reject();
        } catch (error) {
            return reject();
        }
    });

    return promise;
};


const appendToChannel = async (product, seed, next_root, start) => {    

    const mamState = {
        subscribed: [],
        channel: {
            side_key: "TEST",
            mode: 'restricted',
            next_root: next_root,
            security: 2,
            start: start,
            count: 1,
            next_count: 1,
            index: 0,
        },
        seed: seed,
    };
    try {

        const eventBody = {};
        eventBody.data = product;
        eventBody.timestamp = Date.now();
        eventBody.status = 'updated'

        const messageBody = {
            ...eventBody
        };



        const mamData = await publish(product, mamState);

        if (mamData) {
            // Create a new item entry using that item ID
            //await createItem(eventBody, channel, secretKey);
            eventBody.root = mamData.root;
            eventBody.secretKey = mamData.state.channel.secretKey;
            eventBody.next_root = mamData.state.channel.next_root;
            eventBody.start = mamData.state.channel.start;

        }

        return eventBody;
    } catch (error) {
        console.log('MAM append error', error);
        return null;
    }
};

export const fetchProduct = async (seed, root, secretKey) => {

    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    secretKey = 'TEST'
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)
        return itemEvents[itemEvents.length - 1];
    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};


export const createProductChannel = (product, seed) => {
    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    const promise = new Promise(async (resolve, reject) => {
        try {
            const blueprint = {};
            blueprint.type = "blueprint";
            blueprint.data = product;
            blueprint.timestamp = Date.now();
            blueprint.status = 'created'


            // create stock
            let stock_seed = generateSeed()
            let stock_state_object = Mam.init(provider, stock_seed, 2)
            stock_state_object = Mam.changeMode(stock_state_object, 'restricted', 'TEST')

            const stock = {};
            stock.type = "stock";
            stock.data = [];
            stock.timestamp = blueprint.timestamp;
            stock.status = 'created'
            stock.blueprint = Mam.getRoot(state_object)

            const mam_stock = await publish(stock, stock_state_object);

            if (mam_stock) {

                // create product
                // add stock root to data object
                blueprint.stock_root = mam_stock.root;

                const mam_blueprint = await publish(blueprint, state_object);


                if (mam_blueprint) {
                    blueprint.root = mam_blueprint.root;
                    blueprint.secretKey = mam_blueprint.state.channel.secretKey;
                    blueprint.next_root = mam_blueprint.state.channel.next_root;
                    blueprint.start = mam_blueprint.state.channel.start;

                }
                blueprint.stock_next_root = mam_stock.state.channel.next_root;
                blueprint.stock_seed = stock_seed
                blueprint.stock_start = mam_stock.state.channel.start;
            }

            return resolve(blueprint);
        } catch (error) {
            console.log('createProductChannel error', error);
            return reject();
        }
    });

    return promise;
};

export const increaseStock = (data, product) => {
    let seed = generateSeed()
    let resp = {};
    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    const promise = new Promise(async (resolve, reject) => {
        try {

            console.log("product info", product)
            console.log("product data", data)

            // create real product
            const product_object = {};
            product_object.type = "product";
            product_object.data = data;
            product_object.timestamp = Date.now();
            product_object.status = 'created'
            product_object.blueprint = product.root
            product_object.stock = product.stock_root

            const mam_product = await publish(product_object, state_object);


            if (mam_product) {
                console.log("success", mam_product)

                // TODO: Enable functionality to create multiple products at the same time
                let product_rootes = [mam_product.root]

                // append stock channel with product information
                resp = await appendStock(product_rootes, product.stock_root, product.stock_seed, product.stock_next_root, product.stock_start)
                console.log("stock attended: ", resp)
            }
            
            return resolve(resp);
        } catch (error) {
            console.log('increaseStock error', error);
            return reject();
        }
    });

    return promise;
};
export const appendStock = async (data, root, seed, next_root, start) => {

    const mamState = {
        subscribed: [],
        channel: {
            side_key: "TEST",
            mode: 'restricted',
            next_root: next_root,
            security: 2,
            start: start,
            count: 1,
            next_count: 1,
            index: 0,
        },
        seed: seed,
    };

    const promise = new Promise(async (resolve, reject) => {
        try {
            if (root) {
                const eventBody = {};
                eventBody.data = data;
                eventBody.timestamp = Date.now();
                eventBody.status = 'increased'

                const mamData = await publish(eventBody, mamState);

                if (mamData) {
                    // Create a new item entry using that item ID
                    //await createItem(eventBody, channel, secretKey);
                    eventBody.root = mamData.root;
                    eventBody.secretKey = mamData.state.channel.secretKey;
                    eventBody.next_root = mamData.state.channel.next_root;
                    eventBody.start = mamData.state.channel.start;

                }

                return resolve(eventBody);

            }
            return reject();
        } catch (error) {
            console.log('appendStock error', error);
            return reject();
        }
    });

    return promise;
};


export const fetchProducts = async (seed, root, secretKey) => {

    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    secretKey = 'TEST'
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)

        return itemEvents;

    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};

export const generateSeed = () => {
    if (window.crypto && window.crypto.getRandomValues) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
        let result = '';
        let values = new Uint32Array(81);
        window.crypto.getRandomValues(values);
        values.forEach(value => (result += charset[value % charset.length]));
        return result;
    } else throw new Error('Your browser is outdated and cant generate secure random numbers');
};

export const fetch = (
    root,
    mode = 'public',
    key = null,
    reportEvent,
    onFetchComplete
) => {
    if (!provider || !root) return;
    const promise = new Promise(async (resolve, reject) => {
        try {
            Mam.init(provider);
            await Mam.fetch(root, mode, key, data => {
                const event = JSON.parse(trytesToAscii(data));
                reportEvent(event);
            });
            return resolve(onFetchComplete());
        } catch (error) {
            console.log('MAM fetch error', error);
            return reject();
        }
    });

    return promise;
};

export const createShop = (
    data,
    type
) => {

    let shop_seed = generateSeed()

    let shop_state_object = Mam.init(provider, shop_seed, 2)
    shop_state_object = Mam.changeMode(shop_state_object, 'restricted', 'TEST')
    const promise = new Promise(async (resolve, reject) => {
        try {
            console.log("_shop 000", _shop)

            // create shop
            const _shop = {};
            _shop.type = type;
            _shop.data = data;
            _shop.timestamp = Date.now();
            _shop.status = 'created'
            console.log("_shop 0", _shop)

            let order_reques_seed = generateSeed()
            let order_request_address = await iota.getNewAddress(order_reques_seed, { index: 0 })
                .then(address => address)
                .catch(err => {
                    // ...
                    console.log("err", err)
                })
            _shop.order_request_address = order_request_address


            // create catalog
            let catalog_seed = generateSeed()
            let catalog_state_object = Mam.init(provider, catalog_seed, 2)
            catalog_state_object = Mam.changeMode(catalog_state_object, 'restricted', 'TEST')

            const catalog = {};
            catalog.type = "catalog";
            catalog.data = [];
            catalog.timestamp = _shop.timestamp;
            catalog.status = 'created'
            catalog.shop = Mam.getRoot(shop_state_object)
            console.log("_shop 1", _shop)

            const mam_catalog = await publish(catalog, catalog_state_object);
            if ( mam_catalog ) {
                console.log("mam_catalog published!", mam_catalog)
                _shop.catalog_root = mam_catalog.root
                console.log("_shop 2", _shop)
                console.log("shop_state_object 2", shop_state_object)

                // publish shop
                const shop_channel = await publish(_shop, shop_state_object);
                console.log("shop_channel published!", shop_channel)

                // add secrets to object
                if (shop_channel) {
                    _shop.root = shop_channel.root;
                    _shop.secretKey = shop_channel.state.channel.secretKey;
                    _shop.next_root = shop_channel.state.channel.next_root;
                    _shop.start = shop_channel.state.channel.start;
                    _shop.seed = shop_seed;
                    _shop.catalog_seed = catalog_seed

                    _shop.catalog_key = mam_catalog.state.channel.secretKey;
                    _shop.catalog_next_root = mam_catalog.state.channel.next_root;
                    _shop.catalog_start = mam_catalog.state.channel.start;

                    _shop.order_reques_seed = order_reques_seed

                    // add proper error handling
                    return resolve(_shop);
                }

            }
        } catch (error) {
            console.log('createMAMChannel error', error);
            return reject();
        }
    });

    return promise;
};


export const createMAMChannel = (
    data,
    type
) => {

    let seed = generateSeed()

    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    const promise = new Promise(async (resolve, reject) => {
        try {

            // create object
            let object = {};
            object.type = type;
            object.data = data;
            object.timestamp = Date.now();
            object.status = 'created'


            // TODO: UPDATE PRODUCTS (ROOTs IN DATA) if tyoe = order

            // publish object
            const object_channel = await publish(object, state_object);

            // add secrets to object
            if (object_channel) {
                object.root = object_channel.root;
                object.secretKey = object_channel.state.channel.secretKey;
                object.next_root = object_channel.state.channel.next_root;
                object.start = object_channel.state.channel.start;
                object.seed = seed;
            }

            // add proper error handling
            return resolve(object);
        } catch (error) {
            console.log('createMAMChannel error', error);
            return reject();
        }
    });

    return promise;
};

