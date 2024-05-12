import Main from "./Main";
import Header from "./Header";

export default function HomePage() {
  return (
    <div
      className="overflow-y-scroll"
      style={{
        scrollbarWidth: "none",
        overflow: "-moz-scrollbars-none",
        scrollBehavior: "smooth",
      }}
    >
      <Header />
      <Main />
    </div>
  );
}
