import api from '../config/api';

export const personService = {
  async getRecommendedPeople(page = 1, perPage = 10) {
    const response = await api.get('/people', {
      params: { page, per_page: perPage },
    });
    return response.data;
  },

  async likePerson(personId) {
    const response = await api.post(`/people/${personId}/like`);
    return response.data;
  },

  async dislikePerson(personId) {
    const response = await api.post(`/people/${personId}/dislike`);
    return response.data;
  },

  async getLikedPeople(page = 1, perPage = 10) {
    const response = await api.get('/people/liked', {
      params: { page, per_page: perPage },
    });
    return response.data;
  },
};

