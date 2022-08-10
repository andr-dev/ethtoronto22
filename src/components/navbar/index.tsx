import { Outlet } from "react-router-dom";

interface NavbarProps {
  phantom?: string;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <>
      <div>navbar</div>
      <Outlet />
    </>
  );
};

export default Navbar;
