import React from "react";

function About() {
  return (
    <div style={{}} className="container">
      <br />
      <div className="section">
        <h5>What is FNN?</h5>
        <p>
          FNN is a News site that collects and compares the top headlines from Fox
          News and CNN. It is a full stack software engineering project
          developed using MongoDB, Express, React, and Node.js. You can find the
          source code <a href="https://github.com/kwkarlwang/fnn">here</a>
        </p>
      </div>
      <div className="divider"></div>
      <div className="section">
        <h5>What is the purpose of this project?</h5>
        <p>
          Ever since I learn about statistics in high school, I have been
          interested in the concept of "bias". Every News site, in fact, every
          News reporter is biased in their report. I chose Fox News and CNN not
          only because they are some of the most well known News outlets, but
          also because CNN leans toward the left wing and Fox News leans toward
          the right wing according to this{" "}
          <a href="https://www.allsides.com/media-bias/media-bias-ratings">
            AllSides article.
          </a>{" "}
          Hence, I am interested in seeing the political bias between these two
          news outlets and seeing what each of them consider as important News
          for the headlines.
          <p>
            Disclaimer: this project is NOT to slander, nor am I politically
            inclined, to either News outlet, it is purely based on my personal
            interest.
          </p>
        </p>
      </div>
    </div>
  );
}

export default About;
