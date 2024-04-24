import mongoose,{Schema} from "mongoose"
import bcrypt from "bcryptjs"

const hospitalSchema = new Schema({
    hospitalName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true,
        unique: true
    },
    registrationNumber:{
        type:String,
        required: true,
        unique: true
    },
    state:{
        type:String,
        required: true
    },
    emergencyNumber:{
        type:Number,
        required: true,
    },
    pincode:{
        type:Number,
        required: true
    },
    registrationDate:{
        type:String,
        required: true
    },
    numberOfAmbulace:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true,
    },
    registrationCertificateLink:{
        type:String,
    },
    city:{
        type:String,
        required: true
    },
},{
    timestamps:true
})

hospitalSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
});

hospitalSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

const Hospital = mongoose.model("Hospital",hospitalSchema)

export default Hospital