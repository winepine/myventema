import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import Progress from 'components/progress-box/progress-box';
import { FormattedMessage } from 'react-intl';

const RenderProgressStatus = ({ progressData, progressStatus, orderStatus }) => {
  if (orderStatus === "cancelled" || orderStatus === "deliverydenied" || orderStatus === "failed") return (
    <Alert status="error">
      <AlertIcon />
      Η παραγγελία σου ακυρώθηκε
    </Alert>
  )

  return <Progress data={progressData} status={progressStatus} />
}

export default RenderProgressStatus
