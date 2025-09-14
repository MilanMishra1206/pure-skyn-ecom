import Slider from "react-slick";

function CustomCarousel({ slides }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bg-black bg-opacity-30 flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl md:text-4xl font-bold">
                {slide.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-lg mt-2">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomCarousel;
