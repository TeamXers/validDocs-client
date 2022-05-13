import axios from "axios";

export const validDocsApi = axios.create({
  baseURL: process.env.REACT_APP_VALID_DOCS_API,
});

validDocsApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Extract the response result
    const data = response.data.data;
    if (data?.results) return data.results;
    return data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const routes = {
  account: "/accounts",
  docs: "/docs",
  viewers: "/docs/viewers",
  search: "/search",
  pinata: "/pinata",
  invitations: "/invites",
};

export const GET_ACCOUNT = (query: any) => {
  return validDocsApi.get(routes.account, { params: query.queryKey[1] });
};

export const SET_USERNAME = async (data: {
  username: string;
  address: string;
}) => {
  const { username, address } = data;

  const accounts: any = await validDocsApi.get(routes.account, {
    params: { address },
  });

  if (accounts.length > 0) {
    // We only need to update the username
    return validDocsApi.patch(
      routes.account,
      { username },
      { params: { address } }
    );
  }
  return validDocsApi.post(routes.account, data);
};

export const GET_DOCUMENTS = (query: any) => {
  return validDocsApi.get(routes.docs, {
    params: query.queryKey[1],
  });
};

export const GET_DOCUMENT = (query: any) => {
  return validDocsApi.get(routes.docs, {
    params: { tokenId: query.queryKey[1] },
  });
};

export const POST_DOC_FILE = async (data: any) => {
  return validDocsApi.post(
    routes.pinata,
    Object.keys(data).reduce((formData, cur) => {
      formData.append(cur, data[cur]);
      return formData;
    }, new FormData())
  );
};

export const POST_DOCUMENT = async (data: any) => {
  return validDocsApi.post(routes.docs, data);
};

export const PATCH_DOCUMENT = async (data: any) => {
  return validDocsApi.patch(routes.docs, data.update, { params: data.params });
};

export const GET_VIEWERS = async (query: any) => {
  return validDocsApi.get(routes.viewers, { params: query.queryKey[1] });
};

export const GET_VIEW_INVITE = async ({ queryKey }: any) => {
  return validDocsApi.get(`${routes.docs}/${queryKey[1]}/view-invite`);
};

export const POST_VIEWERS = async ({ queryKey }: any) => {
  return validDocsApi.post(routes.viewers, queryKey[1]);
};

export const GET_SIGN_INVITE = async ({ queryKey }: any) => {
  return validDocsApi.get(`${routes.docs}/${queryKey[1]}/sign-invite`);
};

export const SEARCH = (query: any) => {
  return validDocsApi.get(routes.search, {
    params: { searchTerm: query.queryKey[1] },
  });
};

export const GET_INVITATIONS = ({ queryKey }: any) => {
  return validDocsApi.get(routes.invitations, { params: queryKey[1] });
};
