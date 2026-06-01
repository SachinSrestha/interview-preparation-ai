const mongoose= require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required:[true, "Token is required for blacklisting"]
    }
},{
    timestamps:true
})

blacklistTokenSchema.index({ createdAt: 1 },{
    expireAfterSeconds: 60 * 60 * 24 * 3 // Tokens will be automatically removed after 3 days
});

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel