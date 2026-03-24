import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

export default function Tractors() {
  const [tractors, setTractors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTractors();
  }, []);

  const fetchTractors = async () => {
    const { data } = await supabase.from('tractors').select('*');
    if (data) setTractors(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-20 text-xl font-bold text-gray-600">Loading Tractors...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Humare Tractors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tractors.map((t) => (
          <div key={t.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
            
            {/* TRACTOR IMAGE */}
            <div className="h-64 bg-gray-100 overflow-hidden flex justify-center items-center">
              <img 
                src={`/images/${t.image}`} 
                alt={t.name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image+Found' }}
              />
            </div>
            
            {/* TRACTOR DETAILS */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.name} {t.model}</h2>
              <p className="text-gray-600 mb-4 h-12 overflow-hidden">{t.description}</p>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold text-green-600">₹{t.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-bold ${t.stock > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                    {t.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
              
              <Link to="/inquiry" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition">
                Inquire Now
              </Link>
            </div>
          </div>
        ))}
        
        {/* AGAR KOI TRACTOR NAHI HAI */}
        {tractors.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500 text-lg">
            Abhi koi tractor add nahi kiya gaya hai. Admin panel se tractors add karein.
          </div>
        )}
      </div>
    </div>
  );
}
