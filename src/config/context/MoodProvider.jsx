import { createContext , useContext , useState} from "react";

// creating context 
const MoodContext = createContext({});

// making custom hook 
export const useMoodContext = () => useContext(MoodContext);

const MoodProvider = ({children}) => {
    const [mood, setMood] = useState('')

    return(
        <MoodContext.Provider value={{mood , setMood}}>
            {children}
        </MoodContext.Provider>
    );
};

export default MoodProvider ; 


