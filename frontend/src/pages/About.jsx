import React from "react";
import Footer from "../components/common/Footer";

/**
 * AboutPage — Stemsage Techworld
 * Header (navbar + logo) fully removed.
 * Page now starts directly from the hero banner.
 */

const coreValues = [
  {
    title: "Innovation:",
    body:
      "At Stemsage, innovation is the heart of everything we do. Whether it's developing cutting-edge robotics kits or designing personalized IoT solutions, we continuously push the boundaries to create impactful products and services.",
  },
  {
    title: "Accessibility:",
    body:
      "We believe that education and innovation should be accessible to everyone. Our affordable workshops, user-friendly kits, and tailored programs ensure that technology reaches learners across all demographics.",
  },
  {
    title: "Hands-On Learning:",
    body:
      "True learning happens through doing. Our approach emphasizes experiential education, equipping participants with practical skills that translate directly into real-world applications.",
  },
];

const founders = [
  {
    name: "Mr. Prathamesh Mali",
    role: "C.E.O",
    image:
      "https://static.wixstatic.com/media/dfd360_5513ee2876b14e5d9a25ddb811db3dc6~mv2.jpg/v1/crop/x_0,y_864,w_3456,h_3456/fill/w_238,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7070_JPG.jpg",
  },
  
];

const team = [
  {
    name: "Mr. Mandar Patil",
    role: "Chief management officer (C.M.O)",
    image:
      "https://static.wixstatic.com/media/c0ea5f_8b5b595fc6a84521ab767b523271a146~mv2.jpg/v1/crop/x_208,y_59,w_641,h_641/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mandar_patil_CMO.jpg",
  },
  {
    name: "Mr. Anurag Jamadar",
    role: "Graphics Designer",
    image:
      "https://static.wixstatic.com/media/fa4da3_250a8a59a3c9412c813f6e450513c11f~mv2.jpg/v1/crop/x_500,y_0,w_2000,h_2000/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/anni_edited.jpg",
  },
  {
    name: "Mr. Chaitanya Patil",
    role: "Project development",
    image:
      "https://static.wixstatic.com/media/dfd360_5513ee2876b14e5d9a25ddb811db3dc6~mv2.jpg/v1/crop/x_111,y_977,w_3223,h_3223/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfd360_5513ee2876b14e5d9a25ddb811db3dc6~mv2.jpg",
  },
  
  

];

export default function AboutPage() {
  return (
    <div className="sg-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700&family=Inter:wght@400;600&display=swap');

        .sg-page {
          --dark: rgb(44,44,44);
          --white: #fff;
          --line: #2c2c2c;
          font-family: "Inter", Arial, sans-serif;
          color: var(--dark);
          background: var(--white);
        }
        .sg-page * { box-sizing: border-box; }
        .sg-page h1, .sg-page h2 {
          font-family: "Syne", sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }

        /* Hero banner + title */
        .sg-banner { width: 100%; height: 300px; object-fit: cover; display: block; }
        .sg-title { text-align: center; padding: 40px 24px 24px; }
        .sg-title h1 { font-size: clamp(2.4rem, 6vw, 3.6rem); }

        .sg-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        /* Sections */
        .sg-section { padding: 48px 0; text-align: center; }
        .sg-section__inner { max-width: 780px; margin: 0 auto; text-align: left; }
        .sg-section h2 {
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          text-decoration: underline;
          text-align: center;
          margin-bottom: 24px;
        }
        .sg-section p {
          text-align: justify;
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        /* Core values */
        .sg-values { list-style: decimal; padding-left: 22px; text-align: left; }
        .sg-values li { margin-bottom: 18px; font-size: 1.05rem; line-height: 1.6; }
        .sg-values strong { font-weight: 700; }

        /* People grids */
        .sg-people {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 36px;
        }
        .sg-person { width: 200px; text-align: center; }
        .sg-person img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          margin: 0 auto;
        }
        .sg-person__role { margin-top: 14px; font-weight: 700; font-size: 0.95rem; }
        .sg-person__name { margin-top: 4px; font-size: 1.05rem; }

        /* Footer */
        .sg-footer { padding: 60px 0 32px; }
        .sg-footer__top {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          align-items: center;
          margin-bottom: 24px;
        }
        .sg-footer__top p { margin: 0; font-size: 0.95rem; }
        .sg-footer hr {
          border: none;
          border-top: 1px solid var(--line);
          margin: 24px 0;
        }
        .sg-footer__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 24px;
        }
        .sg-footer__col p, .sg-footer__col a {
          display: block;
          color: var(--dark);
          text-decoration: none;
          font-size: 0.9rem;
          margin: 0 0 10px;
        }
        .sg-footer__col a { text-decoration: underline; }
        .sg-footer__bottom {
          text-align: center;
          font-size: 0.85rem;
          margin-top: 24px;
        }
      `}</style>

      {/* No header — page starts from the hero banner */}

      <img
        className="sg-banner"
        src="https://static.wixstatic.com/media/c0ea5f_582d2563cd8e4c2cb65ede0a71da27dd~mv2.jpg/v1/crop/x_0,y_1088,w_2083,h_520/fill/w_1828,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/YT.jpg"
        alt=""
      />

      <div className="sg-title">
        <h1>About</h1>
      </div>

      <main className="sg-container">
        <section className="sg-section">
          <div className="sg-section__inner">
            <h2>The Full Story</h2>
            <p>
              STEMSAGE was born out of a shared passion for empowering
              individuals to innovate and thrive in a rapidly evolving
              technological landscape. Founded by a team of visionaries with a
              background in engineering, education, and design, our mission is
              to bridge the gap between theoretical knowledge and practical
              application. Recognizing the growing demand for hands-on STEM
              learning, we set out to create a platform that delivers
              cutting-edge solutions in custom projects, 3D design, IoT,
              robotics, Arduino, and electronics workshops.
            </p>
            <p>
              From humble beginnings, we've grown into a trusted name,
              providing robotic educational kits and tailored solutions that
              spark curiosity, creativity, and confidence in learners of all
              ages. STEMSAGE is more than a company—it's a movement dedicated
              to nurturing problem solvers and innovators who will shape the
              future.
            </p>
          </div>
        </section>

        <section className="sg-section">
          <div className="sg-section__inner">
            <h2>Our vision</h2>
            <p>
              At STEMSAGE, we envision a world where innovation knows no
              bounds and where individuals, regardless of their background,
              have access to the tools and knowledge needed to excel. Our
              long-term goal is to revolutionize STEM education and innovation
              by creating solutions that empower learners, educators, and
              organizations. By integrating advanced technologies like
              robotics, IoT, and 3D design into practical learning
              experiences, we aim to build a globally recognized hub for
              technological excellence.
            </p>
          </div>
        </section>

        <section className="sg-section">
          <div className="sg-section__inner">
            <h2>Our core values</h2>
            <ol className="sg-values">
              {coreValues.map((value) => (
                <li key={value.title}>
                  <strong>{value.title}</strong>
                  <br />
                  {value.body}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sg-section">
          <h2>Our Founders</h2>
          <div className="sg-people">
            {founders.map((person) => (
              <div className="sg-person" key={person.name}>
                <img src={person.image} alt={person.name} loading="lazy" />
                <div className="sg-person__role">{person.role}</div>
                <div className="sg-person__name">{person.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="sg-section">
          <h2>Our Team</h2>
          <div className="sg-people">
            {team.map((person) => (
              <div className="sg-person" key={person.name}>
                <img src={person.image} alt={person.name} loading="lazy" />
                <div className="sg-person__role">{person.role}</div>
                <div className="sg-person__name">{person.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}