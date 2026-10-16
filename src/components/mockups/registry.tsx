import type { ComponentType } from 'react'
import type { Crop, ScreenKey } from '@/lib/features'
import { ScaledFrame } from '@/components/ScaledFrame'
import { APP_H, APP_W } from './AppFrame'
import {
  ActivitiesScreen,
  CalendarScreen,
  ContactScreen,
  DashboardScreen,
  MailScreen,
  PipelineScreen,
} from './screens'
import {
  ContactsListScreen,
  DealSheetScreen,
  RecordingsScreen,
} from './screens2'

export const SCREENS: Record<ScreenKey, ComponentType> = {
  dashboard: DashboardScreen,
  pipeline: PipelineScreen,
  dealSheet: DealSheetScreen,
  contacts: ContactsListScreen,
  contactProfile: ContactScreen,
  activities: ActivitiesScreen,
  calendar: CalendarScreen,
  mail: MailScreen,
  recordings: RecordingsScreen,
}

/** Schermata intera, scalata alla larghezza disponibile. */
export function Screen({ screen }: { screen: ScreenKey }) {
  const S = SCREENS[screen]
  return (
    <ScaledFrame width={APP_W} height={APP_H}>
      <S />
    </ScaledFrame>
  )
}

/** Primo piano: inquadra solo il rettangolo `crop` della schermata, a misura reale. */
export function CroppedScreen({
  screen,
  crop,
}: {
  screen: ScreenKey
  crop: Crop
}) {
  const S = SCREENS[screen]
  return (
    <ScaledFrame width={crop.w} height={crop.h}>
      <div
        className="bg-background shadow-window overflow-hidden rounded-[14px]"
        style={{ width: crop.w, height: crop.h }}
      >
        <div
          style={{
            transform: `translate(${-crop.x}px, ${-crop.y}px)`,
            width: APP_W,
            height: APP_H,
          }}
        >
          <S />
        </div>
      </div>
    </ScaledFrame>
  )
}
