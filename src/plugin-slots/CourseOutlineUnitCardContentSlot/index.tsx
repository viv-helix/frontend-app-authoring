import { PluginSlot } from '@openedx/frontend-plugin-framework';
import React from 'react';
import type { XBlock } from '@src/data/types';

export interface CourseOutlineUnitCardContentSlotProps {
  unit: XBlock;
  subsection: XBlock;
  section: XBlock;
  getTitleLink: (locator: string) => string;
}

const CourseOutlineUnitCardContentSlot = ({
  unit,
  subsection,
  section,
  getTitleLink,
}: CourseOutlineUnitCardContentSlotProps) => (
  <PluginSlot
    id="org.openedx.frontend.authoring.course_outline_unit_card_content.v1"
    idAliases={['course_outline_unit_card_content_slot']}
    pluginProps={{
      unit,
      subsection,
      section,
      getTitleLink,
    }}
  />
);

export default CourseOutlineUnitCardContentSlot;
