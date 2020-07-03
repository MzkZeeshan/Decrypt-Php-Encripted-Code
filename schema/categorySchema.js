let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let category = new Schema({
    category_name: {
        type: String,
    },
    parent_id: {
        type: String,
    },
    name: {
        type: String,
    },
    categoryId: {
        type: String,
    },
    createdById: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('category', category);

// var json = {
//     "category_name": "",
//     "parent_id": "",
//     "name": "",
//     "createdById": "",
//     "categoryId":""
// }