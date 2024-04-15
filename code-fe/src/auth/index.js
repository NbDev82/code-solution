export const isLoggedIn = () => {
  let data = localStorage.getItem('data');
  if (data != null) return true;
  else return false;
};

export const doLogin = (data, next) => {
  debugger;
  localStorage.setItem('data', JSON.stringify(data));
  next();
};
export const doLogout = (next) => {
  localStorage.removeItem('data');
  next();
};

export const getCurrentUserDetails = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem('data').user);
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
