import ChestMagnifier from "./components/ChestImage/ChestMagnifier";
import ChestText from "./components/ChestText/ChestText";

function App() {
  return (
    <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
      <ChestMagnifier />
      <ChestText />
    </div>
  );
}

export default App;
