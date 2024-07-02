import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [blocklist, setBlocklist] = useState([]);
  const [newSite, setNewSite] = useState("");

  useEffect(() => {
    if (window.chrome && window.chrome.storage) {
      window.chrome.storage.sync.get(["blocklist"], function(result) {
        setBlocklist(result.blocklist || []);
      });
    }
  }, []);

  const addSite = () => {
    const updatedBlocklist = [...blocklist, newSite];
    setBlocklist(updatedBlocklist);
    if (window.chrome && window.chrome.storage) {
      window.chrome.storage.sync.set({ blocklist: updatedBlocklist });
    }
    setNewSite("");
  };

  const removeSite = (site) => {
    const updatedBlocklist = blocklist.filter((item) => item !== site);
    setBlocklist(updatedBlocklist);
    if (window.chrome && window.chrome.storage) {
      window.chrome.storage.sync.set({ blocklist: updatedBlocklist });
    }
  };

  return (
    <div className="App">
      <h1>Website Blocker</h1>
      <input
        type="text"
        value={newSite}
        onChange={(e) => setNewSite(e.target.value)}
        placeholder="Add new site"
      />
      <button onClick={addSite}>Add</button>
      <ul>
        {blocklist.map((site, index) => (
          <li key={index}>
            {site} <button onClick={() => removeSite(site)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

