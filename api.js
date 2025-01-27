let host = 'https://webdev-hw-api.vercel.app/api/v2/:natalvod1/comments';

export function getComments({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error("Нет авторизации");
        } else {
            throw new Error("Сервер сломался, попробуй позже")
        }
    });
};

export function addComment({ name, text, date, forceError, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name,
            date,
            text,
            forceError,
        }),
        headers: {
            Authorization: token,
        }
    }).then((response) => {

        if (response.status === 201) {
            return response.json();
        } else if (response.status === 500) {
            alert('Сервер не работает, повторите попытку позже')
            throw new Error("Сервер сломался, попробуй позже")
        } else if (response.status === 400) {
            alert('Имя и комментарий должны быть не короче 3 символов')
            throw new Error("Имя и комментарий короче 3 символов")
        }
    });
};

export function registerUser({ login, password, name }) {
    return fetch('https://webdev-hw-api.vercel.app/api/user', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {

        if (response.status === 400){
            throw new Error ("Такой пользователь уже существует")
          }
          
          return response.json()
    });
}

//https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
export function loginUser({ login, password }) {
    return fetch('https://webdev-hw-api.vercel.app/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {

        if (response.status === 201) {
            return response.json();
        
        } else if (response.status === 400) {
            throw new Error("Неверный логин или пароль")
        }
    });
}

// export function deleteComment({ token, id }) {
//     return fetch('https://webdev-hw-api.vercel.app/api/v2/:natalvod/comments/' + id, {
//         method: "DELETE",
//         headers: {
//             Authorization: token,
//         },
//     })
//         .then((response) => {
//             if (response.status === 200) {
//                 return response.json();
            
//             } else {
//                 throw new Error("Удаление не получилось")
//             }
//         })
// }

