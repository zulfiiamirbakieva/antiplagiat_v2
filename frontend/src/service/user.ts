import api from "../utils/API";

const login = async (email: string, password: string) => {
  return api.post(`/auth/login`, { email, password });
};

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return api.post(`/auth/register`, { firstName, lastName, email, password });
};

const history = async () => {
  return api.get(`/user/history`, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("userData")
          ? JSON.parse(localStorage.getItem("userData")!).accessToken
          : ""
      }`,
    },
  });
};

export const userApi = {
  login,
  register,
  history,
};
