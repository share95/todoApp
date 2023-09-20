const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Title is required"],

        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false
        },
        due: {
            type: Date,
        }
    }, { timestamps: true, }
);

module.exports = mongoose.model('Task',taskSchema);