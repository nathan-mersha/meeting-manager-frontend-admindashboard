export const fetchUser=() =>{
    const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
      return userInfo;
}

export const fetchToken=() =>{
  const userToken =
  localStorage.getItem("token") !== "undefined"
    ? JSON.parse(localStorage.getItem("token"))
    : localStorage.clear();
    return userToken;
}