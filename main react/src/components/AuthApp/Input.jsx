/* eslint-disable react/prop-types */
import { css, cx } from '@emotion/css';

export function Input({ children, type, className = '' }) {
  return (
    <div
      className={cx(
        css`
          padding: 12px 0;
        `,
        `${className}`,
      )}
    >
      <div
        className={cx(
          css`
            padding: 7px 8px;
            border-radius: 4px;
            border: 1px solid #d0d0d0;
          `,
          'd-flex flex-column',
        )}
      >
        <span
          className={css`
            font-size: 14px;
            color: #d0d0d0;
            font-weight: 400;
          `}
        >
          {children}
        </span>
        <input
          className={css`
            background: none;
            border: none;
            &:focus {
              outline: none;
            }
          `}
          type={type}
        ></input>
      </div>
    </div>
  );
}

export function FormGroup({
  className = '',
  label = '',
  children,
  validityClassName = '',
}) {
  return (
    <div
      className={cx(
        css`
          padding: 12px 0;
        `,
        `${className} ${validityClassName}`,
      )}
    >
      <div
        className={cx(
          css`
            padding: 7px 8px;
            border-radius: 4px;
            border: 1px solid #d0d0d0;
            background: none;
          `,
          `d-flex flex-column ${validityClassName} form-control`,
        )}
      >
        <span
          className={css`
            font-size: 14px;
            color: #d0d0d0;
            font-weight: 400;
          `}
        >
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

export function CustomInput({
  type = 'text',
  name,
  id,
  onChange,
  onBlur,
  value,
  placeholder,
  className,
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={`${css`
        background: none;
        border: none;
        &:focus {
          outline: none;
        }
      `} ${className}`}
    />
  );
}
//----Text area----
export function CustomAreaInput({
  type = 'text',
  name,
  id,
  onChange,
  onBlur,
  value,
  placeholder,
  className,
}) {
  return (
    <textarea
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={`${css`
        background: none;
        border: none;
        &:focus {
          outline: none;
        }
      `} ${className}`}
    />
  );
}
export function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={css`
        font-size: 14px;
        color: #d0d0d0;
        font-weight: 400;
      `}
    >
      {children}
    </label>
  );
}
