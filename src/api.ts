import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    // cookie를 같이 보내겠다는 것.
    // backend에서 요청을 허용해주어야 가능하다.
    withCredentials: true,
});

export const getRooms = () => instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    // ex. querykey = [ "rooms", 2 ]
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    // ex. querykey = [ "rooms", 2 ]
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
};

export const getMe = () => instance.get("users/me").then((response) => response.data);

export const logOut = () =>
    instance
        .post("users/log-out", null, {
            headers: {
                // CSRF Token 보내기
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);

export const githubLogIn = (code: string) =>
    instance
        .post(
            `/users/github`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
    instance
        .post(
            `/users/kakao`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);
