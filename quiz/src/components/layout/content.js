import {  Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="layout__content">
      <Outlet/>
    </div>
  );
}
export default Content;
