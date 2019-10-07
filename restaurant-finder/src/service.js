// export const signUp = body => {
//   return fetch({
//     method: "POST",
//     url: `${API}/sign-up`,
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(body)
//   });
// };

// export const signIn = body => {
//   return fetch({
//     method: "POST",
//     url: `${API}/sign-in`,
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(body)
//   });
// };

// URLSearchParams
//api.yelp.com/v3/businesses/search?term=restaurants&location=Peachtree Corners, GA, US&offset=19

// https://api.yelp.com/v3/businesses/search?
// term=restaurants&
// location=Peachtree Corners, GA, US&
// offset=19
export const GetRestaurants = body => {
  return fetch({
    method: "GET",
    url: `api.yelp.com/v3/businesses/search`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};
