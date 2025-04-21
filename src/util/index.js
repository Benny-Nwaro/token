import {jwtDecode} from "jwt-decode";


const isDevelopment = window.location.hostname.includes("localhost");

const getServer = () =>{
   return isDevelopment ? "https://token-server2025-df20d4c09df2.herokuapp.com" : "https://token-server2025-df20d4c09df2.herokuapp.com"; 
}
const decodeUser = () => {
   const token = localStorage.getItem("token");
   return jwtDecode(token);
 };
 
 export { getServer, decodeUser };