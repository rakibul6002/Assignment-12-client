import bannerImage from "../../assets/Baner.png";

export default function Banner() {
  return (
    <div
      className="bg-cover bg-center h-[600px] md:h-[650px] lg:h-[800px] flex items-center justify-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="bg-black bg-opacity-60 text-white rounded-xl px-6 py-10 max-w-3xl w-full mx-4 text-center backdrop-blur-sm">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4">
          Welcome to Our NUB HOSTEL
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 font-light">
          Manage your meals, reviews, and hostel life in one place — smart, smooth, and secure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search meals..."
            className="w-full sm:w-2/3 px-4 py-3 rounded-full text-black focus:outline-none"
          />
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
