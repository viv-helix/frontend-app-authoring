# CourseOutlineUnitCardContentSlot

### Slot ID: `org.openedx.frontend.authoring.course_outline_unit_card_content.v1`

### Slot ID Aliases
* `course_outline_unit_card_content_slot`

### Plugin Props:

* `unit` - object (the unit XBlock)
* `subsection` - object (the parent subsection XBlock)
* `section` - object (the parent section XBlock)
* `getTitleLink` - `(locator: string) => string` (builds the link to a unit/component)

## Description

This slot renders inside the Unit card on the Course Outline page, directly below the
unit status line. It is intended to host an expanded view of the unit's contents
(for example, an inline, expandable list of the unit's components).

The slot is empty by default.

## Example

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const UnitContents = ({ unit }) => (
  <div>Components for {unit.displayName}</div>
);

const config = {
  pluginSlots: {
    'org.openedx.frontend.authoring.course_outline_unit_card_content.v1': {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'unit-expanded-contents',
            type: DIRECT_PLUGIN,
            RenderWidget: UnitContents,
          },
        },
      ],
    },
  },
};

export default config;
```
