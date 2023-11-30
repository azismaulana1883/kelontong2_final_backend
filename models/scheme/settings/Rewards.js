const mongoose = require ('mongoose')

const rewardScheme = new mongoose.Schema({
    rewards : {
        name : {type: String, require: true},
        poin: {type: Number, require: true},
        minPurchase: {type: Number, require: true},
        description: {type: String, require: true}
    },
    products : [{
        product_id: {type: String, required: true},
        name: {type: String, required: true },
    }]
}, {timestamps: true})

const Rewards = mongoose.model('reward', rewardScheme)
module.exports = Rewards
