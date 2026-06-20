import React, { useEffect, useState } from "react";
import HomeBanner from "../components/Banners/HomeBanner";
import { useComingSoon } from "../store/Context/ComingSoonContext";
import Search from "../components/SearchBars/Search";

import CountdownTimer from "../components/OfferCounter/OfferCounter";
import ScrollBooks from "../components/ScrollingContainer/ScrollBooks";
import AuthorSlider from "../components/ScrollingContainer/AuthorSlider";
import ReviewsContainer from "../components/ScrollingContainer/ReviewsContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import ShowErrors from "../components/Errors/ShowErrors";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BooksLoader from "../components/Loaders/BooksLoader";
import BookCardSkeleton from "../components/Loaders/Skeleton/BookCardSkeleton";
import AuthorCardSkeleton from "../components/Loaders/Skeleton/AuthorCardSkeleton";
import TestimonialCardSkeleton from "../components/Loaders/Skeleton/TestimonialCardSkeleton";
import Button from "../components/Buttons/Button";
import SectionHeading from "../components/Headings/SectionHeading";
import NoData from "../components/EmptyData/noData";

import { useLoader } from "../Hooks/useLoader";
import { toast } from "sonner";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openComingSoon } = useComingSoon();

  useEffect(() => {
    const provider = searchParams.get("loginProvider");
    const isNewUser = searchParams.get("isNewUser") === "true";
    const accountLinked = searchParams.get("accountLinked") === "true";

    if (provider === "google") {
      let message = "Successfully logged in with Google";
      if (isNewUser) {
        message = "Successfully signed up with Google";
      } else if (accountLinked) {
        message = "Your Google account has been successfully linked.";
      }

      toast.success(message);

      navigate(window.location.pathname, { replace: true });
    }
  }, []);
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <>
      <HomeBanner />
      <div className="mx-auto w-[97%]">
        {/* Deal of the day Section */}
        <div className="mb-14">
          <SectionHeading subtitle="Limited Time Offer">
            Deal of the day
          </SectionHeading>
          <CountdownTimer />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-14">
              {[...Array(4)].map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="py-8 flex justify-center">
              <NoData title="No Deals Currently" message="Check back soon for amazing deals!" icon="search" />
            </div>
          ) : (
            <ScrollBooks books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
          )}
        </div>

        {/* Top Sellers Section */}
        <div className="mb-14">
          <SectionHeading subtitle="Our Most Loved Books">
            Top Sellers
          </SectionHeading>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-14">
              {[...Array(4)].map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="py-8 flex justify-center">
              <NoData title="No Top Sellers Yet" message="Books are flying off the shelves. Be right back!" icon="search" />
            </div>
          ) : (
            <>
              <ScrollBooks autoScroll={false} books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
              <div className="flex justify-center my-5">
                <Link to={"/nextChapter/books"}>
                  <Button variant="primary">View All</Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Favorite Author Section */}
        <div className="mb-14">
          <SectionHeading subtitle="Discover Great Minds">
            Find Your Favorite Author
          </SectionHeading>
          {loading ? (
            <div className="flex flex-wrap justify-center gap-6 pt-10 pb-16 px-4 md:px-8 lg:px-14">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[240px] md:w-[280px]">
                  <AuthorCardSkeleton />
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="py-8 flex justify-center">
              <NoData title="No Authors Found" message="We're inviting great minds. Stay tuned." icon="search" />
            </div>
          ) : (
            <>
              <AuthorSlider books={books} onComingSoonClick={(url) => openComingSoon({ exploreLink: url })} />
              <div className="flex justify-center my-5">
                <Link to={"/nextChapter/authors"}>
                  <Button variant="primary">View All Authors</Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Testimonials Section */}
        <div className="container">
          <SectionHeading subtitle="Testimonials">
            What Our Readers Say About Us
          </SectionHeading>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-4 md:px-8 lg:px-14">
              {[...Array(3)].map((_, i) => (
                <TestimonialCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ReviewsContainer />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;


