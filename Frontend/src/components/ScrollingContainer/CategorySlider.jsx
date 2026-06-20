import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { categoryApis } from "../../utils/apis/categoryApis";
import { FaCheckCircle } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import AppImage from "../Common/AppImage";
import CategorySliderSkeleton from "../Loaders/Skeleton/CategorySliderSkeleton";

const categories = [
  {
    name: "Fiction",
    image: "https://m.media-amazon.com/images/I/71P+4DslKmL._SL1500_.jpg",
  },
  {
    name: "Non-Fiction",
    image:
      "https://observer.com/wp-content/uploads/sites/2/2025/01/Best-New-Nonfiction-Books-Coming-Out-in-2025.png?quality=80",
  },
  {
    name: "Mystery",
    image:
      "https://www.novelsuspects.com/wp-content/uploads/2021/04/Featured-Imaged-4.png",
  },
  {
    name: "Fantasy",
    image:
      "https://i.pinimg.com/736x/8f/4f/f8/8f4ff802576845df5040c6cbea06e5ea.jpg",
  },
  {
    name: "Science Fiction",
    image: "https://kevnit.com/wp-content/uploads/2024/02/Science-Fiction.jpg",
  },
  {
    name: "Biography",
    image:
      "https://www.thoughtco.com/thmb/xSPZWJbn39aKLR3efNrggf_NXh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/biography_glossary-57e2311f5f9b586516b4072e.jpg",
  },
  {
    name: "Self-Help",
    image: "https://edlines.co/wp-content/uploads/2024/06/selfhelp.jpg",
  },
  {
    name: "Romance",
    image:
      "https://thedailyaztec.com/wp-content/uploads/2022/02/romance-books.jpg",
  },
  {
    name: "History",
    image:
      "https://images.stockcake.com/public/5/b/1/5b16cd96-8b6f-4e5f-a38a-7d8dbd520b8f_large/ancient-opened-book-stockcake.jpg",
  },
  {
    name: "Thriller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSvQWDf9qL-bel1Y4mncZrMLvcvWFfpDC3Hl1fw56iPdzkk5YrfYEHqoI8Yo9O4akWeY&usqp=CAU",
  },
  {
    name: "Children's Books",
    image: "https://m.media-amazon.com/images/I/91nq3ycUeLL.jpg",
  },
  {
    name: "Poetry",
    image:
      "https://piv-prod.s3.ca-central-1.amazonaws.com/public/styles/focal_point_2000x800/public/2020-team-regionals-1400x500_0.jpg.webp?VersionId=ps7pcESVPE_cWG37HlHr9xn0gxcI9Hfu&itok=rwnsT1UV",
  },
  {
    name: "Adventure",
    image:
      "https://www.collegetransitions.com/wp-content/uploads/2024/04/Shutterstock_2050444811.jpg",
  },
  {
    name: "Drama",
    image:
      "https://prodimage.images-bn.com/pimages/9781496547125_p3_v3_s600x595.jpg",
  },
  {
    name: "Horror",
    image:
      "https://m.media-amazon.com/images/I/91tQgWThRxS._UF1000,1000_QL80_.jpg",
  },
  {
    name: "story",
    image: "https://m.media-amazon.com/images/I/81y4kJnEzbL._SL1500_.jpg",
  },
];

const CategorySlider = ({ filters, setFilters }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCategoriesLists = async () => {
    try {
      setLoading(true);
      const response = await categoryApis.getAllCategories();

      if (response?.success) {
        setCategoriesList(response?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategoriesLists();
  }, []);

  const handleRemoveCategory = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== categoryName),
    }));
  };

  const handleCategoryClick = (categoryName) => {
    if (filters?.categories?.includes(categoryName)) {
      handleRemoveCategory(categoryName);
      return;
    }

    setFilters((prev) => ({
      ...prev,
      categories: [...prev.categories, categoryName],
    }));
  };

  if (loading) {
    return <CategorySliderSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=""
    >
      <div className="container relative mx-auto">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          freeMode
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="!py-2 mt-5 rounded-2xl bg-cream/5"
        >
          {categoriesList.map((category) => {
            const isSelected = filters?.categories?.some(
              (cat) => cat === category.name,
            );

            const categoryImage = categories?.find(
              (cat) => cat.name === category.name,
            )?.image;

            return (
              <SwiperSlide key={category.name} className="!w-auto">
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`relative w-32 h-40 overflow-hidden cursor-pointer rounded-2xl group md:w-36 md:h-44 transition-all duration-300 ${isSelected
                    ? "border-[3px] border-tan shadow-[0_0_20px_rgba(210,180,140,0.5)]"
                    : "border-[3px] border-transparent"
                    }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-xl"
                      style={{
                        boxShadow: "inset 0 0 0 1px rgba(210,180,140,0.3)",
                        zIndex: 10,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-coffee/40 backdrop-blur-[1px] rounded-xl z-[1]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <AppImage
                    src={categoryImage || ""}
                    alt={category.name}
                    className="w-full h-full"
                    imgClassName={`object-cover transition-all duration-500 ${isSelected
                      ? "scale-110 brightness-75"
                      : "brightness-90 group-hover:brightness-75 group-hover:scale-105"
                      }`}
                    imgStyle={{
                      transform: isSelected
                        ? "translateZ(10px) scale(1.1)"
                        : "translateZ(0)",
                    }}
                    fallbackType="default"
                  />

                  <div
                    className={`absolute inset-0 flex items-end p-3 transition-all duration-300 z-10 ${isSelected
                      ? "bg-gradient-to-t from-black/95 via-black/40 to-transparent"
                      : "bg-gradient-to-t from-black/70 via-transparent to-transparent"
                      }`}
                  >
                    <div className="w-full">
                      <motion.span
                        className={`block text-sm font-medium ${isSelected
                          ? "text-tan font-bold tracking-wide"
                          : "text-tan"
                          } md:text-base`}
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {category.name}
                      </motion.span>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="block text-[10px] text-cream/90 uppercase tracking-widest mt-0.5"
                        >
                          Selected
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                      className="absolute top-3 right-3 z-20 flex items-center justify-center w-6 h-6 bg-tan rounded-full shadow-[0_0_10px_rgba(210,180,140,0.8)]"
                    >
                      <FaCheckCircle className="text-coffee w-5 h-5" />
                    </motion.div>
                  )}

                  {isSelected && (
                    <>
                      <motion.div
                        className="absolute w-3 h-3 border-t-2 border-l-2 border-tan top-2 left-2 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                      <motion.div
                        className="absolute w-3 h-3 border-b-2 border-l-2 border-tan bottom-2 left-2 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                      <motion.div
                        className="absolute w-3 h-3 border-b-2 border-r-2 border-tan bottom-2 right-2 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                    </>
                  )}
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default CategorySlider;
