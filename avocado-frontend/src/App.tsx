import { Suspense } from "react";

import IndexRoute from "./routes";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <IndexRoute />
      </Suspense>
    </>
  );
}

export default App;
