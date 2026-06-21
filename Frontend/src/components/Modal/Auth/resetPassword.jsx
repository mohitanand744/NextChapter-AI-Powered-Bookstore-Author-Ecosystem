import { useForm } from "react-hook-form";
import Input from "../../Inputs/Input";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../Modal/ModalContainer";
import Button from "../../Buttons/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { authApis } from "../../../utils/apis/authApis";
import { toast } from "sonner";
import useAuth from "../../../Hooks/useAuth";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessCheckmarkSvg } from "../../SVGs/SVGs";
import ModelsHeading from "../../Headings/ModelsHeading";
import CancelModalWarning from "../../Modal/CancelModalWarning";

const ResetPasswordModal = ({
  showReset,
  setShowReset,
  emailVerified,
  resetToken,
  countdown,
  setCountdown,
  isAuthenticated,
  forgotPasswordEmail,
  setLinkSent,
  setResetToken,
  afterExitingUserResettingPasswordPopup,
  setAfterExitingUserResettingPasswordPopupPopup,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [warningMsg, setWarningMsg] = useState(false);
  const navigate = useNavigate();
  const newPassword = watch("newPassword");
  const emailValue = watch("email");
  const { userData } = useAuth();

  forgotPasswordEmail = forgotPasswordEmail || localStorage.getItem("forgotPasswordEmail") || "";

  useEffect(() => {
    if (forgotPasswordEmail) {
      setValue("email", forgotPasswordEmail);
    }
  }, [forgotPasswordEmail, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await authApis.resetPassword(
        emailValue,
        data.newPassword,
        data.confirmPassword,
        resetToken,
      );

      if (response?.success) {
        setShowReset(false);
        toast.success(response?.message);
        navigate(isAuthenticated ? "/nextChapter" : "/");
        localStorage.removeItem("resetToken");
        setResetToken(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again later.",
      );

      setShowReset(false);
      localStorage.removeItem("resetToken");
    }
  };

  const handleClose = () => {
    setWarningMsg(true);
  };

  const confirmClose = () => {
    reset();
    setShowReset(false);
    setEmailResent(false);
    setIsResending(false);
    localStorage.removeItem("resetToken");
    setResetToken(false);
    localStorage.removeItem("forgotPasswordEmail");
    setWarningMsg(false);
  };

  const handleResendEmail = async () => {
    setIsResending(true);

    try {
      const finalEmail = forgotPasswordEmail;
      const response = await authApis.forgotPassword(finalEmail);

      if (response?.success) {
        setIsResending(false);
        setEmailResent(true);
      }
    } catch (error) {
      setIsResending(false);
      setEmailResent(false);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again later.",
      );
    }

    setCountdown(30);
  };

  useEffect(() => {
    if (emailResent) {
      setTimeout(() => {
        setEmailResent(false);
      }, 5000);
    }
  }, [emailResent]);
  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);


  // Email Sent UI - Show when email is not verified yet
  if (emailVerified) {
    return (
      <Modal isOpen={showReset} onClose={handleClose}>
        <div className="w-full">
          <div className="mb-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-tan/20 rounded-full"
            >
              <SuccessCheckmarkSvg className="w-10 h-10" />
            </motion.div>
            <ModelsHeading
              heading="Check Your Email"
              subHeading={`We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password.`}
            />
            <div className="text-center -mt-6 mb-8">
              <span className="px-4 py-1 bg-tan/10 rounded-full text-xs font-semibold text-tan/80 border border-tan/10">
                {forgotPasswordEmail}
              </span>
            </div>

            <AnimatePresence>
              {emailResent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-4 mb-6 border border-tan/20 rounded-2xl bg-tan/5"
                >
                  <p className="text-sm text-tan/80 italic text-center">
                    "Reset link has been resent successfully! Please check your
                    email."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            <Button
              onClick={handleResendEmail}
              variant="primary"
              isLoading={isResending}
              className="w-full"
              disabled={isResending || countdown > 0}
            >
              {countdown > 0
                ? `Resend in ${countdown}s`
                : isResending
                  ? "Sending..."
                  : "Resend Reset Link"}
            </Button>
            {warningMsg && (
              <CancelModalWarning
                setWarningMsg={setWarningMsg}
                confirmClose={confirmClose}
              />
            )}
            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full !bg-red-error/15 hover:!bg-red-error/20"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  if (isAuthenticated && afterExitingUserResettingPasswordPopup) {
    return (
      <Modal isOpen={showReset} onClose={handleClose}>
        <ModelsHeading
          heading="Account Confirmation"
          subHeading="Please confirm your account details before resetting your password."
        />

        <div className="space-y-4 mb-8">
          <div className="bg-tan/10 p-4 rounded-2xl border border-tan/5">
            <p className="text-xs uppercase tracking-wider text-tan/40 font-bold mb-1">
              Currently Logged In
            </p>
            <p className="font-semibold text-tan">
              {userData?.email}
            </p>
          </div>

          <div className="bg-tan/10 p-4 rounded-2xl border border-tan/5">
            <p className="text-xs uppercase tracking-wider text-tan/40 font-bold mb-1">
              Resetting For Account
            </p>
            <p className="font-semibold text-tan">
              {forgotPasswordEmail}
            </p>
          </div>

          <p className="text-sm text-tan/60 leading-relaxed italic text-center px-4">
            If you continue, the password for the second account will be
            updated. You will remain logged in to your current account.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            variant="primary"
            onClick={() => {
              setAfterExitingUserResettingPasswordPopupPopup("");
            }}
          >
            Continue
          </Button>

          <Button
            onClick={() => {
              navigate("/nextChapter");
              confirmClose();
            }}
            variant="outline"
            className="w-full"
          >
            Back
          </Button>
        </div>
      </Modal>
    );
  }

  // Reset Password Form - Show when email is verified and user clicked the link
  return (
    <Modal isOpen={showReset} onClose={handleClose}>
      <div className="w-full">
        <ModelsHeading
          heading="Reset Password"
          subHeading="Enter your new password and confirm it to regain access."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            icon={<LockClosedIcon className="w-5 h-5 " />}
            endicon={
              showNewPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5  cursor-pointer"
                  onClick={() => setShowNewPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5  cursor-pointer"
                  onClick={() => setShowNewPassword(true)}
                />
              )
            }
            error={errors.newPassword?.message}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            })}
            className="h-[50px]"
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            icon={<LockClosedIcon className="w-5 h-5 " />}
            endicon={
              showConfirmPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5  cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5  cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )
            }
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="h-[50px]"
            preventCopyPaste={true}
          />

          <div className="relative grid grid-cols-2 gap-4">
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Reset Password
            </Button>

            {warningMsg && (
              <CancelModalWarning
                setWarningMsg={setWarningMsg}
                confirmClose={confirmClose}
              />
            )}
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;


