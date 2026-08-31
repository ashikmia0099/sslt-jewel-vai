import React from 'react'
import Donation_Banner from './DonationJsx/Donation_Banner'
import Donation_Card from './DonationJsx/Donation_Card'
import Donation_Question from './DonationJsx/Donation_Question'

export default function page() {
  return (
    <div>

        <Donation_Banner></Donation_Banner>
        <Donation_Card></Donation_Card>
        <Donation_Question></Donation_Question>
    </div>
  )
}
