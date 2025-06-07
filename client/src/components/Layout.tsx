import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="bg-gray-800 text-gray-400 text-center py-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} InboxHire. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Built with ❤️ by{" "}
            <a href="https://github.com/aakamshpm" target="_blank">
              <span className="text-blue-400 hover:underline">Aakamsh P M</span>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
