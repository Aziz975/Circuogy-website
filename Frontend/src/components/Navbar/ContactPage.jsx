
import React from "react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-[#D9EFEC] overflow-hidden font-sans">

      {/* HERO SECTION */}
      <section className="h-[300px] px-5 pt-7 text-center">

        <p className="text-[9px] font-extrabold tracking-[2px] text-[#07545A] uppercase mb-5">
          Contact Circulogy
        </p>

        <h1 className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[60px] leading-[0.99] tracking-[-2px] font-extrabold">
          <span className="text-[#299D8D]">
            Contact us to build the next
          </span>
          <br />
          <span className="text-black">
            material recovery{" "}
          </span>
          <span className="text-[#299D8D]">
            solution.
          </span>
        </h1>

        <p className="mt-7 text-[14px] sm:text-[15px] leading-6 text-[#58736F]">
          Talk to us about collection, recovered materials, technology partnerships
          <br className="hidden sm:block" />
          or working with Circulogy.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative bg-[#FAFCFB] rounded-t-[23px] min-h-[253px]">

        <div className="max-w-[1000px] mx-auto px-6 lg:px-0">

          <div className="grid grid-cols-1 md:grid-cols-[240px_275px_1fr] gap-8 md:gap-0 pt-10 md:pt-[45px]">

            {/* MATERIAL IMAGE */}
            <div className="relative hidden md:block">
              <img
                src="/images/material-sculpture.png"
                alt="Recovered copper and industrial materials"
                className="absolute w-[215px] max-w-none h-auto object-contain left-[-3px] top-[-77px] z-10"
              />
            </div>

            {/* CONTACT INFORMATION */}
            <div className="md:pr-7 md:border-r md:border-[#E5ECE9]">

              <p className="text-[9px] font-extrabold tracking-[1.3px] uppercase text-[#299D8D] mb-6">
                Contact Information
              </p>

              <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                <div>
                  <h3 className="text-[11px] font-bold text-[#152A27] mb-2">
                    Email
                  </h3>
                  <p className="text-[9px] text-[#82938F]">
                    info@circulogy.com
                  </p>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-[#152A27] mb-2">
                    Phone
                  </h3>
                  <p className="text-[9px] text-[#82938F]">
                    +91 86509 07362
                  </p>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-[#152A27] mb-2">
                    Office Address
                  </h3>
                  <p className="text-[9px] leading-[17px] text-[#82938F]">
                    18/15B, Silver Wing Wave One, Sector 18,
                    GB Nagar, Noida, Uttar Pradesh 201301
                  </p>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-[#152A27] mb-2">
                    Business Hours
                  </h3>
                  <p className="text-[9px] leading-[17px] text-[#82938F]">
                    Mon-Sat
                    <br />
                    10:00 AM-7:00 PM
                  </p>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="md:pl-[38px] md:pr-0">

              <h2 className="text-[23px] font-extrabold tracking-[-0.8px] text-[#102522] leading-tight">
                Start the conversation
              </h2>

              <p className="text-[9px] text-[#9AA9A5] mt-1 mb-5">
                Share your requirement and we'll route it to the relevant team.
              </p>

              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-[22px] gap-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your enquiry has been submitted.");
                }}
              >

                <div>
                  <label className="block text-[8px] font-bold tracking-[0.5px] text-[#899B96] mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-[#DFE8E5] pb-2 outline-none text-sm text-[#18332E] focus:border-[#299D8D]"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-bold tracking-[0.5px] text-[#899B96] mb-2">
                    WORK EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-[#DFE8E5] pb-2 outline-none text-sm text-[#18332E] focus:border-[#299D8D]"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-bold tracking-[0.5px] text-[#899B96] mb-2">
                    ORGANISATION
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#DFE8E5] pb-2 outline-none text-sm text-[#18332E] focus:border-[#299D8D]"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-bold tracking-[0.5px] text-[#899B96] mb-2">
                    WHAT WOULD YOU LIKE TO DISCUSS?
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-[#DFE8E5] pb-2 outline-none text-sm text-[#18332E] focus:border-[#299D8D]"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 mt-0">

                  <p className="text-[8px] text-[#9AA9A5]">
                    Material recovery, partnerships, careers and media.
                  </p>

                  <button
                    type="submit"
                    className="flex items-center gap-3 bg-[#07545A] hover:bg-[#299D8D] transition-colors text-white rounded-full pl-5 pr-2 py-[7px] text-[9px] font-bold whitespace-nowrap"
                  >
                    Send enquiry

                    <span className="w-[20px] h-[20px] rounded-full bg-[#56C5B0] flex items-center justify-center">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </button>

                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* MOBILE IMAGE */}
      <div className="md:hidden bg-[#FAFCFB] flex justify-center pb-8">
        <img
          src="/images/material-sculpture.png"
          alt="Recovered industrial materials"
          className="w-[190px] h-auto object-contain"
        />
      </div>


   
    <section className="w-full bg-white px-6 py-10 md:px-12">
      <div className="mx-auto max-w-[1150px]">
        {/* Heading */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b4f5c]">
          Our Office
        </p>
        <h2 className="mt-3 text-4xl font-extrabold text-[#0a2a2a] md:text-[44px]">
          Find us in <span className="text-[#2a9d8f]">Noida.</span>
        </h2>
        <p className="mt-3 text-[13px] text-[#5c6f6f]">
          A clear view of our office and the surrounding Sector 132 landmarks.
        </p>

        {/* Map container */}
        <div className="relative mt-5 overflow-hidden rounded-[28px] border border-[#cfe3df] bg-gradient-to-r from-[#eaf4f2] to-[#f5f5f1]">
          {/* Map */}
          <div className="h-[560px] w-full md:ml-0 md:h-[433px] md:pl-[300px]">
            <svg
              viewBox="0 0 817 433"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              fontFamily="inherit"
            >
              {/* base */}
              <rect width="817" height="433" fill="#f5f5f1" />
              <polygon points="35,20 300,10 330,200 150,230 20,180" fill="#f1eee8" />
              <polygon points="440,260 817,200 817,433 470,433" fill="#efede7" />
              <polygon points="20,280 300,330 380,433 20,433" fill="#f1eee8" />

              {/* roads */}
              <g fill="none" strokeLinecap="round">
                {/* main diagonal */}
                <path d="M425,440 L770,0" stroke="#ffffff" strokeWidth="40" />
                <path d="M425,440 L770,0" stroke="#cdd9da" strokeWidth="30" />
                {/* curved upper road */}
                <path d="M10,148 C150,175 300,215 470,238" stroke="#ffffff" strokeWidth="26" />
                <path d="M10,148 C150,175 300,215 470,238" stroke="#d3dedf" strokeWidth="18" />
                {/* right curved road */}
                <path d="M585,232 C700,248 790,285 830,315" stroke="#ffffff" strokeWidth="18" />
                <path d="M585,232 C700,248 790,285 830,315" stroke="#d9e2e2" strokeWidth="10" />
                {/* Veer Kalyan Marg */}
                <path d="M-10,305 C150,305 290,350 410,440" stroke="#ffffff" strokeWidth="40" />
                <path d="M-10,305 C150,305 290,350 410,440" stroke="#cdd9da" strokeWidth="30" />
                {/* small lanes */}
                <path d="M85,10 C110,40 130,60 150,75" stroke="#d6e0e0" strokeWidth="8" />
                <path d="M180,170 C200,190 230,215 260,235" stroke="#d6e0e0" strokeWidth="8" />
                <path d="M340,250 C380,280 420,310 450,340" stroke="#d6e0e0" strokeWidth="8" />
              </g>

              {/* buildings */}
              <g fill="#e2e6e5" stroke="#d3dad9" strokeWidth="1">
                <rect x="102" y="32" width="115" height="55" rx="8" transform="rotate(-12 160 60)" />
                <rect x="234" y="33" width="120" height="60" rx="8" transform="rotate(8 294 63)" />
                <rect x="68" y="85" width="165" height="65" rx="8" transform="rotate(-10 150 117)" />
                <rect x="270" y="92" width="105" height="62" rx="8" transform="rotate(15 323 123)" />
                <rect x="135" y="188" width="130" height="65" rx="8" transform="rotate(20 200 220)" />
                <rect x="205" y="262" width="170" height="80" rx="8" transform="rotate(20 290 302)" />
                <rect x="296" y="350" width="105" height="55" rx="8" transform="rotate(25 348 378)" />
                <rect x="585" y="95" width="120" height="50" rx="8" transform="rotate(-30 645 120)" />
                <rect x="637" y="160" width="130" height="75" rx="8" transform="rotate(-25 702 197)" />
                <rect x="605" y="275" width="100" height="85" rx="8" transform="rotate(-12 655 317)" />
              </g>

              {/* office plot */}
              <polygon
                points="442,102 577,123 562,207 420,177"
                fill="#c6e8e0"
                stroke="#6bbdb0"
                strokeWidth="2"
              />
              <polygon points="465,115 515,123 510,145 460,137" fill="#b3ddd4" />
              <polygon points="455,150 535,165 530,185 450,170" fill="#b3ddd4" />

              {/* labels */}
              <g fontSize="9.5" fontWeight="700" fill="#5d6b6b" textAnchor="middle">
                <text x="183" y="93">Step by Step School</text>
                <text x="108" y="192">Orion One 32</text>
                <text x="228" y="267">Logix Technova</text>
                <text x="305" y="370">Adobe Systems</text>
                <text x="527" y="219">ATS BOUQUET</text>
                <text x="677" y="70">Genesis Global School</text>
              </g>
              <g fontSize="8" fill="#8a9696" textAnchor="middle">
                <text x="150" y="107">Senior Wing</text>
                <text x="666" y="85">Gate 4</text>
                <text x="637" y="372">Jaypee Klassic</text>
              </g>
              <text
                x="160" y="342" fontSize="8.5" fontWeight="700" fill="#5d6b6b"
                textAnchor="middle" letterSpacing="1" transform="rotate(20 160 342)"
              >
                VEER KALYAN MARG
              </text>
              <text
                x="765" y="85" fontSize="8" fontWeight="700" fill="#6b7a7a"
                textAnchor="middle" transform="rotate(-58 765 85)"
              >
                JAYPEE WISHTOWN INTERNAL ROAD
              </text>

              {/* sector pill */}
              <g>
                <rect x="703" y="13" width="95" height="24" rx="12" fill="#fff" stroke="#e3e9e8" />
                <circle cx="718" cy="25" r="3.5" fill="#2a9d8f" />
                <text x="728" y="28.5" fontSize="8.5" fontWeight="700" fill="#2b3b3b">
                  SECTOR 132
                </text>
              </g>

              {/* office label */}
              <rect x="533" y="122" width="133" height="35" rx="17.5" fill="#0b4a54" />
              <text
                x="599.5" y="143.5" fontSize="10" fontWeight="800" fill="#fff"
                textAnchor="middle" letterSpacing="0.6"
              >
                CIRCULOGY OFFICE
              </text>

              {/* pin */}
              <ellipse cx="502" cy="192" rx="10" ry="3" fill="#000" opacity="0.12" />
              <path
                d="M502,190 C486,162 471,150 471,134 A31,31 0 1 1 533,134 C533,150 518,162 502,190 Z"
                fill="#0b4a54"
              />
              <circle cx="502" cy="146" r="12" fill="#7fd6c8" />
              <circle cx="502" cy="146" r="5" fill="#fff" />
            </svg>
          </div>

          {/* Info card */}
          <div className="absolute left-5 top-5 w-[253px] rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(11,79,92,0.12)] max-md:static max-md:m-5 max-md:w-auto md:bottom-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2a9d8f]">
              Visit Circulogy
            </p>
            <h3 className="mt-3 text-[21px] font-extrabold leading-tight text-[#0a2a2a]">
              Our Noida office
            </h3>
            <p className="mt-3 text-[11px] leading-[1.6] text-[#6b7b7b]">
              Located inside ATS Bouquet,
              <br />
              close to the Noida Expressway.
            </p>

            <div className="my-4 h-px bg-[#e6eceb]" />

            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0a2a2a]">
                  Office Address
                </p>
                <p className="mt-1.5 text-[10px] leading-[1.7] text-[#5c6f6f]">
                  307, Tower B, ATS Bouquet
                  <br />
                  Sector 132, Noida
                  <br />
                  Uttar Pradesh 201304
                </p>
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0a2a2a]">
                  Coordinates
                </p>
                <p className="mt-1.5 text-[10px] text-[#5c6f6f]">28.510086, 77.379890</p>
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0a2a2a]">
                  Nearby Landmark
                </p>
                <p className="mt-1.5 text-[10px] text-[#5c6f6f]">Jaypee Wishtown Internal Road</p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps?q=28.510086,77.379890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#0b4a54] py-3 pl-5 pr-2 text-[11px] font-bold text-white transition hover:bg-[#093d46]"
            >
              Open in Google Maps
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a9d8f] text-xs">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>


    </main>
  );
};

export default ContactPage;
