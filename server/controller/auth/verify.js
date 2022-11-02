const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
var config = require("../../config");
const { ObjectId } = require("mongoose").Types;
const User = require("../../models/User");
const VerifiedUser = require("../../models/VerifiedUser");
const sendEmail = require("../../services/sendEmail");
const generateToken = require("../../services/token");
const verificationConfirmation = require("../../templates/VerificationConfirmation");

const verify = async (req, res, next) => {
  const { token } = req.params;

  try {
    const { data } = jwt.decode(token, config.accessSecret);

    const checkUser = await User.findOne({
      _id: ObjectId(data._id),
      email: data.email,
    });

    if (!checkUser) {
      throw createHttpError.NotFound("User Not found");
    }

    const { firstName, lastName, email, password, role } = checkUser;

    const newUser = new VerifiedUser({
      firstName,
      lastName,
      email,
      password,
      role,
      user_type: "RegisteredUser",
    });

    await newUser.save();

    const response = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };

    const { accessToken, refreshToken } = generateToken(response);

    sendEmail(
      [email],
      "Verified",
      verificationConfirmation({ firstName, lastName })
    );

    res.status(200).json({
      success: true,
      data: response,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = verify;
