'use client'

import { useParams } from 'next/navigation'
import BannerDynamicData from './banner_dynamic_data'
import Communication_Hearing_Data from './Communication_Hearing_Data'
import Meidcal_Desis_Dynamic_Data from './Meidcal_Desis_Dynamic_Data'
import Vission_mission_object_dynamic_data from './Vission_mission_object_dynamic_data'

export default function DynamicPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id

  return (
    <div className="p-0">
      <BannerDynamicData id={id} />
      <Communication_Hearing_Data id={id} />
      <Meidcal_Desis_Dynamic_Data id={id} />
      <Vission_mission_object_dynamic_data id={id} />
    </div>
  )
}
