// // src/components/GmailAuth.js

// import React, { useState } from "react";

// function GmailAuth() {
//   const [token, setToken] = useState(null);

//   const handleAuthClick = () => {
//     // Redirect the user to the backend's Google authentication route
//     window.location.href =
//       "http://localhost:3000/api/users/oauth2/redirect/google";
//   };

//   const fetchProtectedData = () => {
//     fetch("http://localhost:3000/protected", {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching protected data:", error);
//       });
//   };

//   // Listen for the JWT token in the URL after authentication
//   if (window.location.hash.includes("token")) {
//     const jwtToken = new URLSearchParams(window.location.hash).get("token");
//     if (jwtToken && !token) {
//       setToken(jwtToken);
//       window.history.replaceState(null, null, " "); // Remove token from URL
//     }
//   }

//   return (
//     <div>
//       <button onClick={handleAuthClick}>Authorize Gmail Access</button>
//       {token && (
//         <button onClick={fetchProtectedData}>Fetch Protected Data</button>
//       )}
//     </div>
//   );
// }

// export default GmailAuth;
import { useEffect } from "react";
import { Route } from "react-router-dom";

function GoogleAuthRedirect() {
  useEffect(() => {
    window.location.href = "https://mailto.naimmiah.com/auth/google";
  }, []);

  return null; // This component doesn't render anything
}

export default GoogleAuthRedirect;
