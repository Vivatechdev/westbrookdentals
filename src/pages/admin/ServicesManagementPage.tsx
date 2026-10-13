import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Clock, 
  Image as ImageIcon 
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { DentalService, ServiceCategory } from '../../types';

export const ServicesManagementPage: React.FC = () => {
  const [services, setServices] = useState<DentalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<DentalService | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const data = await dataService.getServices();
    setServices(data);
    setLoading(false);
  };

  const handleToggleActive = async (service: DentalService) => {
    const updated = { ...service, isActive: !service.isActive };
    await dataService.saveService(updated);
    await loadServices();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this dental treatment?')) {
      await dataService.deleteService(id);
      await loadServices();
    }
  };

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingService({
      id: `srv-${Date.now()}`,
      name: '',
      category: 'General & Preventive',
      shortDescription: '',
      fullDescription: '',
      durationMinutes: 30,
      startingPrice: 70,
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      isPopular: false,
      isActive: true,
      benefits: ['Gentle clinical examination', 'Preventative diagnosis']
    });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.name.trim()) return;

    await dataService.saveService(editingService);
    setEditingService(null);
    setIsNew(false);
    await loadServices();
  };

  const categories: ServiceCategory[] = [
    'General & Preventive',
    'Restorative',
    'Cosmetic',
    'Orthodontics',
    'Pediatric',
    'Emergency'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#15324B]">
            Dental Services Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7488]">
            Configure treatment catalog, duration times, pricing guide, and clinical descriptions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#087F70] hover:bg-[#066559] transition-all shadow-xs text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F5F7FA] text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Guide Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={srv.imageUrl}
                        alt={srv.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#15324B]">{srv.name}</p>
                        {srv.isPopular && (
                          <span className="text-[10px] text-[#087F70] font-bold">Featured / Popular</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#F5F7FA] text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {srv.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5f7488]">
                    ~{srv.durationMinutes} mins
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#15324B]">
                    From ${srv.startingPrice}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(srv)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                        srv.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {srv.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsNew(false);
                        setEditingService(srv);
                      }}
                      className="p-1.5 text-slate-600 hover:text-[#087F70] rounded-lg hover:bg-slate-100"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(srv.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-[#15324B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-bold text-[#15324B]">
                {isNew ? 'Create New Dental Treatment' : 'Edit Dental Treatment'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  placeholder="e.g. Ultrasonic Hygiene & Airflow Polishing"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as ServiceCategory })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    min={10}
                    step={5}
                    value={editingService.durationMinutes}
                    onChange={(e) => setEditingService({ ...editingService, durationMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#15324B] mb-1">Guide Price ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={5}
                    value={editingService.startingPrice}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-1">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-1">Full Clinical Description (Modal & Details)</label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#15324B] mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingService.imageUrl}
                  onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.isPopular}
                    onChange={(e) => setEditingService({ ...editingService, isPopular: e.target.checked })}
                    className="w-4 h-4 text-[#087F70] rounded border-slate-300"
                  />
                  <span className="text-xs font-semibold text-[#15324B]">Highlight as Featured Service</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.isActive}
                    onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#087F70] rounded border-slate-300"
                  />
                  <span className="text-xs font-semibold text-[#15324B]">Service is Active & Bookable</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#087F70] hover:bg-[#066559]"
                >
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
