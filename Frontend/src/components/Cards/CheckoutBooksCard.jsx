import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import QuantitySelector from "../QuantitySelector";
import AppImage from "../Common/AppImage";

const CheckoutBooksCard = ({ items, updateQuantity, removeItem }) => {
  return items?.map((item, index) => (
    <motion.li
      key={item?.id}
      initial={{ y: 15, opacity: 0, scale: 0.27 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.15 },
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        y: -5,
      }}
      className="flex p-3 border h-fit bg-black/10 rounded-2xl border-sepia"
    >
      <div className="flex-shrink-0 w-24 h-24 p-1 overflow-hidden border shadow-inner border-sepia rounded-2xl">
        <AppImage
          src={item?.image}
          alt={item?.name}
          className="object-contain object-center w-full h-full"
          fallbackType="book"
        />
      </div>

      <div className="relative flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <div className="flex flex-col">
              <h3 className="text-cream">{item?.name}</h3>
              <p className="text-[12px] leading-4 text-cream/70">
                A journey through space and time. This special edition
                includes...
              </p>
            </div>
            <p className="ml-4 text-cream">${item?.price?.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-3">
          <QuantitySelector
            initialQuantity={item?.quantity}
            onChange={(quantity) => updateQuantity(item?.id, quantity)}
          />
        </div>

        <div className="absolute bottom-0 right-0 ">
          <button
            onClick={() => removeItem(item?.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </motion.li>
  ));
};

export default CheckoutBooksCard;
