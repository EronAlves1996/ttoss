import { FieldName, FieldValues, useFormContext } from 'react-hook-form';
import { HelpText } from '@ttoss/ui';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

export const ErrorMessage = <TFieldValues extends FieldValues = FieldValues>({
  name,
  disabled,
}: {
  name: FieldName<TFieldValues>;
  disabled?: boolean;
}) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  return (
    <HookFormErrorMessage
      errors={errors}
      name={name as any}
      as={<HelpText negative disabled={disabled} />}
    />
  );
};
