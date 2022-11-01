const axios = require("axios");
const VerifiedUser = require("../../models/VerifiedUser");
const generateToken = require("../../services/token");

const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { name, given_name, family_name, picture, email } = response.data;

    const checkEmail = await VerifiedUser.findOne({ email });

    let resp = {};

    if (checkEmail) {
      resp = {
        _id: checkEmail._id,
        firstName: checkEmail.firstName,
        lastName: checkEmail.lastName,
        email: checkEmail.email,
        role: checkEmail.role,
        userPic: checkEmail.userPic,
      };
    } else {
      const newUser = new VerifiedUser({
        firstName: given_name,
        lastName: family_name,
        email: email,
        userPic: picture,
      });

      await newUser.save();

      resp = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        userPic: newUser.userPic,
      };
    }

    const { accessToken, refreshToken } = generateToken(resp);

    res.status(200).json({
      success: true,
      data: resp,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = googleLogin;
