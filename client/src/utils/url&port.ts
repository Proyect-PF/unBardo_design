//export const PORT = "3700";
//export const baseURL = process.env.NODE_ENV === "production" ? "https://unbardodesignback.up.railway.app" : "http://localhost:3700";


// ADDED ON 22/02 DEPLOY
export const PORT = process.env.PORT;
export const base = "https://unbardodesign-production.up.railway.app/";
export const baseURL = process.env.NODE_ENV === "production" ? base : "http://localhost:3700";

