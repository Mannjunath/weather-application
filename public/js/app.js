// console.log("Its form weather app");

// fetch("http://puzzle.mead.io/puzzle").then((respons) => {
//   console.log(respons);
//   respons.json().then((data) => console.log(data));
// });

// fetch("http://localhost:4000/weather?address=boston")
//   .then((response) => {
//     response
//       .json()
//       .then(({ error, location, forecast } = {}) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(location);
//           console.log(forecast);
//         }
//       })
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

const weatherform = document.querySelector("form");
const searchinput = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

const formsubmit = weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(searchinput.value);
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch(`/weather?address=${searchinput.value}`).then((response) => {
    response.json().then(({ error, location, forecast } = {}) => {
      if (error) {
        msgOne.textContent = error;
        msgTwo.textContent = "";
        //   console.log(error);
      } else {
        msgTwo.textContent = location;
        msgOne.textContent = forecast;
        //   console.log(location);
        //   console.log(forecast);
      }
    });
  });
});
