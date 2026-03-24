import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="bg-blue-800 text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Aapka Apna Tractor Showroom</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">
          Kheti ko banayein aasan, naye aur majboot tractors ke saath. Best price aur asaan finance suvidha uplabdh hai.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/tractors" className="bg-white text-blue-800 font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition text-lg">
            Tractors Dekhein
          </Link>
          <Link to="/inquiry" className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-green-600 transition text-lg">
            Inquiry Karein
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Best Prices</h3>
          <p className="text-gray-600">Market mein sabse behtareen daam aur asaan EMI options humare paas milenge.</p>
        </div>
        
        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <div className="text-4xl mb-4">🚜</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Top Brands</h3>
          <p className="text-gray-600">Sabhi top companies ke tractors aur unke models ka full stock available hai.</p>
        </div>
        
        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
          <div className="text-4xl mb-4">🛠️</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Great Support</h3>
          <p className="text-gray-600">After-sales service, free servicing aur original spare parts ki full guarantee.</p>
        </div>
      </div>
    </div>
  );
}
