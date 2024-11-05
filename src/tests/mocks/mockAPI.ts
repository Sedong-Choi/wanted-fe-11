import { http, HttpResponse } from 'msw';
export const mockAPI = {
  get: (path: string, data: object) =>
    http.get(path, () => {
      return HttpResponse.json(data, { status: 200 });
    }),
  post: (path: string, data: object) =>
    http.post(path, () => {
      return HttpResponse.json(data, { status: 200 });
    }),
};
