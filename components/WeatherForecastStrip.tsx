
import React from 'react';

const WeatherForecastStrip: React.FC = () => {
    // Mock data for the strip
    const forecast = [
        { day: 'MON', temp: 72, icon: '☀️' },
        { day: 'TUE', temp: 68, icon: '⛅' },
        { day: 'WED', temp: 65, icon: '🌦️' },
        { day: 'THU', temp: 70, icon: '🌤️' },
        { day: 'FRI', temp: 75, icon: '☀️' },
        { day: 'SAT', temp: 78, icon: '☀️' },
        { day: 'SUN', temp: 74, icon: '🌤️' },
    ];

    return (
        <div className="flex items-center bg-black/20 backdrop-blur-md border border-gray-800/50 rounded-full px-4 py-1.5 space-x-5 shadow-inner">
            {forecast.map((d, i) => (
                <div key={i} className="flex flex-col items-center group cursor-default">
                    <span className="text-[8px] text-gray-500 font-black tracking-tighter group-hover:text-[#ec028b] transition-colors">{d.day}</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs filter drop-shadow-sm">{d.icon}</span>
                        <span className="text-[10px] font-bold text-gray-300 group-hover:text-white transition-colors">{d.temp}°</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecastStrip;
