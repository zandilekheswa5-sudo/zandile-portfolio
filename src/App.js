import { useState, useEffect } from "react";
import profile from "./assets/zandile.jpg";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function App() {
  const [active, setActive] = useState("home");

  const socials ={
    github:"https://github.com/zandilekheswa5-sudo",
    Linkedin:"https://Linkedin.com/in/zandile-kheswa",
    Instagram:"https://www.instagram.com/theo._kh?igsh=YWxodDRyOWNraDFv"
  };

  useEffect(() => {
    const sections = ["home", "about", "projects", "services", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const offsetTop = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-6 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
          {["home", "about", "projects", "services", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`transition ${
                active === item
                  ? "text-white"
                  : "text-gray-400 hover:text-purple-400"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HOME */}
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-32"
      >
        <div className="max-w-xl space-y-6">
          <p className="text-sm text-purple-400">
            ● Available for freelance work
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">
            Hi, I’m Zandile 👋
          </h1>

          <h2 className="text-xl text-gray-400">
            Frontend Developer
          </h2>

          <p className="text-gray-400">
            I create responsive and user-friendly digital experiences.
            I bring ideas to life through clean code and thoughtful design.
          </p>

          <div className="flex gap-4">
            <a
              href="#projects"
              className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="border border-purple-500 px-6 py-3 rounded-full hover:bg-purple-600 transition"
            >
              Hire Me
            </a>
          </div>

        <div className="flex items-center gap-4 pt-4">

  <p className="text-sm text-gray-500">Follow me:</p>

  <a
    href={socials.github}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition transform hover:scale-110"
  >
    <FaGithub size={20} />
  </a>

  <a
    href={socials.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
  >
    <FaLinkedin size={20} />
  </a>

  <a
    href={socials.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-pink-400 transition transform hover:scale-110"
  >
    <FaInstagram size={20} />
  </a>

</div>

          <p className="text-sm text-gray-500">
            📍 Johannesburg, SA • Available Now
          </p>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src={profile}
            alt="Zandile"
            className="w-[320px] rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen px-6 md:px-20 py-20">
        <h2 className="text-3xl font-bold mb-6 text-purple-400">
          About Me
        </h2>

        <p className="text-gray-400 max-w-2xl">
          I’m Zandile — a frontend developer focused on building clean,
          responsive, and user-friendly interfaces. Based in Johannesburg,
          I’m continuously improving my skills in full-stack development,
          UI/UX design, and modern web technologies.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="min-h-screen px-6 md:px-20 py-20">
        <h2 className="text-3xl font-bold mb-10 text-purple-400">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">
              FocusFlow Dashboard
            </h3>

            <p className="text-gray-400 mb-4">
              Productivity dashboard for freelancers.
            </p>

            <div className="flex gap-2 mb-4">
              <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                React
              </span>
              <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                Tailwind
              </span>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/zandilekheswa5-sudo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400"
              >
               GitHub
             </a>

              <a
                href="https://your-live-demo-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400"
              >
               Live Demo
             </a>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl flex items-center justify-center">
            More projects coming...
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="min-h-screen px-6 md:px-20 py-20">
        <h2 className="text-3xl font-bold mb-10 text-purple-400">
          Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl">
            Web Development
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            UI/UX Design
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            Responsive Design
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="min-h-screen px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10"
      >
        <div>
          <h2 className="text-3xl font-bold mb-6 text-purple-400">
            Get In Touch
          </h2>

          <p className="text-gray-400 mb-6">
            Let’s collaborate! I’m open to projects and opportunities.
          </p>

          <p className="text-gray-400">📧 zandile.dev.sa@gmail.com</p>
          <p className="text-gray-400">📞 +27 79 743 8937</p>
          <p className="text-gray-400">📍 Johannesburg, SA</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <input
            placeholder="Your Name"
            className="w-full mb-3 p-3 bg-gray-800 rounded"
          />
          <input
            placeholder="Your Email"
            className="w-full mb-3 p-3 bg-gray-800 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full mb-3 p-3 bg-gray-800 rounded"
          />
          <button className="bg-purple-600 px-6 py-2 rounded">
            Send Message
          </button>
        </div>
      </section>

    </div>
  );
}

export default App;