import StatsCard from "../components/StatsCard";
import SalesChart from "../components/SalesChart";

export default function DashboardPage() {
  return (
    <div>
      <div className="pb-4">
        <StatsCard />
      </div>
      <SalesChart />
    </div>
  );
}
