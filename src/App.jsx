import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Photo Gallery
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Curated photos from around the world
        </p>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <Gallery />
      </main>
    </div>
  );
}
