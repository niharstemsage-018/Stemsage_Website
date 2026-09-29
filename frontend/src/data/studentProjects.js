import project01Img from "../assets/student_project_01.jpg";
import project02Img from "../assets/student_project_02.jpg";
import project03Img from "../assets/student_project_03.jpg";
import project04Img from "../assets/student_project_04.jpg";

export const studentProjects = [
  {
    id: 1,
    numStr: "01",
    title: "Project Name",
    subtitle: "Smart Plant Monitor",
    studentName: "Aarav Mehta",
    institution: "STEMSAGE Innovation Lab",
    category: "IoT",
    description: "This is your Project description. Provide a brief summary to help visitors understand the context and background of your work. Click on \"Edit Text\" or double click on the text box to start.",
    detailedDescription: "An IoT system that monitors soil moisture, light levels, and temperature — sending alerts when your plant needs care.",
    image: project01Img,
    tags: ["ESP32", "IoT", "Sensors"],
    spotlight: true,
  },
  {
    id: 2,
    numStr: "02",
    title: "Project Name",
    subtitle: "Gesture Controlled Robot",
    studentName: "Ananya Sharma",
    institution: "STEMSAGE Robotics Program",
    category: "Robotics",
    description: "This is your Project description. Provide a brief summary to help visitors understand the context and background of your work. Click on \"Edit Text\" or double click on the text box to start.",
    detailedDescription: "A wheeled robot controlled in real-time by hand gestures captured through an accelerometer-equipped glove.",
    image: project02Img,
    tags: ["Arduino", "Robotics", "Gestures"],
    spotlight: false,
  },
  {
    id: 3,
    numStr: "03",
    title: "Project Name",
    subtitle: "Obstacle Avoiding Rover",
    studentName: "Rohan Desai",
    institution: "STEMSAGE Junior Engineers",
    category: "Robotics",
    description: "This is your Project description. Provide a brief summary to help visitors understand the context and background of your work. Click on \"Edit Text\" or double click on the text box to start.",
    detailedDescription: "An autonomous rover that uses ultrasonic sensors to detect and avoid obstacles in real time.",
    image: project03Img,
    tags: ["Arduino", "Ultrasonic", "Autonomy"],
    spotlight: false,
  },
  {
    id: 4,
    numStr: "04",
    title: "Project Name",
    subtitle: "Smart Dustbin",
    studentName: "Priya Nair",
    institution: "STEMSAGE Innovation Lab",
    category: "Electronics",
    description: "This is your Project description. Provide a brief summary to help visitors understand the context and background of your work. Click on \"Edit Text\" or double click on the text box to start.",
    detailedDescription: "A contactless dustbin that opens automatically when motion is detected and sends a fill-level alert via Wi-Fi.",
    image: project04Img,
    tags: ["ESP8266", "Servo", "IoT"],
    spotlight: false,
  },
];

export const studentProjectCategories = ["All", "Robotics", "IoT", "Programming", "Electronics", "AI/ML"];
