import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import React from 'react';

// Select Component Wrapper
export const Select: React.FC<{ children: React.ReactNode; value?: string; onValueChange: (value: string) => void }> = ({
  children,
  value,
  onValueChange,
}) => {
  return <RadixSelect.Root value={value} onValueChange={onValueChange}>{children}</RadixSelect.Root>;
};

// Select Trigger
export const SelectTrigger: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  return (
    <RadixSelect.Trigger
      className="flex justify-between items-center focus:border-primary shadow-sm px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary w-full text-sm focus:outline-none"
      aria-label={placeholder}
    >
      <RadixSelect.Value placeholder={placeholder} />
      <ChevronDown className="w-4 h-4 text-gray-600" />
    </RadixSelect.Trigger>
  );
};

// Select Content
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RadixSelect.Content className="z-10 shadow-lg border rounded-lg">
      <RadixSelect.ScrollUpButton className="p-1 text-gray-600">
        <ChevronDown className="w-4 h-4 rotate-180" />
      </RadixSelect.ScrollUpButton>
      <RadixSelect.Viewport className="p-2">{children}</RadixSelect.Viewport>
      <RadixSelect.ScrollDownButton className="p-1 text-gray-600">
        <ChevronDown className="w-4 h-4" />
      </RadixSelect.ScrollDownButton>
    </RadixSelect.Content>
  );
};

// Select Item
export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  return (
    <RadixSelect.Item
      value={value}
      className="flex items-center hover:bg-primary focus:bg-primary px-3 py-2 rounded-md text-sm hover:text-white focus:text-white cursor-pointer"
    >
      <RadixSelect.ItemIndicator className="left-1 absolute">
        <Check className="w-4 h-4" />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
};

// Select Value
export const SelectValue = RadixSelect.Value;
