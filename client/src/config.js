let URL;

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  URL = "";
};

export default URL;