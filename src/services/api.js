import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const headers = {
  'Content-Type': 'application/json',
};

interface RequestConfig<T> {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  data?: any;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

const request = async <T>({ url, method = 'get', data }: RequestConfig<T>): Promise<T> => {
  const fullURL = `${baseURL}${url}`;
  try {
    const response = await axios({
      url: fullURL,
      method,
      headers,
      data: data ? JSON.stringify(data) : undefined,
    });

    if (response.status < 200 || response.status >= 300) {
      console.error(`API Error: ${method.toUpperCase()} ${fullURL} failed with status ${response.status}:`, response.data);
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`API Error: ${method.toUpperCase()} ${fullURL} failed:`, error.message, error.response ? error.response.data : '');
      throw new Error(`Request failed: ${error.message}`);
    } else {
        console.error(`API Error: ${method.toUpperCase()} ${fullURL} failed:`, error.message);
        throw new Error(`Request failed: ${error.message}`);
    }
  }
};


const get = <T>(url: string): Promise<T> => request<T>({ url, method: 'get' });

const post = <T, U>(url: string, data: U): Promise<T> => request<T>({ url, method: 'post', data });

const put = <T, U>(url: string, data: U): Promise<T> => request<T>({ url, method: 'put', data });

const del = <T>(url: string): Promise<T> => request<T>({ url, method: 'delete' });

export default {
  get,
  post,
  put,
  delete: del,
};