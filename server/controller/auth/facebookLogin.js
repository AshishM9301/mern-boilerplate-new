const VerifiedUser = require("../../models/VerifiedUser");
const generateToken = require("../../services/token");

const facebookLogin = async (req, res, next) => {
  const { email, photoURL, firstName, lastName } = req.body;

  try {
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
        user_type: checkEmail.user_type,
      };
    } else {
      const newUser = new VerifiedUser({
        firstName,
        lastName,
        email: email,
        userPic: photoURL,
        user_type: "FacebookUser",
      });

      await newUser.save();

      resp = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        userPic: newUser.userPic,
        user_type: newUser.user_type,
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

module.exports = facebookLogin;
