import React from "react";
import { PATTERNS } from "./data/patterns.js";
import Header from "./components/Header";

const TOTAL_COUNT = PATTERNS.length;

const App = () => {
  return (
    <div className="min-h-screen bg-red-500 text-white">
      <Header totalCount={TOTAL_COUNT} />
    </div>
  );
};

export default App;
