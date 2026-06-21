import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../components/Loaders/Loading";
import ListingPageSkeleton from "../components/Loaders/Skeleton/ListingPageSkeleton";
import SignUp from "../Pages/Auth/SignUp";
import { Toaster } from "sonner";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "../Pages/CheckoutPage";
import TrackingPage from "../Pages/TrackingPage";
import { validateToken } from "../store/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { FallbackRoute } from "./FallbackRoute";

const Login = lazy(() => import("../Pages/Auth/Login"));
const Layout = lazy(() => import("../Layout"));
const Home = lazy(() => import("../Pages/Home"));
const AllBooks = lazy(() => import("../Pages/AllBooks"));
const SingleBooks = lazy(() => import("../Pages/SingleBooks"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const ContactUs = lazy(() => import("../Pages/ContactUs"));
const AuthorProfile = lazy(() => import("../Pages/AuthorProfile"));
const AllAuthors = lazy(() => import("../Pages/AllAuthors"));
const UserProfile = lazy(() => import("../Pages/UserProfile"));
const OrdersPage = lazy(() => import("../Pages/OrderPage"));
const Wishlist = lazy(() => import("../Pages/Wishlist"));
import DevelopmentBanner from "../components/Common/DevelopmentBanner";
import { ComingSoonProvider } from "../store/Context/ComingSoonContext";

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ComingSoonProvider>
        <DevelopmentBanner />
        <Toaster
          position="bottom-right"
          expand={true}
          closeButton={true}
          richColors={true}
          toastOptions={{
            style: {
              background: "rgba(92, 76, 73, 0.85)",
              backdropFilter: "blur(24px) saturate(150%)",
              WebkitBackdropFilter: "blur(24px) saturate(150%)",
              color: "#ffe6c1",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0px 10px 40px -10px rgba(0,0,0,0.5), inset 0px 1px 0px rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              gap: "12px",
            },
          }}
        />

        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Default landing page for all users */}
            <Route path="/nextChapter" element={<Layout />}>
              <Route index element={<Home />} />

              {/* Public routes */}
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="contact" element={<ContactUs />} />
              <Route
                path="books"
                element={
                  <Suspense fallback={<ListingPageSkeleton page="books" />}>
                    <AllBooks />
                  </Suspense>
                }
              />
              <Route
                path="authors"
                element={
                  <Suspense fallback={<ListingPageSkeleton page="authors" />}>
                    <AllAuthors />
                  </Suspense>
                }
              />
              <Route
                path="book/:id"
                element={
                  <Suspense fallback={<ListingPageSkeleton page="bookDetail" />} >
                    <SingleBooks />
                  </Suspense>
                }
              />
              <Route
                path="author/:authorId"
                element={
                  <Suspense fallback={<ListingPageSkeleton page="authorProfile" />}>
                    <AuthorProfile />
                  </Suspense>
                }
              />

              {/* Protected routes */}
              <Route
                path="user/profile"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<ListingPageSkeleton page="profile" />}>
                      <UserProfile />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<ListingPageSkeleton page="orders" />}>
                      <OrdersPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="wishlist"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<ListingPageSkeleton page="wishlist" />}>
                      <Wishlist />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="tracking/:itemId/:trackingId"
                element={<TrackingPage />}
              />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<FallbackRoute />} />
          </Routes>
        </Suspense>
      </ComingSoonProvider>
    </BrowserRouter>
  );
};

export default Router;
