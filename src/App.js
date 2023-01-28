import { useState } from "react";

import SetupWrapper from "./components/SetupWrapper";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [albums, setAlbums] = useState(null);
  const loadAlbums = (data) => {
    setAlbums(() => data);
  };

  return (
    <div>
      {!albums && <SetupWrapper loadAlbums={loadAlbums} />}
      {albums && <ResultsScreen albums={albums}></ResultsScreen>}
    </div>
  );
}

export default App;
