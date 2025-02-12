import DashboardLayout from "../../layout/DashboardLayout";
import { FiShoppingCart, FiUsers, FiDollarSign, FiBox } from "react-icons/fi";

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
              <div className="p-3 bg-emerald-100/50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Customer", "Order ID", "Status", "Amount"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Completed' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Sample Data
const stats = [
  { label: "Total Orders", value: "1,250", icon: <FiShoppingCart className="w-6 h-6 text-emerald-600" /> },
  { label: "Customers", value: "520", icon: <FiUsers className="w-6 h-6 text-emerald-600" /> },
  { label: "Revenue", value: "$24,500", icon: <FiDollarSign className="w-6 h-6 text-emerald-600" /> },
  { label: "Products", value: "1,128", icon: <FiBox className="w-6 h-6 text-emerald-600" /> },
];

const orders = [
  { id: "#12345", customer: "John Doe", status: "Completed", amount: "150.00" },
  { id: "#12346", customer: "Alice Brown", status: "Pending", amount: "85.50" },
  { id: "#12347", customer: "David Smith", status: "Completed", amount: "220.00" },
  { id: "#12348", customer: "Emma Wilson", status: "Pending", amount: "120.75" },
];

export default Dashboard;