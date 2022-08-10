import { Outlet } from "react-router-dom";

import ThemeToggle from "../themeToggle";

interface NavbarProps {
  themeToggler: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ themeToggler }) => {
  return (
    <>
      <div>navbar</div>
      <ThemeToggle themeToggler={themeToggler} />
      <Outlet />
    </>
  );
};

export default Navbar;
