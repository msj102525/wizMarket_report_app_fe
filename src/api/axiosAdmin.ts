import axios from 'axios';
import { REACT_APP_FASTAPI_ADMIN_URL } from '@env';

const instance = axios.create({
    baseURL: REACT_APP_FASTAPI_ADMIN_URL || 'http://192.168.0.240:8000',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});


// 요청 인터셉터
instance.interceptors.request.use(
    (config) => {
        // 요청이 어떻게 만들어지는지 확인
        // console.log(config);

        // Token 미설정 
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // console.log(response);  
        return response;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);


// 응답 인터셉터
// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response?.status === 401) {
//             // 인증 에러 처리
//             // 예: 로그아웃 처리
//         }
//         return Promise.reject(error);
//     }
// );

export default instance;