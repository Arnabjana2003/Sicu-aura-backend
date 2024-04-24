import Hospital from "../models/hospital.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js";

const getAllHospitals = asyncHandler(async(req,res)=>{
    const allHospitals = await Hospital.find({},{createdAt:1,hospitalName:1,email:1,address:1,phone:1,city:1,state:1,pincode:1})

    return res
    .status(200)
    .json(new ApiResponse(200,"All hospital details fetched",allHospitals))
})

const search = asyncHandler(async(req,res)=>{
    const {query} = req.body
    // if(!query) throw new ApiError(400,"Search query is required")

    const searchResult = await Hospital.find({
        hospitalName: { $regex: query, $options: 'i' }
    },{createdAt:1,hospitalName:1,email:1,address:1,phone:1,city:1,state:1,pincode:1})

    return res
    .status(200)
    .json(new ApiResponse(200,"Search result successfully fetched",searchResult))
})

export {getAllHospitals,search}