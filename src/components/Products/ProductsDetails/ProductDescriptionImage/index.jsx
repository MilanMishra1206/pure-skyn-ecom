import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ImageZoomModal = ({ imageUrl, productName, onClose }) => {
  if (!imageUrl) return null;
  return createPortal(
    <div
      className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 rounded-full p-3 hover:bg-opacity-100 transition text-2xl font-semibold z-10"
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt={`Zoomed view of ${productName}`}
          className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-xl"
        />
      </div>
    </div>,
    document.body
  );
};

function ProductDescriptionImage({ productDetail, defaultImage }) {
  const allImages = productDetail?.allImages;

  const [bigImage, setBigImage] = useState("");
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const primaryColor = "#0f4a51";

  useEffect(() => {
    if (defaultImage) {
      setBigImage(defaultImage);
    } else if (allImages && allImages.length > 0) {
      setBigImage(allImages[0]);
    }
  }, [defaultImage, allImages]);

  const handleImageClick = (clickedImage) => {
    setBigImage(clickedImage);
  };

  const handleBackClick = () => {
    if (!allImages || allImages.length === 0) return;
    const currentIndex = allImages.indexOf(bigImage);
    const newIndex =
      currentIndex <= 0 ? allImages.length - 1 : currentIndex - 1;
    setBigImage(allImages[newIndex]);
  };

  const handleForwardClick = () => {
    if (!allImages || allImages.length === 0) return;
    const currentIndex = allImages.indexOf(bigImage);
    const newIndex =
      currentIndex >= allImages.length - 1 ? 0 : currentIndex + 1;
    setBigImage(allImages[newIndex]);
  };

  const openZoomModal = () => setIsZoomModalOpen(true);
  const closeZoomModal = () => setIsZoomModalOpen(false);

  const renderSmallImages = () =>
    allImages?.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`${productDetail?.productName} - thumbnail ${index + 1}`}
        className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-md border cursor-pointer 
          ${
            bigImage === image
              ? `border-2 !border-[${primaryColor}]`
              : "hover:border-gray-300 border-gray-300"
          }`}
        onClick={() => handleImageClick(image)}
      />
    ));

  if (!allImages || allImages.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No images available for this product.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row gap-6">
        <div
          className="hidden md:!flex flex-col gap-4 py-3 items-center"
          style={{ width: "90px" }}
        >
          <div className="flex flex-col gap-4">{renderSmallImages()}</div>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="relative rounded-lg shadow-lg w-full max-w-lg">
            <img
              src={bigImage}
              alt={productDetail?.productName}
              className="rounded-lg w-full h-96 object-contain p-2"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handleBackClick}
                  className={`absolute left-2 top-1/2 transform cursor-pointer -translate-y-1/2 text-white bg-gray-800 hover:opacity-85 bg-opacity-50 p-2 text-xl hover:bg-opacity-80 rounded-full transition hover:ring-2`}
                  aria-label="Previous Image"
                >
                  &#8592;
                </button>
                <button
                  onClick={handleForwardClick}
                  className="absolute right-2 top-1/2 transform cursor-pointer -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:opacity-85 p-2 text-xl hover:bg-opacity-80 rounded-full transition"
                  aria-label="Next Image"
                >
                  &#8594;
                </button>
              </>
            )}
            <div
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={openZoomModal}
              aria-label="Zoom In"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-maximize"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="md:!hidden px-2 pt-4">
        <div className="grid grid-cols-4 gap-2 py-3 cursor-pointer">
          {renderSmallImages()}
        </div>
      </div>

      {isZoomModalOpen && (
        <ImageZoomModal
          imageUrl={bigImage}
          productName={productDetail?.productName}
          onClose={closeZoomModal}
        />
      )}
    </>
  );
}

export default ProductDescriptionImage;
