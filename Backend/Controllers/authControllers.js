const { validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  sendResetPasswordLink,
  resetPassword,
  verifyResetToken,
  verifyEmailToken,
  handleSocialLogin,
} = require("../Services/authService");
const { successResponse, errorResponse } = require("../utils/response");
const handleDbError = require("../utils/handleDbError");
const {
  generateState,
  generateCodeVerifier,
  decodeIdToken,
} = require("arctic");
const { OAUTH_EXCHANGE_EXPIRY_MS } = require("../Config/constants");
const google = require("../Config/oAuth/google");

const isProduction = process.env.NODE_ENV === "production";

// SIGNUP
const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array());
    }

    const userData = req.body;

    const result = await registerUser(userData, res);

    if (result?.success === false) {
      return errorResponse(res, 400, result?.message, result);
    }

    successResponse(res, 201, result?.message);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array());
    }

    const { email, password } = req.body;

    console.log("loginData", email);

    const result = await loginUser({ email, password, res });

    console.log("result");
    console.log("login Success", result, result?.success);

    if (result?.success === false) {
      console.log("login Error", result);

      delete result.success;
      return errorResponse(res, 400, result?.message, result);
    }
    console.log("setting cookie");

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    delete result.token;

    successResponse(res, 200, "Login successful", result);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// LOGOUT
const logout = (_, res) => {
  console.log("Logout Starts");

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  res.clearCookie("google_oauth_state", { path: "/", sameSite: "lax" });
  res.clearCookie("google_code_verifier", { path: "/", sameSite: "lax" });

  console.log("Logout successfully");

  successResponse(res, 200, "Logout successful");
};

// FORGET PASSWORD
const forgotPassword = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", error.array());
    }

    const { email } = req.body;
    const result = await sendResetPasswordLink(email);

    if (result?.success === false) {
      return errorResponse(res, 400, result?.message, result);
    }

    successResponse(res, 200, "Password reset link sent successfully");
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const verifyEmailTokenController = async (req, res, next) => {
  try {
    const { token, email } = req.query;

    console.log(email, "eeeee");

    const result = await verifyEmailToken(token, email);

    console.log("mmmmmmmmmm", result);

    if (result.success) {
      const redirectUrl = `${process.env.FRONTEND_URL}/?status=verified&email=${result?.email}`;

      return successResponse(res, 200, result?.message, {}, redirectUrl);
    }

    if (result?.emailVerified) {
      const redirectUrl = `${process.env.FRONTEND_URL}/?status=alreadyVerified`;
      return successResponse(res, 200, result?.message, {}, redirectUrl);
    }

    const redirectUrl = `${process.env.FRONTEND_URL}/?status=failed&email=${result?.email}`;

    errorResponse(res, 400, result?.message, null, redirectUrl);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// Verify resetToken

const verifyResetTokenController = async (req, res, next) => {
  try {
    const { token } = req.body;

    const result = await verifyResetToken(token);
    if (result.valid) {
      return successResponse(res, 200, "", { email: result.email });
    }

    errorResponse(res, 400, result?.message);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// RESET PASSWORD

const resetPasswordController = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", error.array());
    }

    const { email, newPassword, resetToken } = req.body;
    const result = await resetPassword(email, newPassword, resetToken);

    if (result?.success) {
      return successResponse(res, 200, "Password reset successful");
    }
    errorResponse(res, 400, result?.message || "Password reset failed", result);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const getGoogleLoginPage = (req, res, next) => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    const cookieConfig = {
      httpOnly: true,
      secure: false,
      maxAge: OAUTH_EXCHANGE_EXPIRY_MS,
      sameSite: "lax",
    };

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_code_verifier", codeVerifier, cookieConfig);

    console.log(
      `${process.env.BACKEND_BASE_URL}/api/${process.env.API_VERSION}/auth/google/callback`,
    );

    res.redirect(url.toString());
  } catch (error) {
    handleDbError(error, res);
  }
};

const getGoogleCallBack = async (req, res, next) => {
  const { state, code } = req.query;

  const {
    google_code_verifier: codeVerifier,
    google_oauth_state: storedState,
  } = req.cookies;

  if (
    !state ||
    !code ||
    !codeVerifier ||
    !storedState ||
    state !== storedState
  ) {
    return errorResponse(res, 400, "Invalid request parameters", null, "/");
  }

  let token;

  try {
    token = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (error) {
    handleDbError(error, res, next);
  }

  console.log("Google Token", token.data.id_token);
  console.log("Google Token222", token);

  const claims = decodeIdToken(token.data.id_token);

  console.log("Google Claims", claims);

  const {
    sub: googleUserId,
    given_name,
    family_name,
    email,
    email_verified,
    picture,
  } = claims;

  try {
    const result = await handleSocialLogin({
      provider: "google",
      providerId: googleUserId,
      email,
      emailVerified: !!email_verified,
      firstName: given_name,
      lastName: family_name,
      picture,
    });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    const params = new URLSearchParams();

    if (result.isNewUser) {
      params.append("isNewUser", "true");
    }

    if (result.accountLinked) {
      params.append("accountLinked", "true");
    }

    params.append("loginProvider", "google");

    const redirectUrl = `${process.env.FRONTEND_URL}/nextChapter/?${params.toString()}`;

    return successResponse(res, 200, "Logged in with Google", {}, redirectUrl);
  } catch (err) {
    const status = err.status || 500;
    const msg = err.message || "Social login failed";
    return errorResponse(res, status, msg);
  }
};

module.exports = {
  signup,
  login,
  resetPasswordController,
  forgotPassword,
  verifyResetTokenController,
  verifyEmailTokenController,
  getGoogleLoginPage,
  getGoogleCallBack,
  logout,
};
