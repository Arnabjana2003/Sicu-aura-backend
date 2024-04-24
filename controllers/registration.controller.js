import Hospital from "../models/hospital.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerHospital = asyncHandler(async (req, res) => {
  const {
    hospitalName,
    email,
    address,
    phone,
    city,
    registrationNumber,
    state,
    emergencyNumber,
    pincode,
    registrationDate,
    numberOfAmbulace,
    password,
    registrationCertificateLink,
  } = req.body;

  if (
    !(
      hospitalName &&
      email &&
      address &&
      phone &&
      city &&
      registrationNumber &&
      state &&
      emergencyNumber &&
      pincode &&
      registrationDate &&
      numberOfAmbulace &&
      password
    )
  )
    throw new ApiError(400, "All details is required");

  //chack if already register or not
  const isExsisted = await Hospital.findOne({
    $or:[{ hospitalName, phone, email }]
  });
  if (isExsisted)
    throw new ApiError(401, "Hospital already exsist with same credentials");

  //save in database
  const registeredDetails = await Hospital.create({
    hospitalName,
    email,
    address,
    phone,
    city,
    registrationNumber,
    state,
    emergencyNumber,
    pincode,
    registrationDate,
    numberOfAmbulace,
    password,
    registrationCertificateLink,
  });

  registeredDetails.password = undefined;

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Hospital registered successfully",
        registeredDetails
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, password, hospitalName } = req.body;
  if (!(email && password && hospitalName))
    throw new ApiError(400, "All details are required");

  const hospital = await Hospital.findOne({ hospitalName, email });

  if (!hospital) {
    throw new ApiError(404, "Hospital with the credentials not found");
  }

  const isPasswordCorrect = await hospital.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect password");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Password correct", { passwordCorrect: true }));
});

export { registerHospital, login };
