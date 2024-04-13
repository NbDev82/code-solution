import {DATA_LOGIN_SAMPLE} from '~/utils/Const'

export const isLoggedIn = () => {
  let data = localStorage.getItem('data');
  debugger;
  if (data != null) return true;
  else return false;
};

export const doLogin = (data, next) => {
  localStorage.setItem('data', JSON.stringify(data));
  debugger;
  next();
};
export const doLogout = (next) => {
  localStorage.removeItem('data');
  next();
};

export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    const data = localStorage.getItem('data');
    const jsonData = JSON.parse(data);

    // Truy cập trường "user"
    const user = jsonData.user;
    debugger;
    return user;
  } else {
    return undefined;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem('data')).token;
  } else {
    return null;
  }
};
