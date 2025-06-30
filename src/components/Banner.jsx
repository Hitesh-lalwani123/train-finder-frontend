// src/components/Banner.js
export default function Banner({msg}) {
  return (
    <div className="bg-gradient-to-r from-green-700 to-green-300 text-white px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">{msg}</h1>
      {/* <div className="inline-block px-4 py-2 bg-yellow-200 text-black font-medium rounded-t-lg">
        Current announcements...
      </div> */}
    </div>
  );
}
