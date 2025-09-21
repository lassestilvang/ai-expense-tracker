import MonthlyInsights from '@/app/components/MonthlyInsights';

const InsightsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monthly Insights</h1>
      <MonthlyInsights />
    </div>
  );
};

export default InsightsPage;