import FinalView from "./components/FinalView";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import View from "./components/View";
import { TextContextProvider } from "./context/TextContext";

function App() {
  return (
    <TextContextProvider>
      <div className="min-h-screen font-[Poppins] bg-gray-200">      
          <Header />
          <main className="min-h-[37rem] flex flex-col md:flex-row"> 
            <div className="flex flex-col basis-[50%]">         
              <Inputs />                
              <View />
            </div>  
            <FinalView />       
          </main>      
      </div>
    </TextContextProvider>
  );
}

export default App;
