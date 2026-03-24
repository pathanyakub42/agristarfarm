import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inquiries');
  
  // Data States
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [tractors, setTractors] = useState<any[]>([]);
  const [tehsils, setTehsils] = useState<any[]>([]);

  // Form States
  const [newTehsil, setNewTehsil] = useState('');
  const [newVillage, setNewVillage] = useState({ tehsilId: '', name: '' });
  const [newTractor, setNewTractor] = useState({ name: '', model: '', description: '', price: '', image: '', stock: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: inqData } = await supabase.from('inquiries').select('*').order('id', { ascending: false });
    if (inqData) setInquiries(inqData);

    const { data: tracData } = await supabase.from('tractors').select('*');
    if (tracData) setTractors(tracData);

    const { data: tehData } = await supabase.from('tehsils').select('*');
    if (tehData) setTehsils(tehData);
  };

  // --- TEHSIL & VILLAGE FUNCTIONS ---
  const handleAddTehsil = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTehsil) return;
    await supabase.from('tehsils').insert([{ name: newTehsil, villages: [] }]);
    setNewTehsil('');
    fetchData();
  };

  const handleDeleteTehsil = async (id: string) => {
    await supabase.from('tehsils').delete().eq('id', id);
    fetchData();
  };

  const handleAddVillage = async (e: React.FormEvent, tehsil: any) => {
    e.preventDefault();
    if (!newVillage.name) return;
    const updatedVillages = [...(tehsil.villages || []), newVillage.name];
    await supabase.from('tehsils').update({ villages: updatedVillages }).eq('id', tehsil.id);
    setNewVillage({ tehsilId: '', name: '' });
    fetchData();
  };

  const handleDeleteVillage = async (tehsil: any, villageName: string) => {
    const updatedVillages = tehsil.villages.filter((v: string) => v !== villageName);
    await supabase.from('tehsils').update({ villages: updatedVillages }).eq('id', tehsil.id);
    fetchData();
  };

  // --- TRACTOR FUNCTIONS ---
  const handleAddTractor = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('tractors').insert([{
      name: newTractor.name,
      model: newTractor.model,
      description: newTractor.description,
      price: Number(newTractor.price),
      stock: Number(newTractor.stock),
      image: newTractor.image
    }]);
    setNewTractor({ name: '', model: '', description: '', price: '', image: '', stock: '' });
    fetchData();
  };

  const handleDeleteTractor = async (id: string) => {
    await supabase.from('tractors').delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Admin Control Panel</h1>
      
      {/* TABS */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab('inquiries')} className={`px-4 py-2 rounded font-bold ${activeTab === 'inquiries' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Inquiries</button>
        <button onClick={() => setActiveTab('tractors')} className={`px-4 py-2 rounded font-bold ${activeTab === 'tractors' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Manage Tractors</button>
        <button onClick={() => setActiveTab('tehsils')} className={`px-4 py-2 rounded font-bold ${activeTab === 'tehsils' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Manage Tehsils & Villages</button>
      </div>

      {/* INQUIRIES TAB */}
      {activeTab === 'inquiries' && (
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-4">Customer Inquiries</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Tehsil/Village</th>
                  <th className="p-2 border">Tractor</th>
                  <th className="p-2 border">Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2 border">{inq.date}</td>
                    <td className="p-2 border font-bold">{inq.name}</td>
                    <td className="p-2 border text-blue-600"><a href={`tel:${inq.phone}`}>{inq.phone}</a></td>
                    <td className="p-2 border">{inq.tehsil}, {inq.village}</td>
                    <td className="p-2 border">{inq.interestedTractor || 'N/A'}</td>
                    <td className="p-2 border text-sm">{inq.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TRACTORS TAB */}
      {activeTab === 'tractors' && (
        <div className="space-y-6">
          <form onSubmit={handleAddTractor} className="bg-white p-4 shadow rounded grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="text-xl font-bold md:col-span-2">Add New Tractor</h2>
            <input required placeholder="Tractor Name (e.g. Mahindra)" className="border p-2 rounded" value={newTractor.name} onChange={e => setNewTractor({...newTractor, name: e.target.value})} />
            <input required placeholder="Model (e.g. 575 DI)" className="border p-2 rounded" value={newTractor.model} onChange={e => setNewTractor({...newTractor, model: e.target.value})} />
            <input required type="number" placeholder="Price (₹)" className="border p-2 rounded" value={newTractor.price} onChange={e => setNewTractor({...newTractor, price: e.target.value})} />
            <input required type="number" placeholder="Stock Quantity" className="border p-2 rounded" value={newTractor.stock} onChange={e => setNewTractor({...newTractor, stock: e.target.value})} />
            <input required placeholder="Image Name (e.g. tractor1.jpg)" className="border p-2 rounded md:col-span-2" value={newTractor.image} onChange={e => setNewTractor({...newTractor, image: e.target.value})} />
            <textarea placeholder="Description" className="border p-2 rounded md:col-span-2" value={newTractor.description} onChange={e => setNewTractor({...newTractor, description: e.target.value})}></textarea>
            <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded md:col-span-2">Add Tractor</button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tractors.map(t => (
              <div key={t.id} className="bg-white p-4 shadow rounded border relative">
                <button onClick={() => handleDeleteTractor(t.id)} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                <h3 className="font-bold text-lg">{t.name} {t.model}</h3>
                <p className="text-sm text-gray-600">Price: ₹{t.price}</p>
                <p className="text-sm text-gray-600">Stock: {t.stock}</p>
                <p className="text-xs text-gray-500 mt-2">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEHSILS & VILLAGES TAB */}
      {activeTab === 'tehsils' && (
        <div className="space-y-6">
          <form onSubmit={handleAddTehsil} className="bg-white p-4 shadow rounded flex gap-2">
            <input required placeholder="Enter New Tehsil Name" className="border p-2 rounded flex-1" value={newTehsil} onChange={e => setNewTehsil(e.target.value)} />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold">Add Tehsil</button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tehsils.map(t => (
              <div key={t.id} className="bg-white p-4 shadow rounded border">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="font-bold text-xl text-blue-800">{t.name}</h3>
                  <button onClick={() => handleDeleteTehsil(t.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete Tehsil</button>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {t.villages && t.villages.map((v: string, idx: number) => (
                      <span key={idx} className="bg-gray-100 border px-2 py-1 rounded text-sm flex items-center gap-2">
                        {v} <button onClick={() => handleDeleteVillage(t, v)} className="text-red-500 font-bold hover:text-red-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <form onSubmit={(e) => handleAddVillage(e, t)} className="flex gap-2">
                  <input required placeholder="Add Village..." className="border p-1 rounded flex-1 text-sm" value={newVillage.tehsilId === t.id ? newVillage.name : ''} onChange={e => setNewVillage({ tehsilId: t.id, name: e.target.value })} />
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => setNewVillage({ ...newVillage, tehsilId: t.id })}>Add</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
