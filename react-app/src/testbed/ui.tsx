import React from 'react';

type SelectBoxProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    title: string
    value: string
  }>
};

const SelectBox: React.FC<SelectBoxProps> = ({ label, value, onChange, options }) => {
  return (
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(o => <option value={o.value}>{o.title}</option>)}
      </select>
  )
}

type OptionProps = {
  value: string;
  text: string;
  isSelected: boolean;
};

const Option: React.FC<OptionProps> = ({ value, isSelected, text }) => {
  return (
    <option value={value} className={`${isSelected ? 'bg-gray-100' : ''}`}>
      {text}
    </option>
  );
};

export { SelectBox, Option };
