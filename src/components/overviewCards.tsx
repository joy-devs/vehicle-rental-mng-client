import React from 'react';

const OverviewCards: React.FC = () =>{
  const cards = [
    { title: 'Total car owner', value: 23, today: 4, month: 4, color: 'bg-red-500', icon: 'directions_car' },
    { title: 'Total passengers', value: 71, today: 8, month: 4, color: 'bg-purple-500', icon: 'groups' },
    { title: 'Total car list', value: 60, today: 4, year: 60, color: 'bg-red-500', icon: 'list' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`p-4 ${card.color} text-white rounded-lg`}>
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg">{card.title}</div>
            <span className="material-icons">{card.icon}</span>
          </div>
          <div className="text-3xl font-bold">{card.value}</div>
          <div className="text-sm">Today - {card.today} This month - {card.month}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
