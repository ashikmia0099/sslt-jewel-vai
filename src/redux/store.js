import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./features/Home/HeroSlice";
import { secondBannerReducer } from './features/Home/SecondHeroSlice'
import { gallaryReducer } from "./features/gallary/gallarySlice";
import { contactReducer } from "./features/contact/contactSlice";
import { donationAmountReducer } from "./features/donation/donationTextandAmountSlice";
import { donationMediumReducer } from "./features/donation/donationMediumSlice";
import { donationFAQReducer } from "./features/donation/donationFAQSlice";
import { newsReducer } from "./features/news/newsSlice";
import { aboutHeroReducer } from "./features/about/aboutHeroSlice";
import { aboutThreeBannerReducer } from "./features/about/aboutThreeBannerSlice";
import { aboutlastBannerReducer } from "./features/about/aboutLastBanner";
import { userReducer } from "./features/Auth/authSlice";
import { MissonVissionObjectReducer } from "./features/Home/missionVissionObjectSlice";
import { HomeThreeBannerReducer } from "./features/Home/homeThreeBannerSlice";
import { HearingAndHealthCareReducer } from "./features/Home/hearingAndHealthCareSlice";
import { CommunicationAndHealthCareReducer } from "./features/Home/communicationAndHealthCareSlice";
import { communityReducer } from "./features/Home/communityEventSlice";
import { foundingMemberReducer } from "./features/Home/founderMessageSlice";
import { footerReducer } from "./features/footer/footerSlice";
import { MedicalDesiesReducer } from "./features/Home/popularMedicalDesiesSlice";
import { registerReducer } from "./features/Auth/registerSlice";
import { loginReducer } from "./features/Auth/loginSlice";


export const store = configureStore(({
    
    reducer: {

        user: userReducer,
        register : registerReducer,
        login : loginReducer,
        banner: heroReducer,
        secondBanner: secondBannerReducer,
        misssionVissionObject: MissonVissionObjectReducer,
        medicalDesies: MedicalDesiesReducer,
        homeThreeBanner: HomeThreeBannerReducer,
        hearingAndHealthCare: HearingAndHealthCareReducer,
        communicationAndHealthCare: CommunicationAndHealthCareReducer,
        community: communityReducer,
        foundingMember: foundingMemberReducer,
        gallary: gallaryReducer,
        contact: contactReducer,
        donationAmount: donationAmountReducer,
        donationMedium: donationMediumReducer,
        donationFAQ: donationFAQReducer,
        news: newsReducer,
        abouthero: aboutHeroReducer,
        aboutThreeBanner: aboutThreeBannerReducer,
        aboutLastBanner: aboutlastBannerReducer,
        footer: footerReducer,
    }
}))

