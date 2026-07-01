# CourseOutlineUnitCardAddComponentSlot

### Slot ID: `org.openedx.frontend.authoring.course_outline_unit_card_add_component.v1`

### Slot ID Aliases
* `course_outline_unit_card_add_component_slot`

### Plugin Props:

* `unit` - object (the unit XBlock the component would be added to)
* `subsection` - object (the parent subsection XBlock)
* `section` - object (the parent section XBlock)

## Description

This slot renders inside the Unit card on the Course Outline page, after the unit
contents. It is intended to host an "add component" affordance that lets authors
create a new component in the unit without leaving the outline.

The slot is empty by default.

## Example

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { Button } from '@openedx/paragon';

const AddComponent = ({ unit }) => (
  <Button onClick={() => {/* create a component in unit.id */}}>
    New component
  </Button>
);

const config = {
  pluginSlots: {
    'org.openedx.frontend.authoring.course_outline_unit_card_add_component.v1': {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'outline-add-component',
            type: DIRECT_PLUGIN,
            RenderWidget: AddComponent,
          },
        },
      ],
    },
  },
};

export default config;
```
