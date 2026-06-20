// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByEmail,
  saveResetToken,
  findUserByResetToken,
  clearResetToken,
  updateEmailVerified,
  findUserByProvider,
  updateUserProvider,
  findUserById,
  updateUserPicture,
  updateUserPicturePublicId,
} = require("../Models/userModel");
const { formatUser } = require("../utils/formatter");
const { sendPasswordResetEmail } = require("./Emails/sendResetLink");
const db = require("../Config/db.connection");
const {
  sendEmailVerificationLink,
} = require("./Emails/sendEmailVerificationLink");
const {
  USER_TOKEN_EXPIRES_IN,
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
  RESET_TOKEN_EXPIRES_IN,
} = require("../Config/constants");
const generateJWT = require("../utils/Token/generateJWT");
const { isCloudinaryUrl, uploadFromUrl } = require("../utils/cloudinaryUpload");
const { profileCompletionDetails } = require("../Helper/methods");
const { getUserCategories } = require("../Models/categoryModel");

exports.registerUser = async (
  { first_name, last_name, email, password, terms_accepted },
  res,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      field: "email",
      type: "credential",
      message: "User with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await createUser({
    firstName: first_name,
    lastName: last_name,
    email,
    password: hashedPassword,
    termsAccepted: terms_accepted,
  });

  const response = await sendEmailVerificationLinkServices(email);

  if (response) {
    return {
      success: true,
      message:
        "We’ve sent a verification link to your email. Please check your inbox and verify your account before logging in.",
    };
  }

  return {
    success: true,
    userId: result.insertId,
    message: "User created successfully.",
  };
};

exports.loginUser = async ({ email, password, res }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      field: "email",
      type: "credential",
      message:
        "User not found. Please create an account to continue with NextChapter",
    };
  }

  if (!user.email_verified) {
    const response = await sendEmailVerificationLinkServices(user.email);

    if (response) {
      return {
        success: false,
        emailVerified: "unverified",
        message:
          "We’ve sent a verification link to your email. Please check your inbox and verify your account before logging in.",
      };
    }
  }

  if (user.password === null && user.provider !== "local") {
    return {
      success: false,
      message: `Please Login with ${user.provider}. Or You can Update Your Password By Clicking on Forgot Password?`,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      success: false,
      field: "password",
      type: "credential",
      message: "Invalid password.",
    };
  }

  const token = generateJWT(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    `${USER_TOKEN_EXPIRES_IN}h`,
  );

  console.log("loginUserrrrrrrrr", user);

  const { isComplete, percentage } = await profileCompletionDetails(user);

  const categories = await getUserCategories(user?.id);

  const userDetails = formatUser({
    ...user,
    isComplete,
    percentage,
    categories,
  });

  return {
    token,
    user: userDetails,
  };
};

exports.verifyEmailToken = async (token, email) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "User not found. Please sign up again.",
      };
    }

    if (user.email_verified) {
      return {
        success: false,
        emailVerified: true,
        message:
          "Your email has already been verified. Please login to continue.",
      };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VERIFY);

    await updateEmailVerified(decoded?.email);

    return {
      success: true,
      email: decoded.email,
      message: "Email verified successfully.",
    };
  } catch (err) {
    console.log(err, "eeeeeeeeeeeee");

    if (err.name === "TokenExpiredError") {
      return {
        success: false,
        email: email,
        message: "Your reset link has expired. Please request a new one.",
      };
    }
    if (err.name === "JsonWebTokenError") {
      return {
        success: false,
        message: "Invalid reset link. Please request a new one.",
      };
    }
    return { success: false, email: email, message: "Something went wrong." };
  }
};

async function sendEmailVerificationLinkServices(email) {
  try {
    const user = await findUserByEmail(email);

    console.log("uuuuuuuuuuuuuuuuuuuu", user);

    if (user?.email_verified) {
      return false;
    }

    const emailVerificationToken = generateJWT(
      { id: user.id, email: user.email, email_verified: user.email_verified },
      process.env.JWT_SECRET_EMAIL_VERIFY,
      `${EMAIL_VERIFICATION_TOKEN_EXPIRES_IN}m`,
    );

    const emailVerificationLink = `${process.env.BACKEND_BASE_URL}/api/${process.env.API_VERSION}/auth/verify-email/?token=${emailVerificationToken}&email=${email}`;

    console.log("emailVerificationLink", emailVerificationLink);

    await sendEmailVerificationLink(
      email,
      emailVerificationLink,
      user.first_name,
    );

    return true;
  } catch (err) {
    throw {
      message: "Failed to send verification email. Please try again later.",
      customMessage: true,
    };
  }
}

