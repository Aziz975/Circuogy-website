
import './About.css'
import CriticalMineralsHero from "../About/CriticalMineralsHero.jsx";
import OurFounders from "../About/OurFounders.jsx";
import WorkWithUs from "../About/WorkWithUs.jsx";
import OurJourney from '../About/OurJourney.jsx';
import WhatDo from '../About/WeDo.jsx';






function About() {
  return (
    <>

      {/* part 1 */}

     <CriticalMineralsHero></CriticalMineralsHero>

      {/* part2  */}

     <WhatDo></WhatDo>
   

   <OurJourney></OurJourney>

    {/* part 3 */}

     <OurFounders></OurFounders>


    {/*   part 4 */}
     <WorkWithUs></WorkWithUs>




    </>
  );
}

export default About;