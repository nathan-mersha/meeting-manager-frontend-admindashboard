import { fetchToken } from "../utils/fetchUser";

const homeUrl = "https://mmserver.ml/";

export const  getConfig= async ()=>{
  
    const requestOptions = {
        method: "GET",
        headers: { "content-type": "application/json" ,
        // 'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyYTkwNjBmLWRkZGItNDAzOS1hMGJkLTM3NjRmNDUyMjk3NCIsImV4cGlyYXRpb24iOiIyMDIyLTExLTI2In0.SeI5Y9J5wRy4gdQKbuVIvbg1wWclTkhBZtGL1x-DvhQ"
        'token':  fetchToken()
    },
      };
    return fetch(homeUrl + "server/config",requestOptions)
    .then(async (response) => {
       const json = await response.json();
       
       return json;
    });

}
export const  updateConfig= async (Config)=>{
    console.log(Config);
    const requestOptions = {
        method: "PUT",
        headers: { 
            "content-type": "application/json" ,
            'accept': 'application/json',
            // 'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyYTkwNjBmLWRkZGItNDAzOS1hMGJkLTM3NjRmNDUyMjk3NCIsImV4cGlyYXRpb24iOiIyMDIyLTExLTI1In0.CSSITkieqyAd5Dr12jMN7__3vuNwRnEHIsxoiRmMqBw'
         'token':  fetchToken()
      },
      body: JSON.stringify(Config),
      };
    return fetch(homeUrl + "server/config",requestOptions)
    .then(async (response) => {
       const json = await response.json();
       console.log(json);
       return json;
    });

}