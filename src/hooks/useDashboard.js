import { fetchToken } from "../utils/fetchUser";
const homeUrl = "https://mmserver.ml/";

export const getArrangeStatus = async (year = 2022, month=1) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: fetchToken(),
      },
    };
    return fetch(
      homeUrl +"server/dashboard/meetings?year=" +year+"&month="+month,
      requestOptions
    ).then(async (response) => {
      const json = await response.json();  
      return json;
    });
  };
  export const getArrangeUserStatus = async (year = 2022, month=1) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: fetchToken(),
      },
    };
    return fetch(
      homeUrl +"server/dashboard/users?year=" +year+"&month="+month,
      requestOptions
    ).then(async (response) => {
      const json = await response.json();  
      return json;
    });
  };

  export const getArrangeMembershipStatus = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: fetchToken(),
      },
    };
    return fetch(
      homeUrl +"server/dashboard/members",
      requestOptions
    ).then(async (response) => {
      const json = await response.json();  
      return json;
    });
  };