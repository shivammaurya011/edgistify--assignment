import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiUsers, FiBell, FiLogOut, FiGrid } from "react-icons/fi";
import { FaShoppingCart, FaChartBar } from "react-icons/fa";
import { logoutUser } from "../features/authSlice";
import { useAppDispatch } from "../app/hooks";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch()

  const menuItems = [
    { name: "dashboard", label: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "categories", label: "Categories", path: "/dashboard/categories", icon: <FiGrid size={20} /> },
    { name: "products", label: "Products", path: "/dashboard/products", icon: <FiBox size={20} /> },
    { name: "orders", label: "Orders", path: "/dashboard/orders", icon: <FaShoppingCart size={20} /> },
    { name: "users", label: "Users", path: "/dashboard/users", icon: <FiUsers size={20} /> },
    { name: "payments", label: "Payments", path: "/dashboard/payments", icon: <FaChartBar size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed left-0 top-0 h-screen flex flex-col">
        <h2 className="text-2xl font-bold text-emerald-600 mb-8 px-3">Edgistify</h2>
        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors
                ${isActive 
                  ? "bg-emerald-500/10 text-emerald-600 font-semibold" 
                  : "text-gray-600 hover:bg-gray-100"}
              `}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Logout Button */}
        <button 
        onClick={()=>dispatch(logoutUser())}
        className="
          flex items-center space-x-3 px-4 py-3 mt-4 rounded-xl
          text-gray-600 hover:bg-gray-100 transition-colors
        ">
          <FiLogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 ">
          <div className="flex items-center justify-between px-8 h-16">
            <h1 className="text-lg font-semibold text-gray-800">
              {menuItems.find(item => location.pathname.includes(item.path))?.label || "Dashboard"}
            </h1>
            <button className="
              p-2 rounded-lg hover:bg-gray-100 text-gray-600
              relative transition-colors
            ">
              <FiBell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;