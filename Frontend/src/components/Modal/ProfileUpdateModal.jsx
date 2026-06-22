import React, { useState, useEffect, useRef } from "react";
import Modal from "./ModalContainer";
import { Controller, useForm } from "react-hook-form";
import ModelsHeading from "../Headings/ModelsHeading";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { categoryApis } from "../../utils/apis/categoryApis";
import { useLoader } from "../../Hooks/useLoader";
import {
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  PlusCircleIcon,
  TrashIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import NoData from "../EmptyData/noData";
import { userApis } from "../../utils/apis/userApis";
import { toast } from "sonner";
import {
  firstNameValidationRules,
  lastNameValidationRules,
  phoneValidationRules,
} from "../../utils/validations/rules";
import { VALIDATION_MESSAGES } from "../../utils/validations/messages";
import useInputHandlers from "../../Hooks/useInputHandlers";
import { addressApis } from "./../../utils/apis/addressApis";
import Radio from "../Inputs/Radio";
import useAuth from "../../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperNavButtons from "../Buttons/SwiperNavButtons";
import { EyesSvg } from "../SVGs/SVGs";
import ViewAddressDetailsModal from "./ViewAddressDetailsModal";
import Badge from "../Common/Badge";
import UnsavedChanges from "../Common/UnsavedChanges";

const ProfileUpdateModal = ({
  showProfileUpdateModal,
  setShowProfileUpdateModal,
  setShowAddressModal,
  type = "complete",
  user,
  profileDraft,
  setProfileDraft,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm();
  const [categoriesList, setCategoriesList] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const { loading } = useLoader();
  const [selectedId, setSelectedId] = useState(null);
  const [viewAddressDetails, setViewAddressDetails] = useState(false);
  const [showUnsavedPopup, setShowUnsavedPopup] = useState(false);
  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );
  const [isDefaultAddress, setIsDefaultAddress] = useState(null)
  const { userData, getUserUpdatedDetails } = useAuth();
  const swiperRef = useRef(null);

  const [isPulsing, setIsPulsing] = useState(false);
  const pulseTimeoutRef = useRef(null);

  const triggerPulse = () => {
    setIsPulsing(false);
    if (pulseTimeoutRef.current) {
      clearTimeout(pulseTimeoutRef.current);
    }
    setTimeout(() => {
      setIsPulsing(true);
      pulseTimeoutRef.current = setTimeout(() => {
        setIsPulsing(false);
      }, 500);
    }, 10);
  };

  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setProfileDraft(null);
    setShowProfileUpdateModal(false);
  };
  const handleCloseAttempt = () => {
    if (showUnsavedPopup) {
      triggerPulse();
      return;
    }
    if (isDirty || !!profileDraft) {
      setShowUnsavedPopup(true);
    } else {
      handleClose();
    }
  };

  const getAllCategoriesLists = async () => {
    try {
      const response = await categoryApis.getAllCategories();

      if (response?.success) {
        setCategoriesList(response?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (showProfileUpdateModal) {
      if (profileDraft) {
        reset(profileDraft);
      } else if (user?.name) {
        const nameParts = user.name.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        reset({
          firstName: firstName,
          lastName: lastName,
          phone: user?.phone,
          gender: user?.gender,
          favoriteGenres: user?.favoriteGenres?.map((genre) => genre.id) || [],
        });
      }
    }
  }, [user, showProfileUpdateModal, profileDraft]);

  const getUserAddressesList = async () => {
    try {
      const response = await addressApis.getUserAddresses();
      console.log(response);

      if (response?.success) {
        setUserAddresses(response?.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (showProfileUpdateModal) {
      getAllCategoriesLists();
      getUserAddressesList();
    }
  }, [showProfileUpdateModal]);

  const handleSetAsDefaultAddress = async (selectedId) => {
    const selectedAddr = userAddresses.find(
      (addr) => addr.id === selectedId.id,
    );

    if (!selectedAddr) return;

    if (selectedAddr.isDefault) return;

    try {
      const updatedData = { ...selectedAddr, isDefault: true };

      const res = await addressApis.updateAddress(selectedId.id, updatedData);

      if (res.success) {
        await getUserAddressesList();

        if (swiperRef.current) {
          swiperRef.current?.slideTo(0, 400);
        }
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message || "Error setting default address",
        );
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender,
        favoriteGenres: data.favoriteGenres,
      };

      if (data.address) {
        await handleSetAsDefaultAddress(data.address);
      }

      const result = await userApis.updateProfile(payload);

      if (result?.success) {
        toast.success(result?.message);
        handleClose();
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    if (!showProfileUpdateModal) return;

    const isDefault = userAddresses?.find((addr) => addr.isDefault);

    console.log("isDefault ----", isDefault);

    handleSetAsDefaultAddress(isDefault?.id);

    setIsDefaultAddress(isDefault ? true : false);
  }, [showProfileUpdateModal, userAddresses]);

  console.log(userAddresses);

  return (
    <Modal
      isOpen={showProfileUpdateModal}
      onClose={handleCloseAttempt}
      loading={loading}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-md mx-auto"
      >
        <ModelsHeading
          heading={
            type === "complete"
              ? "Complete Your Profile"
              : "Update Your Profile"
          }
          subHeading={
            type === "complete"
              ? "Please complete your profile"
              : "Update your profile information"
          }
        />
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              type="text"
              {...register("firstName", firstNameValidationRules)}
              placeholder="First Name"
              error={errors.firstName?.message}
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
              className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
            />
            <Input
              label="Last Name"
              type="text"
              {...register("lastName", lastNameValidationRules)}
              placeholder="Last Name"
              error={errors.lastName?.message}
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
              className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1">
            <Input
              label="Phone"
              type="tel"
              {...register("phone", phoneValidationRules)}
              onChange={(e) => {
                const originalValue = e.target.value;
                const numericValue = originalValue.replace(/[^0-9]/g, "");

                if (originalValue !== numericValue) {
                  setError("phone", {
                    type: "manual",
                    message: "Only numeric characters are allowed",
                  });
                  e.target.value = numericValue;
                  return;
                }

                if (numericValue.length > 0 && !/^[6-9]/.test(numericValue)) {
                  setError("phone", {
                    type: "manual",
                    message:
                      "Indian phone numbers must start with 6, 7, 8, or 9",
                  });
                  e.target.value = "";
                  return;
                }

                if (originalValue.length > 10) {
                  setError("phone", {
                    type: "manual",
                    message: "Phone number cannot exceed 10 digits",
                  });
                  e.target.value = originalValue.slice(0, 10);
                  return;
                }

                clearErrors("phone");
              }}
              placeholder="Enter your phone number"
              error={errors.phone?.message}
              icon={<PhoneIcon className="w-5 h-5 " />}
              className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Input
                  label="Gender"
                  as="select"
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHER", label: "Other" },
                  ]}
                  selectedValue={field.value}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                  placeholder="Select Gender"
                  className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                />
              )}
            />
            <Controller
              name="favoriteGenres"
              control={control}
              rules={{ required: "Favorite Genres is required" }}
              render={({ field }) => {
                const selectedGenres =
                  categoriesList?.filter((cat) =>
                    field.value?.includes(cat.id),
                  ) || [];

                return (
                  <>
                    <Input
                      label="Favorite Genres"
                      as="select"
                      multiple={true}
                      options={categoriesList?.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                      }))}
                      selectedValue={field.value || []}
                      onChange={field.onChange}
                      error={errors.favoriteGenres?.message}
                      placeholder="Select Favorite Genres"
                      className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                    />

                    <div className="mt-3">
                      <label className="block text-sm font-medium  mb-1">
                        Selected Favorite Genres
                      </label>

                      <div className="bg-black/10 border border-tan/20 p-1 rounded-3xl">
                        {selectedGenres?.length > 0 ? (
                          <div className="grid grid-cols-2 p-3 h-[140px] overflow-y-auto hideScroll gap-3">
                            {selectedGenres.map((genre) => (
                              <motion.div
                                key={genre.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative flex items-center justify-between h-8 min-w-0"
                              >
                                <Badge
                                  text={genre.name}
                                  variant="outline"
                                  className="w-full h-full"
                                />

                                <div
                                  onClick={() => {
                                    const newValue = field.value.filter(
                                      (v) => v !== genre.id,
                                    );
                                    field.onChange(newValue);
                                  }}
                                  className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-8 h-full text-red-error transition-all duration-200 ease-linear cursor-pointer rounded-r-2xl bg-red-error/10 active:scale-75 hover:scale-105"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2 h-[140px]">
                            <NoData
                              icon="heart"
                              title="No favorite genres selected"
                              message="Select your favorite genres so our AI can recommend books based on your preferences."
                              iconClassName="w-8 h-8"
                              messageClassName="text-sm"
                              titleClassName="text-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              }}
            />

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium  mb-1">
                  {userAddresses?.length > 0
                    ? "Select Default Address"
                    : "Add Address"}
                </label>

                {userAddresses?.length > 2 && (
                  <SwiperNavButtons
                    swiperRef={swiperRef}
                    className="!relative !w-auto !h-auto justify-end gap-2"
                    position={{}}
                    prevButtonClass="!w-7 !h-7 shadow-sm flex border border-cream items-center justify-center scale-90"
                    nextButtonClass="!w-7 !h-7 shadow-sm flex border border-cream items-center justify-center scale-90"
                  />
                )}
              </div>

              <Controller
                name="address"
                control={control}
                rules={{
                  required:
                    !isDefaultAddress
                      ? "Please select a default address"
                      : false,
                }}
                render={({ field, fieldState }) => (
                  <div
                    className={`bg-black/10 ${fieldState?.error?.message ? "border-red-error" : ""} border-2 border-tan/20 rounded-3xl p-1`}
                  >
                    {userAddresses.length > 0 ? (
                      <>
                        <Swiper
                          onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                          }}
                          spaceBetween={12}
                          slidesPerView={1.2}
                          breakpoints={{
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2 },
                          }}
                        >
                          {userAddresses.map((address) => {
                            const isSelected = field.value?.id === address.id;

                            return (
                              <SwiperSlide key={address.id}>
                                <div
                                  onClick={() => {
                                    field.onChange(address);
                                    clearErrors("address");
                                  }}
                                  className={`relative shadow-lg cursor-pointer rounded-xl border border-sepia/50 p-3 transition-all ${fieldState?.error?.message ? "border-red-error" : " border-tan/20"} duration-200 h-full ${isSelected
                                    ? "bg-tan/20 scale-105"
                                    : ""
                                    }`}
                                >
                                  <div
                                    className="absolute top-1 right-8  z-10 cursor-pointer active:scale-75 hover:scale-105 transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const Icon = address.type === "Home"
                                        ? HomeIcon
                                        : address.type === "Work"
                                          ? BuildingOfficeIcon
                                          : BuildingStorefrontIcon;
                                      setViewAddressDetails({ ...address, Icon });
                                    }}
                                  >
                                    <EyesSvg />
                                  </div>

                                  <div className="absolute top-1 -right-2">
                                    <Radio
                                      id={address.id}
                                      name="address"
                                      checked={isSelected}
                                      onChange={() => {
                                        field.onChange(address);
                                        clearErrors("address");
                                      }}
                                    />
                                  </div>

                                  {address.isDefault && (
                                    <Badge
                                      text="Default"
                                      variant="primary"
                                      className="absolute top-1.5 left-1.5"
                                    />
                                  )}

                                  <div className="mt-5 space-y-1 text-sm text-tan/80">
                                    <p className="font-medium text-tan">
                                      {address.address.slice(0, 15) + "..."}
                                    </p>
                                    <p>
                                      {address.city}, {address.state}
                                    </p>
                                    <p className="text-tan/50">
                                      PIN: {address.pinCode}
                                    </p>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>

                        {fieldState.error && (
                          <p className="mx-auto mb-2 text-[14px]  text-center text-red-error">
                            {fieldState.error.message}
                          </p>
                        )}
                        <div className="grid grid-cols-2 gap-2 p-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (field.value?.id) {
                                setProfileDraft(getValues());
                                setShowAddressModal(field.value);
                              } else {
                                setError("address", {
                                  message: "Please select any address",
                                });
                              }
                            }}
                            className="flex items-center justify-center w-full gap-2 text-sm"
                          >
                            <PencilIcon className="w-5 h-5" /> Edit
                          </Button>

                          <Button
                            type="button"
                            onClick={() => {
                              setProfileDraft(getValues());
                              setShowAddressModal("add");
                            }}
                            className="flex items-center justify-center w-full gap-2 text-sm"
                          >
                            <PlusCircleIcon className="w-6 h-6" /> Add
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="p-2 h-[180px]">
                        <NoData
                          icon={"search"}
                          title="You have not added any addresses"
                          message="Please Add your Address and complete your profile."
                          messageClassName="text-sm"
                          titleClassName="text-md"
                          showAction={true}
                          actionText="Add Address"
                          onActionClick={() => {
                            setProfileDraft(getValues());
                            setShowAddressModal("add");
                          }}
                        />

                        {fieldState.error && (
                          <p className="mx-auto mt-4 text-[14px]  text-center text-red-error">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseAttempt}
            >
              Back
            </Button>

            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Submit
            </Button>
          </div>
        </motion.form>
      </motion.div>

      <ViewAddressDetailsModal
        viewAddressDetails={viewAddressDetails}
        setViewAddressDetails={setViewAddressDetails}
      />

      <AnimatePresence>
        {showUnsavedPopup && (
          <UnsavedChanges
            onSave={() => {
              setShowUnsavedPopup(false);
              handleSubmit(onSubmit)();
            }}
            onDiscard={() => {
              setShowUnsavedPopup(false);
              handleClose();
            }}
            onClose={() => setShowUnsavedPopup(false)}
            isPulsing={isPulsing}
            showBadge={true}
          />
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ProfileUpdateModal;


