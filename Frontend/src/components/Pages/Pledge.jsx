import React from 'react'
import PledgeHero from '../Pledge/PledgeHero'
import PledgeForm from '../Pledge/PLedgeForm'
import PledgeType from '../Pledge/PledgeType'


const Pledge = () => {
  return (
<>
  {/* Part 1 */}
 <PledgeHero></PledgeHero>

 <PledgeType></PledgeType>

  {/* part 2 */}
  <PledgeForm></PledgeForm>
  
</>
  )
}

export default Pledge
