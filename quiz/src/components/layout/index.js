import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import "./layout.scss";
function Layout() {
  return (
    <div className="layout">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
export default Layout;
