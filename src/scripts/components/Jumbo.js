import React from "react";

const Jumbo = () => {
  return (
    <section>
      <div className="flex end column jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3 oswald">Every bit helps</h1>
          <h2 className="display-4">Breathe easier with XHaust'd</h2>
        </div>
        <div className="scroll-btn">
          <span className="mouse">
            <span className="down" />
          </span>
          <span className="text oswald">Submit</span>
        </div>
      </div>
    </section>
  );
};

export default Jumbo;
