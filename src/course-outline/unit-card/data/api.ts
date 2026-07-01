import type { UserPartitionInfoTypes, UserPartitionTypes } from '@src/data/types';
import { getCourseContainerChildren } from '@src/course-unit/data/api';
import type { XBlockActionsTypes } from '@src/course-unit/xblock-container-iframe/types';
import { normalizeUserPartitionInfo } from '@src/course-unit/xblock-container-iframe/utils';

export type UnitComponentActions = Pick<
XBlockActionsTypes,
'canCopy' | 'canDuplicate' | 'canDelete' | 'canMove' | 'canManageAccess'
>;

export interface UnitComponent {
  blockId: string;
  blockType: string;
  displayName: string;
  userPartitionInfo?: UserPartitionInfoTypes;
  userPartitions?: UserPartitionTypes[];
  actions: UnitComponentActions;
}

// Full response from the unit_handler endpoint
export interface UnitHandlerData {
  unitId: string;
  displayName: string;
  components: UnitComponent[];
}

function mapContainerChildToUnitComponent(child: {
  blockId: string;
  blockType: string;
  name: string;
  userPartitionInfo?: UserPartitionInfoTypes;
  userPartitions?: UserPartitionTypes[];
  actions?: Partial<UnitComponentActions>;
}): UnitComponent {
  return {
    blockId: child.blockId,
    blockType: child.blockType,
    displayName: child.name,
    userPartitionInfo: normalizeUserPartitionInfo(child),
    userPartitions: child.userPartitions,
    actions: {
      canCopy: child.actions?.canCopy ?? false,
      canDuplicate: child.actions?.canDuplicate ?? false,
      canDelete: child.actions?.canDelete ?? false,
      canMove: child.actions?.canMove ?? false,
      canManageAccess: child.actions?.canManageAccess ?? false,
    },
  };
}

/**
 * Get unit components and their available actions via the container children API
 * (same source as the Unit page component menus).
 */
export async function getUnitHandler(unitId: string): Promise<UnitHandlerData> {
  const containerData = await getCourseContainerChildren(unitId);
  return {
    unitId,
    displayName: containerData.displayName,
    components: containerData.children.map(mapContainerChildToUnitComponent),
  };
}
