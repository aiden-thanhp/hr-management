const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const HouseSchema = new Schema({
    address: {
        type: String, 
        required: [true, 'House address required'],
        validate: {
            validator: function(v) {
                return /^[0-9a-zA-Z ,-]+$/.test(v);
            },
            message: props => `${props.value} is not a valid address!`
        }
    },
    landlord: { 
        name: { 
            type: String, 
            required: [true, 'Landlord name required']
        },
        phone: {
            type: String, 
            required: [true, 'Landlord phone required'],
            validate: {
                validator: function(v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        email: { 
            type: String, 
            required: [true, 'Landlord email required'],
            validate: {
                validator: function(v) {
                    return /^\S+@\S+\.\S+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
    },
    facility: { 
        beds: Number,
        mattress: Number,
        tables: Number,
        chairs: Number
    },
    residents: [{ type: refType, ref: "User" }],
    reports: [{ type: refType, ref: "Report" }]
});

const House = mongoose.model("House", HouseSchema, "House");

module.exports = House;