'use client';

import * as React from 'react';
// Eliminar la línea que causa la importación circular
// import { OTPInput, OTPInputContext } from '@/components/ui/input-otp';
import { Dot } from 'lucide-react';

import { cn } from '@/lib/utils';

// Definir OTPInput y OTPInputContext directamente en este archivo
interface OTPInputProps {
  length: number;
  children: (props: {
    inputProps: (index: number) => React.InputHTMLAttributes<HTMLInputElement>;
    state: { values: string[]; activeIndex: number };
  }) => React.ReactNode;
}

interface OTPInputContextType {
  values: string[];
  activeIndex: number;
}

const OTPInputContext = React.createContext<OTPInputContextType | null>(null);

function OTPInput({ length, children, ...props }: OTPInputProps) {
  const [values, setValues] = React.useState(Array(length).fill(''));
  const [activeIndex, setActiveIndex] = React.useState(0);

  const inputProps = (index: number) => ({
    value: values[index],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = e.target.value;
      setValues(newValues);
      if (e.target.value && index < length - 1) {
        setActiveIndex(index + 1);
      }
    },
    onFocus: () => setActiveIndex(index),
  });

  return (
    <OTPInputContext.Provider value={{ values, activeIndex }}>
      {children({ inputProps, state: { values, activeIndex } })}
    </OTPInputContext.Provider>
  );
}

export function InputOTP({ length = 6, ...props }: OTPInputProps) {
  return (
    <OTPInput length={length} {...props}>
      {({ inputProps, state }) => (
        <div className="flex space-x-2">
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-10 h-10 flex items-center justify-center border rounded',
                state.activeIndex === index ? 'border-primary' : 'border-muted'
              )}
            >
              <input
                {...inputProps(index)}
                className="w-full h-full text-center bg-transparent outline-none"
              />
              {state.values[index] === undefined && (
                <Dot className="absolute w-2 h-2 text-muted" />
              )}
            </div>
          ))}
        </div>
      )}
    </OTPInput>
  );
}
