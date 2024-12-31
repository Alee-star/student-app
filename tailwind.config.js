export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-color": "rgb(63, 25, 109)",
      },
      backgroundImage: {
        banner: "url(/assets/School.jpg)",
        teacher: "url(/assets/teacher.jpg)",
        students: "url(/assets/students.jpg)",
      },
    },
  },
  plugins: [],
};
