export default function Sidebar() {
  return (
    <aside className="w-60 border-r p-6 hidden md:block">
      <ul className="space-y-3">
        <li className="font-medium">Dashboard</li>
        <li className="font-medium">Products</li>
        <li className="font-medium">Settings</li>
      </ul>
    </aside>
  );
}
