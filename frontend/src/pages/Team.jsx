import "../styles/team-page.css";
import zae from "../assets/zae.png";
import avionte from "../assets/avionte.png";
import luis from "../assets/luis.png";
import taylor from "../assets/taylor.png";

export default function TeamPage() {
  return (
    <>
      <h1 className="about-title">The Team</h1>
      <div className="about-parent">
        <div className="border">
          <a
            href="https://www.linkedin.com/in/luis-g-abreu/"
            target="blank"
            rel="noopener noreferrer"
          >
            <img src={luis} alt="Luis Abreu" />
            <span className="name">Luis Abreu</span>
          </a>
        </div>
        <div className="border">
          <a
            href="https://www.linkedin.com/in/zae-correa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={zae} alt="Jose Correa" />
            <span className="name">Jose Correa</span>
          </a>
        </div>
        <div className="border">
          <a
            href="https://www.linkedin.com/in/taylor-i-marshall/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={taylor} alt="Taylor Marshall" />
            <span className="name">Taylor Marshall</span>
          </a>
        </div>
        <div className="border">
          <a
            href="https://www.linkedin.com/in/avionte-williams/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={avionte} alt="Avionte Williams" />
            <span className="name">Avionte Williams</span>
          </a>
        </div>
      </div>
      <br></br>
      <div className="our-mission">
        <br />
        <p id="team-text">
          Research supports the growing concern about screen overuse. According
          to the American Psychological Association (2017), technology overuse
          is a significant contributor to stress, burnout, and mental health
          concerns, particularly among young adults and students. The Center for
          Humane Technology highlights the systemic nature of this issue,
          pointing out how digital infrastructure encourages excessive screen
          use, undermining human well-being. Recent data from Common Sense Media
          (2023) shows that U.S. tweens and teens spend an average of 7.5 hours
          per day on screens, a dramatic increase from previous years.
          Meanwhile, DataReportal’s (2023) Global Overview Report reveals that
          the average U.S. adult spends approximately 3.5 hours per day on
          mobile devices alone, with a global trend of increasing screen time
          each year. These statistics underscore the urgent need for solutions
          that address the negative impacts of excessive screen time and help
          individuals regain control over their digital well-being.
        </p>
        <br />
        <p id="team-text">
          Our vision is to foster a more mindful, balanced, and connected
          society—one where technology serves as a tool for growth rather than a
          source of distraction and our mission is to empower individuals to
          better understand, reflect on, and transform their digital habits.
          Through accessible tools, personal storytelling, and community-driven
          support, we aim to help users reclaim intentionality in their digital
          lives and build healthier relationships with technology.
        </p>
      </div>
    </>
  );
}
