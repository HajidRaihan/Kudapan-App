import "./App.css";
import CounterCard from "./components/CounterCard";

function App() {
  return (
    <>
      <div className="h-40 bg-[#BF3131] rounded-b-[40px] flex justify-center items-center">
        <p className="text-white text-2xl font-medium">Welcome to my app</p>
      </div>

      <div className="mx-5">
        <p className="font-semibold text-lg">list counter</p>
        <button className="btn btn-accent">Accent</button>
      </div>

      <div className="mx-5 h-screen">
        <CounterCard />
        <CounterCard />
        <CounterCard />
      </div>
    </>
  );
}

export default App;
