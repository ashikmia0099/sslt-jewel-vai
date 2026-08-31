import { Hero } from "./(components)/(Home-Compoent)/Hero";
import Banner2 from "./(components)/(Home-Compoent)/Banner2";
import Vission_Mission_Objective from "./(components)/(Home-Compoent)/Vission_Mission_Objective";
import Mission_Three_banner from "./(components)/(Home-Compoent)/Mission_Three_banner";
import Pesident_General_Speach_Section from "./(components)/(Home-Compoent)/Pesident_General_Speach_Section";
import PopularMedicalDesies from "./(components)/(Home-Compoent)/popularMedicalDesies";
import HearingandHealthCare from "./(components)/(Home-Compoent)/hearingAndHealthcare";
import CommunityEvent from "./(components)/(Home-Compoent)/CommunityEvent";




export const metadata = {
  title: 'SSLT | HOME',
  description: 'This is the home page',
}


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Banner2></Banner2>
      <Vission_Mission_Objective></Vission_Mission_Objective>
      <Mission_Three_banner></Mission_Three_banner>
      <PopularMedicalDesies></PopularMedicalDesies>
      <HearingandHealthCare/>
      <Pesident_General_Speach_Section></Pesident_General_Speach_Section>
      <CommunityEvent></CommunityEvent>
    </div>
  );
}
