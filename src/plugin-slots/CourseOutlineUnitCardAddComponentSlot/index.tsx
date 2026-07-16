import { PluginSlot } from '@openedx/frontend-plugin-framework';
import React from 'react';
import type { XBlock } from '@src/data/types';

export interface CourseOutlineUnitCardAddComponentSlotProps {
  unit: XBlock;
  subsection: XBlock;
  section: XBlock;
}

const CourseOutlineUnitCardAddComponentSlot = ({
  unit,
  subsection,
  section,
}: CourseOutlineUnitCardAddComponentSlotProps) => (
  <PluginSlot
    id="org.openedx.frontend.authoring.course_outline_unit_card_add_component.v1"
    idAliases={['course_outline_unit_card_add_component_slot']}
    pluginProps={{
      unit,
      subsection,
      section,
    }}
  />
);

export default CourseOutlineUnitCardAddComponentSlot;
