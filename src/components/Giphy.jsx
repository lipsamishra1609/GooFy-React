import React, {useState} from "react";
import axios from "axios"
import Loading from "./Loading"
import Typical from 'react-typical';

const Giphy = () => {
      
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

      const renderGifs = () => {
          if(isLoading) {
            return <Loading />; 

          }
           return data.map(el => {
              return(
                  <div key={el.id} className="gif">
                      <img src={el.images.fixed_height.url}/>
                  </div>
              );
          });
      };
      
      const renderError = () =>{
          if(isError){
              return (
                <div class="alert alert-dark" role="alert">Oops!!! We are unable to connect. Come Again in a few Moments.</div>
              )
          };
      };

      const mySearch = event => {
           setSearch(event.target.value);

      };
      
      const myHandle = async event =>{
              event.preventDefault();
              setIsError(false);
              setIsLoading(true);

              try{
                const results = await axios("https://api.giphy.com/v1/gifs/search", {
                    params: {
                        api_key: "at7pjZK1AqNvg9BkZkkNtYK4mo5u4X3c",
                        q: search
                    }
                });
                setData(results.data.data);
              }catch (err){
                setIsError(true);
                setTimeout(() => setIsError(false), 4000);
             }
            setIsLoading(false);
      };


     return ( 
        <div className="m-2">
        {renderError()}
        <p>Welcome!
          <Typical
            loop={Infinity}
            wrapper="b"
            steps={[" to GOOFy WOOFy❗💛🕶🎭❗",2000, " to find your favourite Gifs.🍦",2000, " keep calm and 🏃‍ on. ",2000]}

          />     
        </p>
        <form className="form-inline justify-content-center m-2">
           <input value={search} onChange={mySearch} type="text" placeholder="What's your mood?" className="form-control" />
           <button onClick={myHandle} type="submit" className="btn btn-primary mx-2">
           <span>🔍</span>
        </button>
        </form>
        <div className="container gifs">{renderGifs()}</div>
        </div>
       ) 
     };

export default Giphy;
