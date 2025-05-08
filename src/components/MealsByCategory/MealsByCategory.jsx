import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MealsByCategory() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://your-api-url.com/meals") // Replace with your real API
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  const categories = ["All", "Breakfast", "Lunch", "Dinner"];

  const getMealsByCategory = (category) => {
    if (category === "All") return meals.slice(0, 3);
    return meals.filter((meal) => meal.category === category).slice(0, 3);
  };

  return (
    <div className="w-full max-w-screen-xl px-4 py-10 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Meals by Category</h2>
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-200 p-2 justify-center flex-wrap">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-auto px-5 py-2 text-sm font-medium leading-5 rounded-full",
                  selected
                    ? "bg-blue-600 text-white shadow"
                    : "text-blue-700 hover:bg-white hover:shadow"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8">
          {categories.map((category) => (
            <Tab.Panel key={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {getMealsByCategory(category).map((meal) => (
                  <div
                    key={meal._id}
                    className="border rounded-xl p-4 shadow-md hover:shadow-xl transition"
                  >
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{meal.title}</h3>
                    <p className="mb-2">Rating: ⭐ {meal.rating}</p>
                    <p className="mb-2 text-lg font-bold text-green-600">${meal.price}</p>
                    <Link
                      to={`/meal/${meal._id}`}
                      className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
