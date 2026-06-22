import { Controller, set, useForm } from "react-hook-form";
import {
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  PencilSquareIcon,
  TrashIcon,
  MapIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import Modal from "./ModalContainer";
import Checkbox from "../Inputs/Checkbox";
import { toast } from "sonner";
import NoData from "../EmptyData/noData";
import { addressApis } from "../../utils/apis/addressApis";
import { useLoader } from "../../Hooks/useLoader";
import BooksLoader from "../Loaders/BooksLoader";
import ModelsHeading from "../Headings/ModelsHeading";
import { EyesSvg } from "../SVGs/SVGs";
import useInputHandlers from "../../Hooks/useInputHandlers";
import ViewAddressDetailsModal from "./ViewAddressDetailsModal";
import Badge from "../Common/Badge";
import UnsavedChanges from "../Common/UnsavedChanges";

const AddressModal = ({
  showAddress,
  setShowAddress,
  dbStates,
  setDbStates,
  setShowProfileUpdateModal,
}) => {
  const [activeTab, setActiveTab] = useState("select");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editAddressData, setEditAddressData] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [showUnsavedPopup, setShowUnsavedPopup] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
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
  const { loading } = useLoader();
  const [viewAddressDetails, setViewAddressDetails] = useState(false);
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
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      type: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      isDefault: false,
    }
  });
  const UserPinCode = watch("pinCode");
  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );

  const fetchData = async () => {
    try {
      const addrRes = await addressApis.getUserAddresses();
      if (addrRes?.success) setAddresses(addrRes.data || []);
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error("Failed to load address data");
      }
    }
  };

  const fetchStates = async () => {
    try {
      const statesRes = await addressApis.getStatesFromDB();
      if (statesRes?.success) setDbStates(statesRes.data || []);
    } catch (error) {
      toast.error("Failed to load states data");
    }
  };

  useEffect(() => {
    if (!showAddress) return;
    fetchData();
  }, [showAddress]);
  useEffect(() => {
    if (dbStates.length === 0 && activeTab === "add") {
      fetchStates();
    }
  }, [dbStates, activeTab]);

  const addressTypeIcons = {
    Home: HomeIcon,
    Work: BuildingOfficeIcon,
    Other: BuildingStorefrontIcon,
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
  };

  const handleAddNewAddress = () => {
    setActiveTab("add");
    reset({
      type: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      isDefault: false,
    });
    setSelectedAddress(null);
  };

  useEffect(() => {
    if (showAddress === "add") {
      handleAddNewAddress();
      setShowProfileUpdateModal(false);
    }
  }, [showAddress]);

  const handleAttemptAction = (actionCallback) => {
    if (showUnsavedPopup) {
      triggerPulse();
      return;
    }
    if (activeTab === "add" && isDirty) {
      setShowUnsavedPopup(true);
      setPendingAction(() => actionCallback);
    } else {
      actionCallback();
    }
  };

  const handleBackToSelection = () => {
    reset({
      type: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      isDefault: false,
    });
    setEditAddressData(null);
    setSelectedAddress(null);
    setActiveTab("select");
  };

  const handleEditAddress = (address) => {
    console.log("successssssssssssssss");

    setActiveTab("add");
    setEditAddressData(address);

    reset({
      type: address.type,
      address: address.address,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      isDefault: address.isDefault,
    });
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setAddressToDelete(id);
  };

  const confirmDelete = async () => {
    if (!addressToDelete) return;
    try {
      const res = await addressApis.deleteAddress(addressToDelete);
      if (res.success) {
        toast.success("Address deleted successfully!");
        if (selectedAddress === addressToDelete) {
          setSelectedAddress(null);
        }
        await fetchData();
      } else {
        toast.error(res.message || "Failed to delete address");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error("An error occurred while deleting the address");
      }
    } finally {
      setAddressToDelete(null);
    }
  };

  const getCitiesStatesWithPin = async (pinCode) => {
    try {
      const res = await addressApis.getStatesCites(pinCode);
      const data = res[0];

      if (data?.Status === "Success") {
        const postOffice = data.PostOffice[0];

        const correctCity = postOffice.District || postOffice.Block;
        const correctState = postOffice.State;

        clearErrors(["pinCode"]);

        return { success: true, correctCity, correctState };
      } else {
        setError("pinCode", {
          type: "manual",
          message: "Invalid Pincode. Please enter a valid 6-digit Pincode.",
        });
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify pincode. Please try again.");
      setError("pinCode", {
        type: "manual",
        message: "Failed to verify pincode",
      });
      return false;
    }
  };

  const submitAddressData = async (dataToSubmit) => {
    try {
      if (editAddressData) {
        const res = await addressApis.updateAddress(editAddressData.id, dataToSubmit);
        if (res.success) {
          toast.success("Address updated successfully!");

          if (showAddress?.id) {
            setShowProfileUpdateModal(true);
            setShowAddress(false);
          }
        }
      } else {
        const res = await addressApis.addAddress(dataToSubmit);
        if (res.success) {
          toast.success("Address added successfully!");

          if (showAddress === "add") {
            setShowProfileUpdateModal(true);
            setShowAddress(false);
          }
        } else {
          toast.error(res.message || "Failed to add address");
        }
      }
      await fetchData();
      handleBackToSelection();
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message ||
          "An error occurred while saving the address",
        );
      }
    }
  };

  const validateAndSubmit = async (data) => {
    if (data.pinCode?.length !== 6) {
      toast.error("Please enter a valid 6-digit Pincode.");
      return;
    }

    const res = await getCitiesStatesWithPin(data.pinCode);
    if (!res || !res.success) return;

    const enteredCity = data.city?.trim().toLowerCase();
    const enteredState = data.state?.trim().toLowerCase();
    const actualCity = res.correctCity?.trim().toLowerCase();
    const actualState = res.correctState?.trim().toLowerCase();

    if (enteredCity !== actualCity || enteredState !== actualState) {
      setConfirmationData({
        ...data,
        correctCity: res.correctCity,
        correctState: res.correctState,
      });
      return;
    }

    submitAddressData(data);
  };

  useEffect(() => {
    const fetchCityState = async () => {
      if (activeTab === "add" && UserPinCode?.length === 6) {
        const res = await getCitiesStatesWithPin(UserPinCode);
        if (res && res.success) {
          setValue("city", res.correctCity);
          setValue("state", res.correctState);
          clearErrors(["city", "state"]);
        }
      }
    };
    fetchCityState();
  }, [UserPinCode, activeTab]);

  useEffect(() => {
    if (showAddress === false) {
      setSelectedAddress(null);
    }
  }, [showAddress]);

  const handleSetDefaultAddress = async () => {
    const selected = addresses.find((addr) => addr.id === selectedAddress);

    if (!selected) return;

    if (selected.isDefault) {
      setShowAddress(false);
      return;
    }

    try {
      const updatedData = { ...selected, isDefault: true };

      const res = await addressApis.updateAddress(selected.id, updatedData);

      if (res.success) {
        toast.success("Default address updated successfully!");
        await fetchData();
      } else {
        toast.error(res.message || "Failed to set default address");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error setting default address",
      );
    } finally {
      setShowAddress(false);
    }
  };

  const handleProfileUpdateEditAddress = () => {
    if (!showAddress?.id) return;

    setShowProfileUpdateModal(false);
    handleEditAddress(showAddress);
  };

  useEffect(() => {
    if (showAddress?.id) {
      handleProfileUpdateEditAddress();
    }
  }, [showAddress]);

  return (
    <Modal
      isOpen={showAddress}
      onClose={() => {
        handleAttemptAction(() => {
          if (showAddress === "add" || showAddress?.id) {
            setShowProfileUpdateModal(true);
            setShowAddress(false);
          }
          setShowAddress(false);
          handleBackToSelection();
        });
      }}
      loading={loading}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-md mx-auto"
      >
        <ModelsHeading
          heading={"Delivery Address"}
          subHeading={"Choose where you want your order delivered"}
        />

        <div className="flex mb-6 border-b border-sepia">
          {["select", "add"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                handleAttemptAction(() => {
                  setActiveTab(tab);
                  if (tab === "select") {
                    handleBackToSelection();
                  } else if (tab === "add" && !editAddressData) {
                    handleAddNewAddress();
                  }
                });
              }}
              className="relative flex-1 py-3 font-medium text-center transition-colors duration-300"
            >
              <span
                className={
                  activeTab === tab
                    ? "text-tan"
                    : "text-tan/60 hover:text-tan"
                }
              >
                {tab === "select" ? "Saved Addresses" : "Add New"}
              </span>

              {activeTab === tab && (
                <motion.div
                  layoutId="AddressTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-tan"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                ></motion.div>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "select" ? (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 "
            >
              {addresses?.length === 0 ? (
                <>
                  <NoData
                    title="No Address Found"
                    message="Please add a new address"
                    icon="search"
                    showAction={true}
                    actionText="Add New Address"
                    onActionClick={handleAddNewAddress}
                  />
                </>
              ) : (
                <div className="h-[240px] space-y-2 overflow-y-auto p-3">
                  {addresses?.map((address) => {
                    const Icon = addressTypeIcons[address.type] || HomeIcon;

                    return (
                      <div
                        key={address.id}
                        onClick={() => handleAddressSelect(address)}
                        className={`p-4 rounded-xl cursor-pointer bg-tan/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 ease-linear ${selectedAddress === address.id
                          ? "border-[4px] border-tan shadow-xl"
                          : "border border-tan/20"
                          }`}
                      >
                        <div className="relative flex items-start gap-3">
                          <PencilSquareIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="w-5 active:scale-75 hover:scale-105 transition-all duration-200 ease-linear h-5 absolute top-0 right-0 cursor-pointer text-tan"
                          />
                          <div
                            onClick={() =>
                              setViewAddressDetails({ ...address, Icon })
                            }
                            className="absolute active:scale-75 hover:scale-105 transition-all duration-200 ease-linear text-tan top-0 w-5 h-5 right-7"
                          >
                            <EyesSvg />
                          </div>
                          <TrashIcon
                            onClick={(e) => handleDeleteClick(e, address.id)}
                            className="absolute bottom-0 right-0 w-5 h-5 text-red-600 transition-all duration-200 ease-linear cursor-pointer active:scale-75 hover:scale-105"
                          />

                          <div
                            className={`p-1 rounded-lg ${address.color} text-tan`}
                          >
                            <Icon className="w-7 h-7" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                text={address.type}
                                variant="outline"
                              />
                              {address.isDefault && (
                                <Badge
                                  text="Default"
                                  variant="primary"
                                />
                              )}
                            </div>
                            <p className="text-sm text-tan/70 [overflow-wrap:anywhere]">
                              {address.address.length < 50
                                ? address.address
                                : address.address.slice(0, 50) + "..."}
                            </p>
                            <p className="text-sm text-tan/50">
                              {address.city}, {address.state} {address.pinCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 text-sm"
                  onClick={() => {
                    setShowAddress(false);
                    if (showAddress === "add" || showAddress?.id) {
                      setShowProfileUpdateModal(true);
                      setShowAddress(false);
                    }
                    handleBackToSelection();
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-sm"
                  disabled={!selectedAddress}
                  onClick={handleSetDefaultAddress}
                >
                  Set as Default Address
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(validateAndSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Address type is required" }}
                  render={({ field }) => (
                    <Input
                      label="Address Type"
                      as="select"
                      options={[
                        { value: "Home", label: "Home" },
                        { value: "Work", label: "Work" },
                        { value: "Other", label: "Other" },
                      ]}
                      selectedValue={field.value}
                      onChange={field.onChange}
                      error={errors.type?.message}
                      placeholder="Select Address Type"
                      className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                    />
                  )}
                />
                <Input
                  label="Pin Code"
                  {...register("pinCode", {
                    required: "Pin code is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "PIN code must be exactly 6 digits",
                    },
                  })}
                  error={errors.pinCode?.message}
                  placeholder="Enter Pin code"
                  maxLength={6}
                  className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      /^[0-9]$/,
                      "pinCode",
                      "Pin Code",
                      "Only numbers are allowed in Pin Code",
                      6,
                    )
                  }
                  onInput={(e) =>
                    handleInput(e, /^[0-9]$/, 6, "pinCode", "Pin Code")
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="City"
                  {...register("city", {
                    required: "City is required",
                  })}
                  error={errors.city?.message}
                  placeholder="Enter City"
                  className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      /^[a-zA-Z\s]$/,
                      "city",
                      "City",
                      "Only letters and spaces are allowed in City",
                      50,
                    )
                  }
                  onInput={(e) =>
                    handleInput(e, /^[a-zA-Z\s]$/, 50, "city", "City")
                  }
                />

                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Input
                      label="State"
                      as="select"
                      options={dbStates.map((s) => ({
                        value: s.name,
                        label: s.name,
                      }))}
                      selectedValue={field.value}
                      onChange={field.onChange}
                      error={errors.state?.message}
                      placeholder="Select State"
                      className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                    />
                  )}
                />
              </div>

              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Street address is required",
                  maxLength: {
                    value: 255,
                    message: "Street address cannot exceed 255 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Street address must be at least 5 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    as="textarea"
                    label="Street Address"
                    icon={<MapPinIcon className="w-5 h-5" />}
                    error={errors.address?.message}
                    placeholder="Enter Street Address"
                    value={field.value}
                    onChange={field.onChange}
                    showCounter={true}
                    maxCount={255}
                    maxLength={255}
                    className="bg-tan/10 hover:bg-tan/20 transition-all duration-300"
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        /^[a-zA-Z0-9\s,.\-/#]$/,
                        "address",
                        "Street Address",
                        "Invalid character for Street Address",
                        255,
                      )
                    }
                    onInput={(e) => {
                      handleInput(
                        e,
                        /^[a-zA-Z0-9\s,.\-/#]$/,
                        255,
                        "address",
                        "Street Address",
                      );
                    }}
                  />
                )}
              />

              <Checkbox
                id="defaultAddress"
                label="Set as default address"
                {...register("isDefault")}
              />

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAttemptAction(handleBackToSelection)}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  {editAddressData ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showUnsavedPopup && (
          <UnsavedChanges
            onSave={() => {
              setShowUnsavedPopup(false);
              handleSubmit(validateAndSubmit)();
            }}
            onDiscard={() => {
              setShowUnsavedPopup(false);
              if (pendingAction) {
                pendingAction();
                setPendingAction(null);
              }
            }}
            onClose={() => setShowUnsavedPopup(false)}
            title="Unsaved Changes"
            message="You have entered some details. Do you want to save it or go back without saving?"
            isPulsing={isPulsing}
            containerClassName="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
            cardClassName="w-full max-w-sm p-6 bg-coffee text-tan border border-tan shadow-xl rounded-xl"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmationData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-coffee text-tan border border-tan shadow-xl rounded-xl"
            >
              <h3 className="mb-2 text-xl font-bold text-tan">
                Incorrect address
              </h3>
              <p className="mb-4 text-sm text-tan/70">
                The entered address is incorrect. Please select any of the
                suggested address.
              </p>

              <div className="p-3 mb-6 bg-tan/5 border border-tan/20 rounded-lg">
                <p className="text-sm text-tan/80 break-words">
                  {confirmationData.address},{" "}
                  <span className="text-red-error line-through decoration-red-error">
                    {confirmationData.city} {confirmationData.state}
                  </span>{" "}
                  {confirmationData.correctCity},{" "}
                  {confirmationData.correctState} — {confirmationData.pinCode}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    setValue("city", confirmationData.correctCity);
                    setValue("state", confirmationData.correctState);
                    clearErrors(["city", "state"]);

                    submitAddressData({
                      ...confirmationData,
                      city: confirmationData.correctCity,
                      state: confirmationData.correctState,
                    });
                    setConfirmationData(null);
                  }}
                >
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setConfirmationData(null)}
                >
                  Back
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addressToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-coffee text-tan border border-tan shadow-xl rounded-xl"
            >
              <h3 className="mb-2 text-xl font-bold text-tan">
                Delete Address
              </h3>

              <div className="p-3 mb-6 bg-tan/5 border border-tan/20 rounded-lg">
                <p className="text-sm text-tan/80">
                  Are you sure you want to delete this address? This action
                  cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setAddressToDelete(null)}
                >
                  Back
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ViewAddressDetailsModal
        viewAddressDetails={viewAddressDetails}
        setViewAddressDetails={setViewAddressDetails}
      />
    </Modal>
  );
};

export default AddressModal;


