import React from "react";
import "./MonthlyCause.css";

// import SideBar from "./SideBar";
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   margin-bottom: 20px;
// `;

// const HexagonContainer = styled.div`
//   width: 200px;
//   height: 200px;
//   background-color: #ccc;
//   clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
// `;

// const Explanation = styled.p`
//   font-size: 18px;
//   margin-top: 20px;
// `;

function App() {
  return (
    <div
      className="hero min-h-screen bg-base-200 bg-cover hero-background"
      // style="background-image: url('https://ipfs-c1.doingud.com/ipfs/QmTj3o6q2nXGPRGuyZtCxkpoXPKXGeuREanJiw2eB5rSjJ');"
    >
      <div className="hero-content flex-row lg:flex-row-reverse" id="causeid">
        <div className="text-center lg:text-left new-proposal-container max-w-sm svelte-9f20ui">
          <h3>This month the project choosed by the governance is...</h3>
          <img
            src="https://image.doingud.com/nnlJaGFa9WbMeKSbbQa7t0lNpOEPVHdUbx51AZ3qzwk/resize:fill:256:0:0/quality:75/aHR0cHM6Ly9pcGZzLWMxLmRvaW5ndWQuY29tL2lwZnMvUW1hVERtNTl4OUVVeEJ2RENjWEo4aTZnY1JrbnlCd3Z4YldQNmZ2ZjF6NmpTZA"
            className="ImageBusiness"
          />
          <h4 className="bold">Bye Bye Plastic Foundation</h4>
          <h5 className="based">@byebyeplasticfoundation</h5>
          <p>
            Bye Bye Plastic Foundation is a disruptive nonprofit on a mission to
            eliminate single-use plastics from the music industry. Bye Bye
            Plastic harnesses the power of music, the most powerful human
            connector, in order to speed up the tipping point for a plastic-free
            music culture.
          </p>
          <p>
            We activate every stakeholder of the industry, starting from the
            Artists &amp; DJs, unrolling solution-oriented transition help &amp;
            guidance.
          </p>
          <p>
            Donate to their initiative by transferring funds to the following
            address:
          </p>
          <p>0x1790b48CD049D5197458becc1fBeeE4bB985e589.</p>
        </div>
        <div className="pledge-card card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100  svelte-9f20ui">
          <div className="card-body flex flex-col p-6 cardBodyCause">
            <p>
              We deeply believe that web3 is a powerful tool to promote fair and
              responsible governance action and empower those who are voiceless.
              For that reason, we contribute part of the protocol's earned fees
              towards public goods previously voted by the topMantle community.
            </p>

            <p>
              This is done by setting the protocolFeeRecipient variable within
              the protocol to an address controlled by a benefic cause
              organization. Right now, we are rooting for the ByeByePlastic
              Foundation, but this can change in the future.
            </p>
            <p>
              Our intention is to use the fundamental building blocks available
              to create a NFT-DeFi ecosystem on top of Mantle while contributing
              towards a better future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
