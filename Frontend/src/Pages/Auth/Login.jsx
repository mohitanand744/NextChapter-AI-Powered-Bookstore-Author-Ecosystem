// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "../../components/Buttons/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Input from "../../components/Inputs/Input";
import Checkbox from "../../components/Inputs/Checkbox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../../components/Modal/Auth/ForgotPassword";
import { authApis } from "../../utils/apis/authApis";
import { toast } from "sonner";
import useAuth from "../../Hooks/useAuth";
import ResetPasswordModal from "../../components/Modal/Auth/resetPassword";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/Redux/Slices/authSlice";
import {
  emailValidationRules,
  passwordValidationRules,
} from "../../utils/validations/rules";
import useInputHandlers from "../../Hooks/useInputHandlers";
import SocialLoginButtons from "../../components/Buttons/Auth/SocialLoginButtons";
import EmailVerificationStatus from "../../components/Modal/Auth/EmailVerificationStatus";
import { useComingSoon } from "../../store/Context/ComingSoonContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [showForgot, setShowForgot] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [resetToken, setResetToken] = useState(
    () => localStorage.getItem("resetToken") || false,
  );
  const [verificationStatus, setVerificationStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [linkSent, setLinkSent] = useState(false);
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const location = useLocation();
  const [verificationEmail, setVerificationEmail] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(
    null || localStorage.getItem("forgotPasswordEmail"),
  );
  const [
    afterExitingUserResettingPasswordPopup,
    setAfterExitingUserResettingPasswordPopupPopup,
  ] = useState(false);
  const dispatch = useDispatch();
  const { openComingSoon } = useComingSoon();

  console.log("isAuth", isAuthenticated);

  const handleResetTokenVerification = async () => {
    try {
      const response = await authApis.verifyResetToken(resetToken);

      if (response?.success) {
        setShowResetModal(true);
        setLinkSent(false);
        setForgotPasswordEmail(response?.data?.email);
      }
    } catch (error) {
      setShowResetModal(false);
      toast.error(error.response?.data?.message || "Invalid Link");
      localStorage.removeItem("resetToken");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const status = queryParams.get("status");
    const verifiedEmail = queryParams.get("email");

    if (verifiedEmail) {
      setVerificationEmail(verifiedEmail);
    }

    if (token) {
      localStorage.setItem("resetToken", token);
      setResetToken(token);
      setAfterExitingUserResettingPasswordPopupPopup(
        isAuthenticated ? true : false,
      );

      return;
    }

    if (status) {
      if (status === "verified") {
        setVerificationStatus("verified");
        setVerificationEmail(verifiedEmail);
      } else if (status === "failed") {
        setVerificationStatus("failed");
      } else if (status === "alreadyVerified") {
        setVerificationStatus("alreadyVerified");
      }

      navigate("/", { replace: true });
      return;
    }
  }, [location, navigate, isAuthenticated]);

  useEffect(() => {
    if (resetToken) {
      handleResetTokenVerification();
      navigate("/", { replace: true });
    } else if (!resetToken && isAuthenticated) {
      navigate("/nextChapter", { replace: true });
    }
  }, [resetToken, navigate, isAuthenticated]);

  useEffect(() => {
    if (verificationStatus === "alreadyVerified") {
      toast.success("Email already verified!");
    }
  }, [verificationStatus]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const { email, password } =
      JSON.parse(localStorage.getItem("loginData")) || {};

    if (!verificationStatus && email && password) {
      setValue("email", email);
      setValue("password", password);
      setIsChecked(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setVerificationEmail(data.email);
      const response = await dispatch(
        loginThunk({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      if (response?.success) {
        toast.success("Login successful!");

        if (isChecked) {
          localStorage.setItem(
            "loginData",
            JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          );
        } else {
          localStorage.removeItem("loginData");
        }
        reset();
      } else {
        toast.error(response?.message || "Invalid credentials");
      }
    } catch (error) {
      setCountdown(30);
      const errData = error?.response?.data?.error;

      if (errData?.emailVerified) {
        setVerificationStatus(errData.emailVerified);

        return;
      }

      if (
        error.response?.data?.error?.type === "credential" &&
        error.response?.data?.error?.field === "password"
      ) {
        setError(error.response?.data?.error?.field || "root", {
          type: error.response?.data?.error?.type || "credential",
          message:
            error.response?.data?.error?.message || "Something went wrong",
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again later.",
        );
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen gap-3 p-4 bg-[url('/images/authBG.png')] bg-center bg-no-repeat bg-cover overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="flex gap-4">
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="relative p-3 overflow-hidden border shadow-2xl bg-coffee/65 backdrop-blur-xl rounded-3xl border-tan/20"
          >
            <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
            <div className="relative z-10 p-3">
              <div className="p-3 pt-1 mb-8 text-center border bg-black/20 rounded-3xl border-tan/20 text-cream">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="object-cover w-auto h-32 mx-auto mb-4 rounded-2xl"
                  src="/images/logo-transperant-light.png"
                  alt="Logo"
                />
                <motion.h1
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 text-3xl font-bold text-tan"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold text-tan/90"
                >
                  Sign in to your <b>NextChapter</b> account
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    label="Email Address"
                    labelclassname="text-cream/90"
                    type="email"
                    placeholder="your@email.com"
                    icon={<EnvelopeIcon className="w-5 h-5 text-cream/60" />}
                    error={errors.email?.message}
                    {...register("email", emailValidationRules)}
                    maxLength={emailValidationRules.maxLength.value}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        /^[a-zA-Z0-9_.+\-@]$/,
                        "email",
                        "Email",
                        "Invalid character for email",
                        emailValidationRules.maxLength.value,
                      )
                    }
                    onInput={(e) =>
                      handleInput(
                        e,
                        /^[a-zA-Z0-9_.+\-@]$/,
                        emailValidationRules.maxLength.value,
                        "email",
                        "Email",
                      )
                    }
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Input
                    label="Password"
                    labelclassname="text-cream/90"
                    type="password"
                    placeholder="••••••••"
                    icon={<LockClosedIcon className="w-5 h-5 text-cream/60" />}
                    error={errors.password?.message}
                    {...register("password", passwordValidationRules)}
                  />
                </motion.div>

                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center"
                  >
                    <Checkbox
                      id="remember-me"
                      label="Remember me"
                      labelclassname="!text-cream/80"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm"
                  >
                    <p
                      onClick={() => setShowForgot(true)}
                      className="font-medium transition-colors cursor-pointer text-cream/80 hover:text-cream"
                    >
                      Forgot password?
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    Sign in
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-tan/30 "></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 py-1 font-semibold border rounded-full bg-coffee/50 backdrop-blur-md text-tan/70 border-tan/10">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SocialLoginButtons onComingSoonClick={() => openComingSoon()} />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center mt-6 text-center"
              >
                <p className="text-xs flex gap-1 items-center px-3 py-1 rounded-[12px] text-cream/80">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="flex items-center gap-1 font-medium transition-transform text-nowrap "
                  >
                    Sign up <span className="text-xl">&rarr;</span>
                  </Link>
                </p>
                <div className="text-xs  px-3 rounded-[12px] ">
                  <Link
                    to="/nextChapter"
                    className="flex items-center gap-1 px-3 py-1 font-medium transition-transform text-nowrap text-cream/80 rounded-xl "
                  >
                    Explore without login{" "}
                    <span className="text-xl">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 }}
              className="relative z-10 px-2 py-4 text-center bg-black/20 backdrop-blur-sm text-tan rounded-xl"
            >
              <p className="text-[11px] ">
                By creating an account, you agree to our{" "}
                <a
                  href="#"
                  className="font-semibold transition-all text-[12px] duration-200   hover:scale-105"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-semibold transition-all text-[12px] duration-200   hover:scale-105"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-center"
          >
            <p className="px-3 py-1 text-xs rounded-full bg-coffee/75 text-tan">
              <b>&copy; {new Date().getFullYear()} NextChapter.</b> All rights
              reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <ForgotPasswordModal
        showForgot={showForgot}
        setShowForgot={setShowForgot}
        email={emailValue}
        setShowResetModal={setShowResetModal}
        setCountdown={setCountdown}
        setLinkSent={setLinkSent}
      />

      <ResetPasswordModal
        showReset={showResetModal}
        setShowReset={setShowResetModal}
        resetToken={resetToken}
        setResetToken={setResetToken}
        email={emailValue}
        emailVerified={linkSent}
        countdown={countdown}
        setLinkSent={setLinkSent}
        setCountdown={setCountdown}
        isAuthenticated={isAuthenticated}
        forgotPasswordEmail={forgotPasswordEmail}
        afterExitingUserResettingPasswordPopup={
          afterExitingUserResettingPasswordPopup
        }
        setAfterExitingUserResettingPasswordPopupPopup={
          setAfterExitingUserResettingPasswordPopupPopup
        }
      />

      <EmailVerificationStatus
        status={verificationStatus}
        setStatus={setVerificationStatus}
        email={verificationEmail}
        password={passwordValue}
        onClose={setVerificationStatus}
        countdown={countdown}
        setCountdown={setCountdown}
      />
    </div>
  );
};

export default Login;
