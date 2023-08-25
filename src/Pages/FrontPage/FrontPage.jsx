import React from "react";
import FrontPageContent from "./FrontPageContent";
import "./FrontPage.css";

function FrontPage() {
  return (
    <div>
      <p className="GeneralMarketInfo"> 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas sit amet pretium urna.
      Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique.
      Quisque vehicula, risus eget aliquam placerat, purus leo tincidunt eros, eget luctus quam orci in velit.
      Praesent scelerisque tortor sed accumsan convallis.
      </p>

      <FrontPageContent />
    </div>
  );
}

export default FrontPage;