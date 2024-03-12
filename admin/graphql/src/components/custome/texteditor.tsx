import cn from 'classnames';
import React, { TextareaHTMLAttributes, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

// import ReactQuill from 'react-quill';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  shadow?: boolean;
  required?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  disabled?: boolean;
  getnewvaluse?:any;
  setnewValue?:any;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {

  const {
    className,
    label,
    name,
    error,
    required,
    getnewvaluse,
    setnewValue,
  } = props;

  
  const [value, setValue] = useState(getnewvaluse);

  const updatevalue = (e:any) =>{
    setValue(e)
    setnewValue('description',e,{ shouldValidate: true })
  }

  return (
    <div className={twMerge(className)}>
      {label && (
        <label className="mb-3 block text-sm font-semibold leading-none text-body-dark">
          {label}
          {required ? <span className="ml-0.5 text-red-500">*</span> : ''}
        </label>
      )}
      <ReactQuill 
        id={name}
        theme="snow" 
        value={value}
        onChange={updatevalue}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote','code'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { script: 'sub'}, 
              { script: 'super' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            [
              { 'color': [] }, 
              { 'background': [] },
              { 'font': [] },
              { 'align': [] }
            ],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'code',
          'list',
          'bullet',
          'sub',
          'super',
          'indent',
          'link',
          'image',
          'color',
          'background',
          'font',
          'align'
        ]}
      />
      {error && (
        <p className="my-2 text-xs text-red-500 ltr:text-left rtl:text-right">
          {error}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
