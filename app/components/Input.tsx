import classNames from "classnames";
import { useField } from "remix-validated-form";

export const Input = ({
  name,
  title,
  id,
}: {
  name: string;
  title?: string;
  id?: string;
}) => {
  const field = useField(name);
  return (
    <div className={"flex w-full flex-col"}>
      <label htmlFor={id ? id : name}>{title}</label>
      <input
        {...field.getInputProps()}
        className={classNames("rounded-md border-2", {
          "border-2 !border-red-500": field.error,
        })}
        name={name}
        id={id ? id : name}
        onClick={() => {
          field.clearError();
        }}
        onChange={() => {
          if (field.error) field.clearError();
        }}
      />
      <div className="text-red-500">{field.error}</div>
    </div>
  );
};
