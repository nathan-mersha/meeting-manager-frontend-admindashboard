import { fetchToken } from "../utils/fetchUser";

const homeUrl = "https://mmserver.ml/";

export const  getListUser= async (limit=12,page=1)=>{
    const requestOptions = {
        method: "GET",
        headers: { "content-type": "application/json" ,
        // 'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyYTkwNjBmLWRkZGItNDAzOS1hMGJkLTM3NjRmNDUyMjk3NCIsImV4cGlyYXRpb24iOiIyMDIyLTExLTI1In0.CSSITkieqyAd5Dr12jMN7__3vuNwRnEHIsxoiRmMqBw'
        // 'token':  localStorage.getItem('token')
        'token':  fetchToken()

    },
      };
    return fetch(homeUrl + "server/user/all?limit="+limit+"&page="+page+"&sort=firstModified",requestOptions)
    .then(async (response) => {
       const json = await response.json();
       
       return json;
    });

}