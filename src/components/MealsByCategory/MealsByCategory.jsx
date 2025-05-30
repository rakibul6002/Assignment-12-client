import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

export default function MealsByCategory() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/meals");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Failed to fetch meals", err);
      }
    };
    fetchMeals();
  }, []);

  const getMealsByCategory = (category) => {
    if (category === "All") return meals.slice(0, 3);
    return meals.filter((meal) => meal.category === category).slice(0, 3);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">🍽️ Explore Our Delicious Meals</h2>

      <Tab.Group>
        <Tab.List className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "px-5 py-2 rounded-full font-medium focus:outline-none transition-all duration-300",
                  selected ? "bg-pink-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {categories.map((category) => (
            <Tab.Panel key={category} className="grid md:grid-cols-4 gap-8">
              {getMealsByCategory(category).map((meal) => (
                <div
                  key={meal._id}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{meal.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{meal.description.slice(0, 60)}...</p>
                    <p className="text-pink-600 font-semibold text-lg mb-2">৳{meal.price}</p>
                    <Link
                      to={`/meal/${meal._id}`}
                      className="inline-block mt-2 text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-sm transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* 💡 Why Choose Our Meals Section */}
      <section className="mt-20 text-center">
  <h3 className="text-3xl font-bold text-blue-700 mb-6">💖 Why Choose Our Meals?</h3>
  <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
    Discover the reasons why customers love our food service — from freshness to fast delivery, we serve satisfaction with every bite.
  </p>
  <div className="grid md:grid-cols-3 gap-8">
    {/* Feature Card 1 */}
    <div className="bg-gradient-to-br from-pink-100 via-white to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Fresh" className="h-14 w-14" />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Fresh & Healthy</h4>
      <p className="text-gray-600 text-sm">Handpicked ingredients cooked with love. Experience the freshness in every meal.</p>
    </div>

    {/* Feature Card 2 */}
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/2331/2331949.png" alt="Affordable" className="h-14 w-14" />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Affordable Prices</h4>
      <p className="text-gray-600 text-sm">Delicious meals starting at just ৳100. Quality food that doesn’t break the bank.</p>
    </div>

    {/* Feature Card 3 */}
    <div className="bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/1356/1356200.png" alt="Delivery" className="h-14 w-14" />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h4>
      <p className="text-gray-600 text-sm">Hot meals delivered quickly to your doorstep, always on time and packed with care.</p>
    </div>
  </div>
</section>

     <section className="mt-24 text-center">
  <h3 className="text-3xl font-bold text-blue-700 mb-4">🌟 What Our Customers Say</h3>
  <p className="text-gray-500 mb-12 max-w-xl mx-auto">
    Real stories from our happy customers across Bangladesh — their love keeps us cooking! 🍛
  </p>

  <div className="grid md:grid-cols-2 gap-10 px-4">
    {/* Testimonial 1 */}
    <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <img src="https://i.pravatar.cc/80?img=12" alt="Farhana" className="w-12 h-12 rounded-full border-2 border-pink-400" />
        <div className="text-left">
          <h5 className="font-semibold text-pink-600">Farhana</h5>
          <span className="text-xs text-gray-500">Dhaka</span>
        </div>
      </div>
      <p className="italic text-gray-700 mb-3 text-left">"The food is always fresh and tasty. My go-to place for lunch during work!"</p>
      <div className="flex justify-start text-yellow-400 text-lg">
        {"★★★★★"}
      </div>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <img src="https://i.pravatar.cc/80?img=17" alt="Nayeem" className="w-12 h-12 rounded-full border-2 border-blue-400" />
        <div className="text-left">
          <h5 className="font-semibold text-blue-600">Nayeem</h5>
          <span className="text-xs text-gray-500">Chittagong</span>
        </div>
      </div>
      <p className="italic text-gray-700 mb-3 text-left">"Love their breakfast options. Affordable and healthy!"</p>
      <div className="flex justify-start text-yellow-400 text-lg">
        {"★★★★☆"}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
