// src/store/subjectSlice.js
import axios from 'axios';

const API_BASE = '/api/subjects';

export const createSubjectSlice = (set, get) => ({
  subjects: [],
  currentSubject: null,
  loading: false,
  error: null,

  // ==========================================
  // SUBJECTS CRUD
  // ==========================================

  fetchSubjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(API_BASE);
      set({ subjects: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchSubjectById: async (subjectId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_BASE}/${subjectId}`);
      set({ currentSubject: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  createSubject: async (subjectData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(API_BASE, subjectData);
      set((state) => ({
        subjects: [...state.subjects, data],
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  updateSubject: async (subjectId, updateData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_BASE}/${subjectId}`, updateData);
      set((state) => ({
        subjects: state.subjects.map((sub) => (sub._id === subjectId ? data : sub)),
        currentSubject: state.currentSubject?._id === subjectId ? data : state.currentSubject,
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  deleteSubject: async (subjectId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_BASE}/${subjectId}`);
      set((state) => ({
        subjects: state.subjects.filter((sub) => sub._id !== subjectId),
        currentSubject: state.currentSubject?._id === subjectId ? null : state.currentSubject,
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  // ==========================================
  // TOPICS CRUD (Nested inside Subject)
  // ==========================================

  createTopic: async (subjectId, topicData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_BASE}/${subjectId}/topics`, topicData);
      set((state) => {
        const updateSub = (sub) => {
          if (sub._id !== subjectId) return sub;
          return { ...sub, topics: [...(sub.topics || []), data] };
        };

        return {
          subjects: state.subjects.map(updateSub),
          currentSubject: state.currentSubject?._id === subjectId ? updateSub(state.currentSubject) : state.currentSubject,
          loading: false,
        };
      });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  updateTopic: async (subjectId, topicId, updateData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_BASE}/${subjectId}/topics/${topicId}`, updateData);
      set((state) => {
        const updateSub = (sub) => {
          if (sub._id !== subjectId) return sub;
          return {
            ...sub,
            topics: sub.topics.map((top) => (top._id === topicId ? data : top)),
          };
        };

        return {
          subjects: state.subjects.map(updateSub),
          currentSubject: state.currentSubject?._id === subjectId ? updateSub(state.currentSubject) : state.currentSubject,
          loading: false,
        };
      });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  deleteTopic: async (subjectId, topicId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_BASE}/${subjectId}/topics/${topicId}`);
      set((state) => {
        const updateSub = (sub) => {
          if (sub._id !== subjectId) return sub;
          return {
            ...sub,
            topics: sub.topics.filter((top) => top._id !== topicId),
          };
        };

        return {
          subjects: state.subjects.map(updateSub),
          currentSubject: state.currentSubject?._id === subjectId ? updateSub(state.currentSubject) : state.currentSubject,
          loading: false,
        };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  // ==========================================
  // NOTES CRUD (Nested inside Topic)
  // ==========================================

  createNote: async (subjectId, topicId, noteData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_BASE}/${subjectId}/topics/${topicId}/notes`,
        noteData
      );

      set((state) => {
        const updateSub = (sub) => {
          if (sub._id !== subjectId) return sub;
          return {
            ...sub,
            topics: sub.topics.map((top) => {
              if (top._id !== topicId) return top;
              return { ...top, notes: [...(top.notes || []), data] };
            }),
          };
        };

        return {
          subjects: state.subjects.map(updateSub),
          currentSubject: state.currentSubject?._id === subjectId ? updateSub(state.currentSubject) : state.currentSubject,
          loading: false,
        };
      });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  updateNote: async (subjectId, topicId, noteId, updateData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(
        `${API_BASE}/${subjectId}/topics/${topicId}/notes/${noteId}`,
        updateData
      );

      set((state) => {
        const updateSub = (sub) => {
          if (sub._id !== subjectId) return sub;
          return {
            ...sub,
            topics: sub.topics.map((top) => {
              if (top._id !== topicId) return top;
              return {
                ...top,
                notes: top.notes.map((note) => (note._id === noteId ? data : note)),
              };
            }),
          };
        };

        return {
          subjects: state.subjects.map(updateSub),
          currentSubject: state.currentSubject?._id === subjectId ? updateSub(state.currentSubject) : state.currentSubject,
          loading: false,
        };
      });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  deleteNote: async (subjectId, topicId, noteId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(
        `${API_BASE}/${subjectId}/topics/${topicId}/notes/${noteId}`
      );

      set((state) => {
        const updateSub = (sub) => {
          if (sub._id !== subjectId) return sub;
          return {
            ...sub,
            topics: sub.topics.map((top) => {
              if (top._id !== topicId) return top;
              return {
                ...top,
                notes: top.notes.filter((note) => note._id !== noteId),
              };
            }),
          };
        };

        return {
          subjects: state.subjects.map(updateSub),
          currentSubject: state.currentSubject?._id === subjectId ? updateSub(state.currentSubject) : state.currentSubject,
          loading: false,
        };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
});