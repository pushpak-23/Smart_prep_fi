import { useSelector } from "react-redux";
import Analytics from "./Analytics";
import Cards from "./Cards";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";
export default function Homepage() {
  const darkTheme = useSelector((state) => state.darkTheme);
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className={"dark:bg-darkBg bg-whiteBg"}>
        <Navbar />
        <Hero />
        <Analytics />
        <Newsletter />
        <Cards />
        <Footer />
      </div>
    </div>
  );
}
