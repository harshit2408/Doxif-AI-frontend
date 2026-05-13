import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Home() {
  document.title = "DoxifAi";

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white text-center">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold pb-4">Document Data Extractor</h1>
          <h2 className="text-3xl font-semibold">School of Computer Science and Engineering</h2>
        </div>
      </div>
        <main className="w-full flex flex-col items-center justify-start flex-grow">
          <nav className="flex flex-col items-center justify-center bg-gray-800 rounded-md p-8 gap-4">
            <a className="hover:text-blue-300" href="/upload">
              Guest Lecture
            </a>
          </nav>
        </main>
      <Footer />
    </div>
  );
}

export default Home;
