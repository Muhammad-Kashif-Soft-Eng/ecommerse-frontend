import {
    FaUsers,
    FaBoxOpen,
    FaUserCog,
    FaCogs,
    FaShoppingCart,
    FaClipboardList,
} from "react-icons/fa";
import Link from "next/link";

export default function DashboardPage() {
    const cards = [
        { title: "All Users", icon: <FaUsers />, href: "/dashboard/users", color: "from-cyan-500 to-blue-500" },
        { title: "All Products", icon: <FaBoxOpen />, href: "/dashboard/products", color: "from-purple-500 to-pink-500" },
        { title: "Manage Users", icon: <FaUserCog />, href: "/dashboard/users", color: "from-green-500 to-teal-500" },
        { title: "Manage Products", icon: <FaCogs />, href: "/dashboard/products", color: "from-orange-500 to-yellow-500" },
        { title: "All Orders", icon: <FaShoppingCart />, href: "/dashboard/orders", color: "from-indigo-500 to-purple-500" },
        { title: "Manage Orders", icon: <FaClipboardList />, href: "/dashboard/orders", color: "from-red-500 to-pink-500" },
    ];

    return (
        <section>
            <header className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Overview and quick actions</p>
            </header>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c) => (
                    <Link key={c.title} href={c.href} className="group">
                        <article
                            className={`flex items-center gap-4 p-5 rounded-2xl shadow-md transform transition hover:-translate-y-1`}
                        >
                            <div className={`p-3 rounded-lg text-white bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl`}>
                                {c.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">{c.title}</h3>
                                <p className="text-sm text-slate-500">View and manage {c.title.toLowerCase()}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
