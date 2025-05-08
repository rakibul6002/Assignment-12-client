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
    fetch("https://your-api-url.com/meals") // Replace with your API
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  const getMealsByCategory = (category) => {
    if (category === "All") return meals.slice(0, 3);
    return meals.filter((meal) => meal.category === category).slice(0, 3);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
        🍴 Explore Meals by Category
      </h2>

      <Tab.Group>
        <Tab.List className="flex justify-center flex-wrap gap-3 p-4 bg-white shadow-md rounded-xl">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "px-5 py-2 text-sm font-semibold rounded-full focus:outline-none",
                  selected
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-10">
          {categories.map((category) => (
            <Tab.Panel key={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {getMealsByCategory(category).map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5"
                  >
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold text-indigo-700 mb-1">{meal.title}</h3>
                    <p className="text-yellow-500 mb-1">⭐ {meal.rating}</p>
                    <p className="text-green-600 font-bold mb-3">${meal.price}</p>
                    <Link
                      to={`/meal/${meal._id}`}
                      className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
