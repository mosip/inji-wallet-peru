import testIDProps from '../shared/commonUtil';
import {fallbackDisplayColors, getTextColor} from './VC/common/VCUtils';
import VerifiedIcon from './VerifiedIcon';
import {Row, Text} from './ui';
import {Theme} from './ui/styleUtils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PendingIcon from './PendingIcon';
import {VCMetadata} from '../shared/VCMetadata';
import {displayType} from '../machines/Issuers/IssuersMachine';

export const VCVerification: React.FC<VCVerificationProps> = ({
  isVerified,
  display,
}) => {
  const {t} = useTranslation('VcDetails');
  const statusText = isVerified ? t('valid') : t('pending');
  const statusIcon = isVerified ? <VerifiedIcon /> : <PendingIcon />;
  return (
    <Row
      {...testIDProps('verified')}
      style={{
        alignItems: 'center',
      }}>
      <React.Fragment>
        {statusIcon}
        <Text
          testID="verificationStatus"
          color={getTextColor(display, fallbackDisplayColors.verificationText)}
          style={Theme.Styles.verificationStatus}>
          {statusText}
        </Text>
      </React.Fragment>
    </Row>
  );
};

export interface VCVerificationProps {
  isVerified: boolean;
  display: displayType | {};
}
