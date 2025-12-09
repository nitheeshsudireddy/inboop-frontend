export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Inboop
          </h1>
          <p className="text-xl text-gray-600">
            Instagram Lead Management System
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Leads</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm opacity-90">Total leads captured</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Conversations</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm opacity-90">Active conversations</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Orders</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm opacity-90">Converted to orders</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Capture Instagram DMs automatically via webhooks</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>AI-powered language detection and intent classification</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Organize conversations into trackable leads</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Convert leads to orders and track delivery</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Multi-business account management</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Get Started
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>Backend API: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8080</code></p>
        </div>
      </div>
    </div>
  );
}
