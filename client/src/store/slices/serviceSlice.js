import httpClient from '../../plugins/interceptor';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils';

export const createServiceSlice = (set, get) => ({
  // State Definitions
  availableServices: [], 
  serviceCount: 0,       
  nextPageUrl: null,
  prevPageUrl: null,
  serviceLoading: false,
  serviceError: null,

  // 1. READ: Fetch Services (Supports DRF pagination URLs)
  fetchAvailableServices: async (urlOrPath = '/services') => {
    set({ serviceLoading: true, serviceError: null });
    try {
      // If a full URL is passed (like from res.data.next), extract just the path/query parameters
      const requestPath = urlOrPath.includes('http') 
        ? urlOrPath.split('/api')[1] 
        : urlOrPath;

      const res = await httpClient.get(requestPath);
      
      set({ 
        availableServices: res.data.results, 
        serviceCount: res.data.count,
        nextPageUrl: res.data.next,
        prevPageUrl: res.data.previous,
        serviceLoading: false 
      });
    } catch (err) {
      console.error('Fetch services error:', err);
      set({ serviceError: err.response?.data?.detail || 'Failed to fetch services catalog', serviceLoading: false });
    }
  },

  // 2. CREATE: Add New Service Platform Catalog Profile
  addService: async (newServiceData) => {
    set({ serviceLoading: true, serviceError: null });
    try {
      // Example payload: { name: "Netflix", logo_url: "...", description: "..." }
      const res = await httpClient.post('/services', newServiceData);
      
      set({
        availableServices: [res.data, ...get().availableServices],
        serviceCount: get().serviceCount + 1,
        serviceLoading: false
      });
      
      toast.success('Service successfully cataloged!', toastOptions);
      return res.data;
    } catch (err) {
      console.error('Create service error:', err);
      const msg = err.response?.data?.detail || 'Failed to create service entry';
      set({ serviceError: msg, serviceLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },

  // 3. UPDATE: Modify service metadata details
  updateService: async (id, updatedData) => {
    set({ serviceLoading: true, serviceError: null });
    try {
      const res = await httpClient.put(`/services/${id}/`, updatedData);
      
      // Map across local array cache to update the matching row instantly
      const updatedList = get().availableServices.map((service) =>
        service.id === id ? res.data : service
      );

      set({ availableServices: updatedList, serviceLoading: false });
      toast.success('Service configuration updated!', toastOptions);
      return res.data;
    } catch (err) {
      console.error('Update service error:', err);
      const msg = err.response?.data?.detail || 'Failed to update service details';
      set({ serviceError: msg, serviceLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },

  // 4. DELETE: Purge catalog entry reference row entirely
  deleteService: async (id) => {
    set({ serviceLoading: true, serviceError: null });
    try {
      await httpClient.delete(`/services/${id}/`);
      
      const filteredList = get().availableServices.filter((service) => service.id !== id);

      set({
        availableServices: filteredList,
        serviceCount: Math.max(0, get().serviceCount - 1),
        serviceLoading: false
      });
      
      toast.success('Service dropped from database registries.', toastOptions);
    } catch (err) {
      console.error('Delete service error:', err);
      const msg = err.response?.data?.detail || 'Failed to delete custom catalog row';
      set({ serviceError: msg, serviceLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  }
});