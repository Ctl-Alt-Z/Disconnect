import "../styles/team.css";
export default function TeamPage() {
  return (
    <>
      <div id="teamPage">
        <h1>About the Disconnect Team</h1>
        <p id="tpMessage">
          message about what disconnect means to the team/ the intention of what
          we want to do with this app.
        </p>
        <br></br>
        <div className="teamPic">
          <div>
            <img src="../luis.jpeg" alt="" id="luis" />
            <p> Product Manager: luis</p>
          </div>
          <div>
            <img src="../tay.jpeg" alt="" id="taylor" />
            <p>Developer: taylor</p>
          </div>
          <div>
            <img src="../zae.jpeg" alt="" id="zae" />
            <p> Developer: zae</p>
          </div>
          <div>
            <img src="../avionte.jpeg" alt="" id="avo" />
            <p> Developer: avionte</p>
          </div>
        </div>
      </div>
    </>
  );
}
