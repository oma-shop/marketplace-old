const Mam = require('@iota/mam');
import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import { provider } from '../../config.json';
import { composeAPI } from '@iota/core'

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
        console.log("publish error", error)
        return null;
    }
};

export const createWebRTC = (
    seed,
    key,
    data
) => {

    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', key)

    const promise = new Promise(async (resolve, reject) => {
        try {

            // publish object
            const object_channel = await publish(data, state_object);

            // add secrets to object
            if (object_channel) {
                data.root = object_channel.root;
                data.secretKey = object_channel.state.channel.secretKey;
                data.next_root = object_channel.state.channel.next_root;
                data.start = object_channel.state.channel.start;
                data.seed = seed;
            }

            // add proper error handling
            return resolve(data);
        } catch (error) {
            console.log('createMAMChannel error', error);
            return reject();
        }
    });

    return promise;
};

export const readStream = (
    seed,
    key
) => {
    console.log("readStream:: (seed, key)", seed, key)

    let state_object = Mam.init(provider, seed, 2)
    console.log("state_object", state_object)

    state_object = Mam.changeMode(state_object, 'restricted', key)
    let root = Mam.getRoot(state_object)
    console.log("root", root)

    const promise = new Promise(async (resolve, reject) => {
        try {

            console.log("state_object", state_object)
            // publish object
            let offer;
            const convertData = data => {
                console.log("convertData", data)
                const result = JSON.parse(trytesToAscii(data));
                console.log("result", result)
                offer = result
            }    
            await Mam.fetch(root, 'restricted', key, convertData)
            console.log("offer", offer)
            // add proper error handling
            return resolve(offer);

            
        } catch (error) {
            console.log('createMAMChannel error', error);
            return reject();
        }
    });

    return promise;
};

export const createAnswer = (seed, key, answer) => {    
    console.log("createAnswer(seed, key, answer)", seed, key, answer)
    const promise = new Promise(async (resolve, reject) => {
        
        let state_object = Mam.init(provider, seed, 2)
        console.log("state_object", state_object)
        state_object = Mam.changeMode(state_object, 'restricted', key)
        console.log("state_object", state_object)

        try {

            console.log("plublish mam...")
            const mamData = await publish(answer, state_object);
            console.log("mam plublish!")

            if (mamData) {
                // Create a new item entry using that item ID
                //await createItem(eventBody, channel, secretKey);
                mamData.root = mamData.root;
                mamData.secretKey = mamData.state.channel.secretKey;
                mamData.next_root = mamData.state.channel.next_root;
                mamData.start = mamData.state.channel.start;

            }

            return resolve(mamData);

        } catch (error) {
            console.log('MAM append error', error);
            return reject();

        }
    });
    return promise;
};