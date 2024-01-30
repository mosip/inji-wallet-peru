import {useSelector} from '@xstate/react';
import {useContext} from 'react';
import {
  BackupRestoreEvents,
  selectIsBackUpRestoring,
  selectIsBackUpRestoreFailure,
  selectIsBackUpRestoreSuccess,
} from '../../machines/backupRestore';
import {GlobalContext} from '../../shared/GlobalContext';
import {VcEvents} from '../../machines/vc';

export function useBackupRestoreScreen() {
  const {appService} = useContext(GlobalContext);
  const backupRestoreService = appService.children.get('backupRestore');
  const vcService = appService.children.get('vc');

  return {
    isBackUpRestoring: useSelector(
      backupRestoreService,
      selectIsBackUpRestoring,
    ),
    isBackUpRestoreSuccess: useSelector(
      backupRestoreService,
      selectIsBackUpRestoreSuccess,
    ),
    isBackUpRestoreFailure: useSelector(
      backupRestoreService,
      selectIsBackUpRestoreFailure,
    ),
    BACKUP_RESTORE: () => {
      backupRestoreService.send(BackupRestoreEvents.BACKUP_RESTORE());
    },
    EXTRACT_DATA: () => {
      backupRestoreService.send(BackupRestoreEvents.EXTRACT_DATA());
    },
    DISMISS: () => {
      backupRestoreService.send(BackupRestoreEvents.DISMISS());
    },
    OK: () => {
      backupRestoreService.send(BackupRestoreEvents.OK());
      vcService?.send(VcEvents.REFRESH_MY_VCS());
    },
  };
}
