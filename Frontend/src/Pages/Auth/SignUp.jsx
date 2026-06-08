import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "../../components/Buttons/Button";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Input from "../../components/Inputs/Input";
import Checkbox from "../../components/Inputs/Checkbox";
import Radio from "../../components/Inputs/Radio";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApis } from "../../utils/apis/authApis";
import useAuth from "../../Hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  confirmPasswordValidation,
  emailValidationRules,
  firstNameValidationRules,
  lastNameValidationRules,
  passwordValidationRules,
} from "../../utils/validations/rules";
import { VALIDATION_MESSAGES } from "../../utils/validations/messages";
import useInputHandlers from "../../Hooks/useInputHandlers";
import ComingSoonModal from "../../components/Modal/ComingSoonModal";
import SocialLoginButtons from "../../components/Buttons/Auth/SocialLoginButtons";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    trigger,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      role: "",
    },
  });

  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const dispatch = useDispatch();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nextChapter", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      terms_accepted: data.termsAccepted,
      role: data.role,
    };

    try {
      const response = await authApis.signup(payload);

      if (response?.success) {
        toast.success(response?.message || "Signup successful!");
        navigate("/");
        reset();
      } else {
        toast.error(response?.message || "Signup failed. Please try again.");
        reset();
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      );
      reset();
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
          className="w-full max-w-lg"
        >
          <motion.div
            layout
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-coffee/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 rounded-3xl border border-tan/10 relative"
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
                  className="mb-2 font-serif text-4xl font-bold tracking-tight text-tan"
                >
                  Open Your NextChapter
                </motion.h1>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm italic font-medium text-tan/70"
                >
                  `` Every story begins with a single choice. ``
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setValue("role", "user", { shouldValidate: true })
                    }
                    className={`relative overflow-hidden group p-5 rounded-2xl border-t-2 border-b-2 transition-all duration-500 ${
                      watch("role") === "user"
                        ? "bg-tan/10 border-tan shadow-[0_0_25px_rgba(210,180,140,0.15)]"
                        : "bg-black/20 border-tan/10 hover:border-tan/30"
                    }`}
                  >
                    <div className="z-10 flex flex-col items-center gap-2">
                      <div
                        className={` p-0.5 rounded-2xl border-t-2 border-b-2 transition-all duration-500 ${watch("role") === "user" ? "border-tan scale-110 shadow-lg" : "border-transparent opacity-50"}`}
                      >
                        <img
                          src="/images/patron-avatar.png"
                          alt="Patron"
                          className="object-cover w-28 h-28 rounded-2xl bg-tan/10"
                        />
                      </div>

                      <div className="absolute top-2 -right-1">
                        <Radio
                          {...register("role", {
                            required:
                              "Role is required please select your role",
                          })}
                          value="user"
                          checked={watch("role") === "user"}
                          onChange={() =>
                            setValue("role", "user", { shouldValidate: true })
                          }
                          label=""
                          className="scale-110"
                        />
                      </div>
                      <span
                        className={`font-bold text-sm uppercase tracking-[0.2em] transition-colors duration-500 ${watch("role") === "user" ? "text-tan" : "text-tan/50"}`}
                      >
                        Patron
                      </span>
                      <p
                        className={`text-[14px] text-center -mt-2 transition-opacity duration-500 ${watch("role") === "user" ? "text-cream/60" : "text-cream/30"}`}
                      >
                        Read, Engage & Support
                      </p>
                    </div>
                    {watch("role") === "user" && (
                      <motion.div
                        layoutId="role-glow"
                        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-tan/10 to-transparent"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setValue("role", "author", { shouldValidate: true })
                    }
                    className={`relative overflow-hidden group p-5 rounded-2xl border-t-2 border-b-2 transition-all duration-500 ${
                      watch("role") === "author"
                        ? "bg-tan/10 border-tan shadow-[0_0_25px_rgba(210,180,140,0.15)]"
                        : "bg-black/20 border-tan/10 hover:border-tan/30"
                    }`}
                  >
                    <div className="z-10 flex flex-col items-center gap-2">
                      <div
                        className={` p-0.5 rounded-2xl border-t-2  border-b-2 transition-all duration-500 ${watch("role") === "author" ? "border-tan scale-110 shadow-lg" : "border-transparent opacity-50"}`}
                      >
                        <img
                          src="/images/author-avatar.jpeg"
                          alt="Author"
                          className="object-cover w-28 h-28 rounded-2xl bg-tan/10"
                        />
                      </div>

                      <div className="absolute top-2 -right-1">
                        <Radio
                          {...register("role", {
                            required:
                              "Role is required please select your role",
                          })}
                          value="author"
                          checked={watch("role") === "author"}
                          onChange={() =>
                            setValue("role", "author", { shouldValidate: true })
                          }
                          label=""
                          className="scale-110 "
                        />
                      </div>
                      <span
                        className={`font-bold text-sm uppercase mt-1 tracking-[0.2em] transition-colors duration-500 ${watch("role") === "author" ? "text-tan" : "text-tan/50"}`}
                      >
                        Author
                      </span>
                      <p
                        className={`text-[14px] text-center transition-opacity duration-500 -mt-2 ${watch("role") === "author" ? "text-cream/60" : "text-cream/30"}`}
                      >
                        Write, Sell & Share
                      </p>
                    </div>
                    {watch("role") === "author" && (
                      <motion.div
                        layoutId="role-glow"
                        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-tan/10 to-transparent"
                      />
                    )}
                  </button>
                </motion.div>
                {errors.role && (
                  <p className="text-red-error text-sm mt-[-1rem] mb-4 text-center">
                    {errors.role.message}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Input
                      label="First Name"
                      labelclassname="text-cream/90"
                      type="text"
                      placeholder="First Name"
                      icon={<UserIcon className="w-5 h-5 text-cream/60" />}
                      error={errors.firstName?.message}
                      {...register("firstName", firstNameValidationRules)}
                      maxLength={firstNameValidationRules.maxLength.value}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          /^[A-Za-z\s]$/,
                          "firstName",
                          "First Name",
                          VALIDATION_MESSAGES.OnlyLetters,
                          firstNameValidationRules.maxLength.value,
                        )
                      }
                      onInput={(e) =>
                        handleInput(
                          e,
                          /^[A-Za-z\s]$/,
                          firstNameValidationRules.maxLength.value,
                          "firstName",
                          "First Name",
                        )
                      }
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Input
                      label="Last Name"
                      labelclassname="text-cream/90"
                      type="text"
                      placeholder="Last Name"
                      icon={<UserIcon className="w-5 h-5 text-cream/60" />}
                      error={errors.lastName?.message}
                      {...register("lastName", lastNameValidationRules)}
                      maxLength={lastNameValidationRules.maxLength.value}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          /^[A-Za-z\s]$/,
                          "lastName",
                          "Last Name",
                          VALIDATION_MESSAGES.OnlyLetters,
                          lastNameValidationRules.maxLength.value,
                        )
                      }
                      onInput={(e) =>
                        handleInput(
                          e,
                          /^[A-Za-z\s]$/,
                          lastNameValidationRules.maxLength.value,
                          "lastName",
                          "Last Name",
                        )
                      }
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4"
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
                  transition={{ delay: 0.6 }}
                  className="mb-4"
                >
                  <Input
                    label="Password"
                    labelclassname="text-cream/90"
                    type="password"
                    placeholder="Enter password"
                    icon={<LockClosedIcon className="w-5 h-5 text-cream/60" />}
                    error={errors.password?.message}
                    {...register("password", passwordValidationRules)}
                    maxLength={passwordValidationRules.maxLength.value}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        null,
                        "password",
                        "Password",
                        null,
                        passwordValidationRules.maxLength.value,
                      )
                    }
                    onInput={(e) =>
                      handleInput(
                        e,
                        null,
                        passwordValidationRules.maxLength.value,
                        "password",
                        "Password",
                      )
                    }
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mb-6"
                >
                  <Input
                    label="Confirm Password"
                    labelclassname="text-cream/90"
                    type="password"
                    placeholder="Repeat password"
                    icon={<LockClosedIcon className="w-5 h-5 text-cream/60" />}
                    error={errors.confirmPassword?.message}
                    {...register(
                      "confirmPassword",
                      confirmPasswordValidation(getValues),
                    )}
                    maxLength={
                      confirmPasswordValidation(getValues).maxLength.value
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        null,
                        "confirmPassword",
                        "Confirm Password",
                        null,
                        confirmPasswordValidation(getValues).maxLength.value,
                      )
                    }
                    onInput={(e) =>
                      handleInput(
                        e,
                        null,
                        confirmPasswordValidation(getValues).maxLength.value,
                        "confirmPassword",
                        "Confirm Password",
                      )
                    }
                    preventCopyPaste={true}
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center mb-6"
                >
                  <Checkbox
                    id="termsAccepted"
                    labelclassname="text-cream/80"
                    label={
                      <span className="">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="font-semibold hover:underline text-cream"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="font-semibold hover:underline text-cream"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    }
                    error={errors.termsAccepted?.message}
                    {...register("termsAccepted", {
                      required: VALIDATION_MESSAGES.termsAcceptedRequired,
                      validate: (value) => value === true || "Please accept",
                    })}
                  />
                </motion.div>

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
                    disabled={isSubmitting}
                  >
                    Create Account
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
                    <span className="px-4 py-1.5 bg-coffee/80 backdrop-blur-md text-tan/70 rounded-full border border-tan/20 font-serif italic text-xs">
                      Sign in with your social account
                    </span>
                  </div>
                </div>

                <SocialLoginButtons onComingSoonClick={() => setIsComingSoonOpen(true)} />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center gap-3 mt-6 text-center"
              >
                <p className="text-xs flex gap-1 items-center px-3 rounded-[12px] text-cream/80">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="flex items-center gap-1 font-medium transition-transform text-cream "
                  >
                    Sign in <span className="text-xl">&rarr;</span>
                  </Link>
                </p>
                <div className="text-xs px-3 rounded-[12px] text-cream/80">
                  <Link
                    to="/nextChapter"
                    className="flex items-center gap-1 font-medium transition-transform text-cream "
                  >
                    Explore without account{" "}
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
            <p className="px-3 py-1 text-xs rounded-full text-tan bg-cream/20 ">
              <b>&copy; {new Date().getFullYear()} NextChapter.</b> All rights
              reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </div>
  );
};

export default SignUp;
