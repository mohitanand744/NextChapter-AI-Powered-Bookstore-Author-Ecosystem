import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Modal from "../../Modal/ModalContainer";
import Button from "../../Buttons/Button";
import { authApis } from "../../../utils/apis/authApis";
import ModelsHeading from "../../Headings/ModelsHeading";
import { SuccessCheckmarkSvg } from "../../SVGs/SVGs";
import CancelModalWarning from "../../Modal/CancelModalWarning";

const EmailVerificationStatus = ({
  status,
  setStatus,
  email,
  password,
  countdown,
  setCountdown,
}) => {
  const [showModal, setShowModal] = useState(true);
  const [emailResent, setEmailResent] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [warningMsg, setWarningMsg] = useState(false);

  console.log(email, "email");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await authApis.login({ email, password });
    } catch (error) {
      setEmailResent(true);
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
      setCountdown(30);
    }
  };

  useEffect(() => {
    if (status === "alreadyVerified") {
      setShowModal(false);
      return
    } else {
      setShowModal(status !== "")
    }
  }, [status, setShowModal]);

  useEffect(() => {
    setTimeout(() => {
      setEmailResent(false);
    }, 3000);
  }, [emailResent]);

  console.log("status-------", status);


  const handleClose = () => {
    if (status === "unverified" && !warningMsg) {
      setWarningMsg(true);
      return;
    }
    confirmClose();
  };

  const confirmClose = () => {
    setShowModal(false);
    setEmailResent(false);
    setIsResending(false);
    setCountdown(0);
    setStatus("");
    setWarningMsg(false);
  };

  useEffect(() => {
    if (emailResent) {
      setStatus("unverified");
    }
  }, [emailResent]);

  // Success Modal - Email Verified
  const renderSuccessModal = (email) => (
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
        <h2 className="mb-3 text-2xl font-bold text-center ">
          Email Verified Successfully!
        </h2>
        <p className="mb-4 text-sm text-center ">
          Your email address <b>{email}</b> has been successfully verified.
          You can now access all features of your account.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleClose}
          variant="primary"
          className="w-full max-w-xs"
        >
          Continue to Login
        </Button>
      </div>
    </div>
  );

  // Failure Modal - Email Verification Failed
  const renderFailureModal = (email) => (
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
          className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-error/20 rounded-full"
        >
          <motion.svg
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-10 h-10 text-red-error"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circle */}
            <motion.circle
              cx="26"
              cy="26"
              r="25"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Line 1 */}
            <motion.path
              d="M16 16L36 36"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />

            {/* Line 2 */}
            <motion.path
              d="M36 16L16 36"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
          </motion.svg>
        </motion.div>

        <ModelsHeading
          heading="Verification Failed"
          subHeading={
            <>
              The verification link is invalid or has expired. Please request
              a new verification email <b>({email})</b>
            </>
          }
        />

        <AnimatePresence>
          {emailResent && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-4 mb-6 border border-tan/20 rounded-2xl bg-tan/5"
            >
              <p className="text-sm text-tan/80 text-center italic">
                "Verification email has been sent successfully in {email}. Please check
                your inbox."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
              : "Resend Verification"}
        </Button>

        <Button
          variant="outline"
          onClick={handleClose}
        >
          Back
        </Button>
      </div>
    </div>
  );

  // Unverified Modal - Check Your Inbox
  const renderUnverifiedModal = (email) => (
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
          <motion.svg
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-12 h-12 text-tan"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Triangle */}
            <motion.path
              d="M26 6L46 42H6L26 6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Exclamation line */}
            <motion.line
              x1="26"
              y1="18"
              x2="26"
              y2="30"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />

            {/* Dot */}
            <motion.circle
              cx="26"
              cy="36"
              r="2"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.2 }}
            />
          </motion.svg>
        </motion.div>

        <ModelsHeading
          heading="Complete Your Verification"
          subHeading={
            <>
              We've sent a <b>verification link</b> to your email{" "}
              <b>{email}</b>. Please check your inbox and click the link to
              verify your email address.
            </>
          }
        />

        <AnimatePresence>
          {emailResent && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-4 mb-6 border border-tan/20 rounded-2xl bg-tan/5"
            >
              <p className="text-sm text-tan/80 text-center italic">
                "Verification email has been resent successfully! Please check
                your inbox."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
              : "Resend Verification"}
        </Button>

        <div className="relative">
          <Button
            onClick={handleClose}
            variant="outline"
            className="w-full !bg-red-error/15 hover:!bg-red-error/20"
          >
            Cancel
          </Button>
          <AnimatePresence>
            {warningMsg && (
              <CancelModalWarning
                setWarningMsg={setWarningMsg}
                confirmClose={confirmClose}
                title="Exit Verification?"
                message="You're currently in the middle of verifying your email address. If you exit now, you can always continue using the verification link sent to your email. Please note that the link will remain valid for 10 minutes"
                stayText="Stay & Verify"
                exitText="Exit Anyway"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  // Render modal based on status
  const renderModal = (email) => {
    switch (status) {
      case "verified":
        return renderSuccessModal(email);
      case "failed":
        return renderFailureModal(email);
      case "unverified":
        return renderUnverifiedModal(email);
      default:
        return null;
    }
  };

  return (<Modal isOpen={showModal} onClose={handleClose}>

    {renderModal(email)}
  </Modal>)
};

export default EmailVerificationStatus;


