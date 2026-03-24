import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Inquiry() {
  const [tehsils, setTehsils] = useState<any[]>([]);
  const [villages, setVillages] = useState<string[]>([]);
  const [tractors, setTractors] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tehsil: '',
    village: '',
    interestedTractor: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // Jab page khule toh database se Tehsils aur Tractors uthao
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Tehsils laao
    const { data: tehsilData } = await supabase.from('tehsils').select('*');
    if (tehsilData) setTehsils(tehsilData);

    // Tractors laao dropdown ke liye
    const { data: tractorData } = await supabase.from('tractors').select('name, model');
    if (tractorData) setTractors(tractorData);
  };

  // Jab customer tehsil select kare, toh uske gaav (villages) dropdown mein dikhao
  const handleTehsilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedT = e.target.value;
    setFormData({ ...formData, tehsil: selectedT, village: '' }); // Gaav reset karo
    
    const foundTehsil = tehsils.find(t => t.name === selectedT);
    if (foundTehsil && foundTehsil.villages) {
      setVillages(foundTehsil.villages);
    } else {
      setVillages([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          tehsil: formData.tehsil,
          village: formData.village,
          interestedTractor: formData.interestedTractor,
          message: formData.message,
          date: new Date().toLocaleDateString('en-IN')
        }
      ]);

    setLoading(false);

    if (error) {
      alert("Error sending inquiry: " + error.message);
    } else {
      alert("Inquiry successfully sent! Hum jaldi aapse contact karenge.");
      setFormData({ name: '', phone: '', tehsil: '', village: '', interestedTractor: '', message: '' });
      setVillages([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Tractor Inquiry Form</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Pura Naam</label>
          <input required type="text" className="w-full border border-gray-300 p-2 rounded" 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
          <input required type="tel" className="w-full border border-gray-300 p-2 rounded" 
            value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tehsil</label>
            <select required className="w-full border border-gray-300 p-2 rounded"
              value={formData.tehsil} onChange={handleTehsilChange}>
              <option value="">Select Tehsil</option>
              {tehsils.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Gaav (Village)</label>
            <select required className="w-full border border-gray-300 p-2 rounded"
              value={formData.village} onChange={(e) => setFormData({...formData, village: e.target.value})}
              disabled={!formData.tehsil}>
              <option value="">Select Village</option>
              {villages.map((v, i) => (
                <option key={i} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Kaunsa Tractor Lena Hai?</label>
          <select className="w-full border border-gray-300 p-2 rounded"
            value={formData.interestedTractor} onChange={(e) => setFormData({...formData, interestedTractor: e.target.value})}>
            <option value="">Select Tractor (Optional)</option>
            {tractors.map((t, i) => (
              <option key={i} value={`${t.name} ${t.model}`}>{t.name} {t.model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Koi aur Message?</label>
          <textarea className="w-full border border-gray-300 p-2 rounded h-24"
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
        </div>

        <button type="submit" disabled={loading} 
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition">
          {loading ? 'Sending...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
