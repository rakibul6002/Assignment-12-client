import Baner from "../../components/Baner/Baner";
import MealsByCategory from "../../components/MealsByCategory/MealsByCategory";
import MembershipSection from "../../components/MembershipSection/MembershipSection";

export default function Home() {
  return (
    <div >
      <Baner/>
      <MealsByCategory/>
      <MembershipSection/>
    </div>
  )
}
