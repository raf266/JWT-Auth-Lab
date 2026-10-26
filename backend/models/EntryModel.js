const mongoose = require("mongoose")

const entryModelSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, 
            maxLength: 100
        },
        entryBody:{
            type: String,
            maxLength: 350
        },
        isPublic: {
            type: Boolean,
            default: false	
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"	
        }	
    },
    {timestamps: true},
)

const EntryModel = mongoose.model("EntryModel", entryModelSchema)

module.exports = EntryModel