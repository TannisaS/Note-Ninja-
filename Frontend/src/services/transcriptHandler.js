import axios from "axios"
const SERVER_URL=import.meta.env.VITE_SERVER_URL;
console.log(SERVER_URL);
export const audioHandler=async(inputData)=>{
  try {
    console.log("SERVER HIT",inputData)
    const response=await axios.post(SERVER_URL,inputData,{
        headers:{
            "Content-Type":"application/json",
        }
    });
    console.log(JSON.stringify(response.data.Response));
    return response.data.Response;
  } catch (error) {
    console.log("Error:",error);
   
  }
}
