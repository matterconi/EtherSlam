const Footer = () => {
    return (
      <footer className=" text-white">
        <div className="max-w-6xl mx-16 py-4">
          <div className="md:flex justify-between items-center text-center md:text-left">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold">EtherSlam</h2>
              <p className="text-sm  mt-2">A tool to be always updated with the Blockchain.</p>
            </div>
            <div className="text-sm">
              <p>Created by <strong>Matteo Marconi</strong>, web developer based in Florence.</p>
              <p className="pt-4">Matteo has a keen interest in blockchain, React, Next.js, Tailwind CSS, and AI, striving to integrate these technologies in innovative ways.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-xs">
              © {new Date().getFullYear()} Matteo Marconi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;