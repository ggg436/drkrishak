import React, { useState } from 'react';
import { Calculator, Car, Plane, Home, Utensils, TrendingDown, Award } from 'lucide-react';

const CarbonCalculator = () => {
  const [transport, setTransport] = useState({ car: 0, flight: 0, publicTransport: 0 });
  const [energy, setEnergy] = useState({ electricity: 0, gas: 0, heating: 0 });
  const [lifestyle, setLifestyle] = useState({ diet: 'mixed', shopping: 'moderate' });
  const [results, setResults] = useState(null);

  const calculateFootprint = () => {
    // Simplified calculation (in real app, use more sophisticated formulas)
    const transportEmissions = (transport.car * 0.21) + (transport.flight * 0.25) + (transport.publicTransport * 0.05);
    const energyEmissions = (energy.electricity * 0.4) + (energy.gas * 2.3) + (energy.heating * 2.1);
    
    let dietMultiplier = 1;
    if (lifestyle.diet === 'vegetarian') dietMultiplier = 0.7;
    if (lifestyle.diet === 'vegan') dietMultiplier = 0.5;
    if (lifestyle.diet === 'meat-heavy') dietMultiplier = 1.3;
    
    let shoppingMultiplier = 1;
    if (lifestyle.shopping === 'minimal') shoppingMultiplier = 0.6;
    if (lifestyle.shopping === 'heavy') shoppingMultiplier = 1.4;
    
    const baseLifestyle = 2.5;
    const lifestyleEmissions = baseLifestyle * dietMultiplier * shoppingMultiplier;
    
    const totalAnnual = (transportEmissions + energyEmissions + lifestyleEmissions) * 12;
    const globalAverage = 4.8;
    const comparison = ((totalAnnual - globalAverage) / globalAverage) * 100;
    
    setResults({
      total: totalAnnual,
      transport: transportEmissions * 12,
      energy: energyEmissions * 12,
      lifestyle: lifestyleEmissions * 12,
      comparison: comparison
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <Calculator className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Carbon Footprint Calculator</h1>
            <p className="text-gray-600">Calculate your environmental impact and get personalized reduction tips</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calculator Form */}
        <div className="space-y-6">
          {/* Transportation */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Transportation</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car miles per month
                </label>
                <input
                  type="number"
                  value={transport.car}
                  onChange={(e) => setTransport({...transport, car: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight miles per month
                </label>
                <input
                  type="number"
                  value={transport.flight}
                  onChange={(e) => setTransport({...transport, flight: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Public transport miles per month
                </label>
                <input
                  type="number"
                  value={transport.publicTransport}
                  onChange={(e) => setTransport({...transport, publicTransport: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 100"
                />
              </div>
            </div>
          </div>

          {/* Energy */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Home Energy</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly electricity bill ($)
                </label>
                <input
                  type="number"
                  value={energy.electricity}
                  onChange={(e) => setEnergy({...energy, electricity: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly gas bill ($)
                </label>
                <input
                  type="number"
                  value={energy.gas}
                  onChange={(e) => setEnergy({...energy, gas: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 80"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Lifestyle</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet type
                </label>
                <select
                  value={lifestyle.diet}
                  onChange={(e) => setLifestyle({...lifestyle, diet: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="mixed">Mixed diet</option>
                  <option value="meat-heavy">Meat-heavy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shopping habits
                </label>
                <select
                  value={lifestyle.shopping}
                  onChange={(e) => setLifestyle({...lifestyle, shopping: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="minimal">Minimal consumer</option>
                  <option value="moderate">Moderate consumer</option>
                  <option value="heavy">Heavy consumer</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateFootprint}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Calculate My Carbon Footprint
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* Total Footprint */}
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Annual Carbon Footprint</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {results.total.toFixed(1)} <span className="text-lg text-gray-600">tons CO₂</span>
                  </div>
                  <div className={`text-sm font-medium ${results.comparison > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {results.comparison > 0 ? '+' : ''}{results.comparison.toFixed(1)}% vs global average
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Breakdown by Category</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">Transportation</span>
                    </div>
                    <span className="font-semibold">{results.transport.toFixed(1)} tons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">Home Energy</span>
                    </div>
                    <span className="font-semibold">{results.energy.toFixed(1)} tons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Lifestyle</span>
                    </div>
                    <span className="font-semibold">{results.lifestyle.toFixed(1)} tons</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Reduction Tips</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">🚗 Switch to electric or hybrid vehicle</p>
                    <p className="text-xs text-green-600">Could save up to 2.3 tons CO₂ annually</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">🏠 Install solar panels</p>
                    <p className="text-xs text-blue-600">Could save up to 1.8 tons CO₂ annually</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800 font-medium">🥗 Reduce meat consumption</p>
                    <p className="text-xs text-purple-600">Could save up to 0.8 tons CO₂ annually</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Calculate Your Impact</h3>
                <p className="text-gray-500">Fill out the form to see your carbon footprint and get personalized recommendations</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;