import CustomCarousel from "../../shared/CustomCarousel";

const sliderData = [
  {
    title: "Slide 1",
    description: "This is the first slide",
    image: "https://picsum.photos/1600/600?random=1",
  },
  {
    title: "Slide 2",
    description: "This is the second slide",
    image: "https://picsum.photos/1600/600?random=2",
  },
  {
    title: "Slide 3",
    description: "This is the third slide",
    image: "https://picsum.photos/1600/600?random=3",
  },
];

function Dashboard() {
  return (
    <div>
      <CustomCarousel slides={sliderData} />
    </div>
  );
}

export default Dashboard;
