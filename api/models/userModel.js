const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const timestamps = require('mongoose-timestamp')


// const schemaOptions = {
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//   };
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true, 'first name is required'],
        maxlength:32,
    },
    email:{
        type:String,
        trim:true,
        required: [true, "e-mail is required"],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please add a valid email'
        ]
    },
    password:{
        type:String,
        trim:true,
        required:[true, 'Password is required'],
        minlength:[6, 'Password must have at least (6) character ']
    },

    role:{
        type:String,
        enum:['admin','user'],
        default: 'user'

    },
    
    // schemaOptions

}
)
userSchema.set('timestamps', true); 


//encrypting password before Saving
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn3600
    });
}

module.exports = mongoose.model('User', userSchema)