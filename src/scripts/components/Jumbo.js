import React from "react";

const Jumbo = () => {
  return (
    <section className="section-jumbo">
      <div className="flex end column jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3 oswald">Take Care of Your Air</h1>
          <h2 className="display-4">with XHaust'd</h2>
        </div>
        <div className="scroll-btn">
          <span className="mouse">
            <span className="down" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Jumbo;
