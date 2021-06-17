import api from "../utils/API";

const check = async (
  options: {
    lang: string;
    student_name: string;
    student_surname: string;
    student_group: string;
  },
  content: string,
  content2?: string
) => {
  return api.post(
    "check",
    {
      options: options,
      content: content,
      second_content: content2,
    },
    {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData")!).accessToken
            : ""
        }`,
      },
    }
  );
};

export const checkApi = {
  check,
};
