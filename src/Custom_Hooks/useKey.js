import { useEffect } from "react";

export default function useKey(key,action){
    useEffect(function(){
        function Callback(e){
          if(e.code.toLowerCase()===key.toLowerCase()){
            action();
            console.log('closing')
          }
          }
    
        document.addEventListener('keydown',Callback);
        
        return function(){
          document.removeEventListener('keydown',Callback);
        }
        },[key,action]);
}