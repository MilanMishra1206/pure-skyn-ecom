import { MdDeleteForever } from "react-icons/md";

function HandleQuantity({
  item,
  handleItemDecrease,
  handleItemIncrease,
  handleItemRemove,
  isNotCartDrawer = false,
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-stretch text-gray-600 ${
          isNotCartDrawer ? "w-full h-12" : "h-8"
        }`}
      >
        <button
          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 py-2 transition cursor-pointer hover:bg-gray-300 hover:!text-gray-800 disabled:!cursor-not-allowed disabled:!bg-gray-200 disabled:!text-gray-600"
          disabled={item.quantity === 1}
          onClick={() => handleItemDecrease(item)}
        >
          -
        </button>
        <div className="flex w-full items-center justify-center bg-gray-100 px-4 py-2 text-xs uppercase transition">
          {item.quantity}
        </div>
        <button
          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 py-2 transition hover:bg-gray-300 hover:!text-gray-800 cursor-pointer disabled:!cursor-not-allowed disabled:!bg-gray-200 disabled:!text-gray-600"
          onClick={() => handleItemIncrease(item)}
        >
          +
        </button>
      </div>
      <MdDeleteForever
        size="1.5rem"
        className="text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-red-600 cursor-pointer"
        onClick={() => handleItemRemove(item.id)}
      />
    </div>
  );
}

export default HandleQuantity;