exports.sendResetPasswordLink = async (email) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        field: "email",
        type: "credential",
        message:
          "User not found. Please create an account to continue with NextChapter",
      };
    }

    const resetToken = generateJWT(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_RESET,
      `${RESET_TOKEN_EXPIRES_IN}m`,
    );
    await saveResetToken(email, resetToken);

    const resetLink = `${process.env.FRONTEND_URL}/?token=${resetToken}`;

    await sendPasswordResetEmail(email, resetLink);

    return { success: true };
  } catch (err) {
    throw {
      message: "Failed to send reset email. Please try again later.",
      customMessage: true,
    };
  }
};

exports.verifyResetToken = async (token) => {
  try {
    console.log("start Checking...");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);
    const user = await findUserByResetToken(token);

    if (!user) {
      return {
        valid: false,
        message:
          "This reset link has already been used or is invalid. Please request a new one.",
      };
    }

    return { valid: true, id: decoded.id, email: decoded.email };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        valid: false,
        message: "Your reset link has expired. Please request a new one.",
      };
    }
    if (err.name === "JsonWebTokenError") {
      return {
        valid: false,
        message: "Invalid reset link. Please request a new one.",
      };
    }
    return { valid: false, message: "Something went wrong." };
  }
};

exports.resetPassword = async (email, password, token) => {
  try {
    const result = await exports.verifyResetToken(token);

    if (!result.valid) {
      return {
        message: result.message,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "UPDATE users SET password = ? WHERE email = ?";
    const value = [hashedPassword, email];

    await db.query(query, value);

    await clearResetToken(email);

    return { success: true };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw {
        message: "Your reset link has expired. Please request a new one.",
        customMessage: true,
      };
    }

    if (err.name === "JsonWebTokenError") {
      throw {
        message: "Invalid reset link. Please request a new one.",
        customMessage: true,
      };
    }

    throw err;
  }
};

// !social login

exports.handleSocialLogin = async ({
  provider,
  providerId,
  email,
  emailVerified = false,
  firstName = "",
  lastName = "",
  picture = null,
}) => {
  const existingByProvider = await findUserByProvider(provider, providerId);

  console.log("existingByProvider Profile", picture);

  if (existingByProvider) {
    if (picture && !isCloudinaryUrl(existingByProvider.profile_pic)) {
      const { url = picture, public_id } = await uploadFromUrl(
        picture.replace(/=s\d+-c$/, ""),
      );

      await updateUserPicture(existingByProvider.id, url);
      await updateUserPicturePublicId(existingByProvider.id, public_id);
    }

    const userDetails = formatUser(existingByProvider);

    const token = generateJWT(
      { id: userDetails.userId, email: userDetails.email },
      process.env.JWT_SECRET,
      `${USER_TOKEN_EXPIRES_IN}h`,
    );

    return {
      success: true,
      user: userDetails,
      token,
      isNewUser: false,
      linked: true,
      provider: existingByProvider.provider,
    };
  }

  if (email) {
    const existingByEmail = await findUserByEmail(email);

    if (existingByEmail) {
      if (emailVerified) {
        if (
          existingByEmail.provider !== provider ||
          existingByEmail.provider_id !== providerId
        ) {
          await updateUserProvider(existingByEmail.id, provider, providerId);
        }

        if (picture && !isCloudinaryUrl(existingByEmail.profile_pic)) {
          const { url = picture, public_id } = await uploadFromUrl(
            picture.replace(/=s\d+-c$/, ""),
          );

          await updateUserPicture(existingByEmail.id, url);
          await updateUserPicturePublicId(existingByEmail.id, public_id);
        }

        const User = await findUserById(existingByEmail.id);

        const updatedUser = formatUser(User);

        const token = generateJWT(
          { id: updatedUser.userId, email: updatedUser.email },
          process.env.JWT_SECRET,
          `${USER_TOKEN_EXPIRES_IN}h`,
        );
        return {
          success: true,
          user: updatedUser,
          token,
          isNewUser: false,
          linked: true,
          accountLinked: true,
          provider: User.provider,
        };
      } else {
        throw {
          status: 400,
          message:
            "Email not verified by provider. Please verify your email with the provider or link from your account settings.",
        };
      }
    }
  }

  console.log("ppppppppppppppppp", picture);

  const newUserResult = await createUser({
    firstName,
    lastName,
    email,
    provider,
    providerId,
    emailVerified: emailVerified ? 1 : 0,
  });

  const newUserId = newUserResult.insertId;
  const newUser = await findUserById(newUserId);

  const { url = picture, public_id } = await uploadFromUrl(
    picture.replace(/=s\d+-c$/, ""),
  );

  await updateUserPicture(newUserId, url);
  await updateUserPicturePublicId(newUserId, public_id);

  const token = generateJWT(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    `${USER_TOKEN_EXPIRES_IN}h`,
  );

  const user = formatUser(newUser);

  return {
    success: true,
    user,
    token,
    isNewUser: true,
    linked: true,
    provider: newUser.provider,
  };
};
