export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-10">
      <div className="container mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
    </footer>
  );
}
