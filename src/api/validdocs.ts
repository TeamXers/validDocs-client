import axios from "axios";

export const validDocsApi = axios.create({
    baseURL: process.env.REACT_APP_VALID_DOCS_API
});

validDocsApi.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Extract the response result
    const data = response.data.data;
    if (data?.results) return data.results;
    return data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

const routes = {
    account: '/accounts',
    docs: '/docs',
    search: '/search',
    pinata: '/pinata'
}


export const GET_ACCOUNT = (query: any) => {
    return validDocsApi.get(routes.account, { params: { address: query.queryKey[1] } });
}

export const SET_USERNAME = async (data: { username: string, address: string }) => {
    const { username, address } = data;

    const accounts: any = await validDocsApi.get(routes.account, { params: { address } });

    if (accounts.length > 0) {
        // We only need to update the username
        return validDocsApi.patch(routes.account, { username }, { params: { address } });
    }
    return validDocsApi.post(routes.account, data);
}

export const GET_DOCUMENTS = (query: any) => {
    return validDocsApi.get(routes.docs, { params: { author: query.queryKey[1] } });
}

export const GET_DOCUMENT = (query: any) => {
    return validDocsApi.get(routes.docs, { params: { tokenId: query.queryKey[1] } });
}

export const POST_DOC_FILE = async (data: any) => {
    return validDocsApi.post(
        routes.pinata,
        Object.keys(data).reduce(
            (formData, cur) => {
                formData.append(cur, data[cur]);
                return formData;
            },
            new FormData()
        )
    );
}

export const POST_DOCUMENT  = async (data: any) => {
    return validDocsApi.post(routes.docs, data);
}

export const SEARCH = (query: any) => {
    return validDocsApi.get(routes.search, { params: { searchTerm: query.queryKey[1] } })
}
