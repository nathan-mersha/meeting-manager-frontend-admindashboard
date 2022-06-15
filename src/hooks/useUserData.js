import { fetchToken } from "../utils/fetchUser";

const homeUrl = "https://mmserver.ml/";

export const getListUser = async (limit = 12, page = 1) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      // 'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyYTkwNjBmLWRkZGItNDAzOS1hMGJkLTM3NjRmNDUyMjk3NCIsImV4cGlyYXRpb24iOiIyMDIyLTExLTI1In0.CSSITkieqyAd5Dr12jMN7__3vuNwRnEHIsxoiRmMqBw'
      // 'token':  localStorage.getItem('token')
      token: fetchToken(),
    },
  };
  return fetch(
    homeUrl +
      "server/user/all?limit=" +
      limit +
      "&page=" +
      page +
      "&sort=firstModified",
    requestOptions
  ).then(async (response) => {
    const json = await response.json();

    return json;
  });
};

export const getListSuperUser = async (limit = 25, page = 1) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      // 'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyYTkwNjBmLWRkZGItNDAzOS1hMGJkLTM3NjRmNDUyMjk3NCIsImV4cGlyYXRpb24iOiIyMDIyLTExLTI1In0.CSSITkieqyAd5Dr12jMN7__3vuNwRnEHIsxoiRmMqBw'
      // 'token':  localStorage.getItem('token')
      token: fetchToken(),
    },
  };
  return fetch(
    homeUrl +
      "server/user/all?allUser="+false+"&limit=" +
      limit +
      "&page=" +
      page +
      "&sort=firstModified",
    requestOptions
  ).then(async (response) => {
    const json = await response.json();

    return json;
  });
};

export const uploadFile = async (image) => {
  const formDate = new FormData();
  formDate.append("file", image);
  const requestOptions = {
    method: "POST",
    headers: { Accept: "multipart/form-data", token: fetchToken() },
    body: formDate,
  };
  return fetch(homeUrl + "server/user/uploadfile", requestOptions)
    .then(async (response) => {
      const json = await response.json();
      console.log(json);
      if (json.filePath) {
        return json.filePath;
      } else {
        // return "error";
        alert("image was not uploaded");
      }
    })
    .catch((error) => alert(error.message));
};

export const changeUserStatus = async (user) => {
  const requestOptions = {
    method: "PUT",
    headers: { "content-type": "application/json", "token": fetchToken() },
    body: JSON.stringify(user),
  };
  return fetch(homeUrl + "server/user/admin/changeUserAccountStatus", requestOptions)
    .then(async (response) => {
      const json = await response.json();
      console.log(json);
      if (json["message"]) {
        return "done";
      } else {
        return "error";
        // alert(json["detail"]);
      }
    })
    .catch((error) => alert(error.message));
  
  };

  export const changeUserType = async (user) => {
    const requestOptions = {
      method: "PUT",
      headers: { "content-type": "application/json", "token": fetchToken() },
      body: JSON.stringify(user),
    };
    return fetch(homeUrl + "server/user/admin/changeUserAccountType", requestOptions)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json["message"]) {
          return "done";
        } else {
          return "error";
          // alert(json["detail"]);
        }
      })
      .catch((error) => alert(error.message));
    
    };

    export const deleteUser = async (user) => {
      const requestOptions = {
        method: "DELETE",
        headers: { "content-type": "application/json", "token": fetchToken() },
        body: JSON.stringify(user),
      };
      return fetch(homeUrl + "server/user/delete_for_debug", requestOptions)
        .then(async (response) => {
          const json = await response.json();
          console.log(json);
          if (json["message"]) {
            return "done";
          } else {
            return "error";
            // alert(json["detail"]);
          }
        })
        .catch((error) => alert(error.message));
      
      };