import { httpRequest } from './httpClient';

export const userClient = {
  async updateProfile(username: string): Promise<void> {
    await httpRequest('/api/v1/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ username }),
    });
  },
};
