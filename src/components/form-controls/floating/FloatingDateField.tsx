'use client';

import {
  addMonths, addYears, format, parse, setMonth, setYear, subMonths, subYears
} from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { FloatingInputController } from './InputController';

export interface DateFieldProps {
  name: string;
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  floatingLabel?: boolean;
  fromYear?: number;
  toYear?: number;
  disableFuture?: boolean;
  forcelightmode?: boolean;
  error?: string;
}

export const FloatingDateField = forwardRef<HTMLInputElement, DateFieldProps>((
  { value, label, onChange, fromYear, toYear, disableFuture, forcelightmode = false, ...rest }, ref) => {

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value ? format(value, "dd-MM-yyyy") : "");
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;

  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const [cursorDate, setCursorDate] = useState<Date>(value || new Date());

  useEffect(() => {
    if (value) {
      setInputValue(format(value, "dd-MM-yyyy"));
      setCursorDate(value);
    } else {
      setInputValue("");
      setCursorDate(new Date());
    }
  }, [value]);

  const handleDateChange = (date: Date | undefined) => {
    try {
      if (date) {
        const formattedDate = format(date, "dd-MM-yyyy");
        setInputValue(formattedDate);
        onChange(date);
      } else {
        setInputValue("");
        onChange(null);
      }
    } catch (error) {
      console.error("Error handling date change:", error);
    } finally {
      setOpen(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let val = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);

      let day = val.slice(0, 2);
      let month = val.slice(2, 4);
      let year = val.slice(4, 8);

      if (day.length === 2) {
        if (!["0", "1", "2", "3"].includes(day[0]) || parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
          day = "0" + (day[1] === "0" ? "1" : day[1]);
        }
      }

      if (month.length === 2) {
        if (!["0", "1"].includes(month[0]) || parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
          month = "0" + (month[1] === "0" ? "1" : month[1]);
        }
      }

      if (year.length > 0 && !["1", "2"].includes(year[0])) {
        year = "2" + year.slice(1);
      }

      let formattedValue = [day, month, year].filter(Boolean).join("-");
      setInputValue(formattedValue);

      if (day.length === 2 && month.length === 2 && year.length === 4) {
        const parsedDate = parse(formattedValue, "dd-MM-yyyy", new Date());

        if (disableFuture && parsedDate > new Date()) {
          onChange(null);
          return;
        }

        const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
        const maxDaysInMonth: { [key: number]: number } = {
          1: 31, 2: isLeapYear(parsedDate.getFullYear()) ? 29 : 28, 3: 31, 4: 30, 5: 31, 6: 30,
          7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31,
        };

        if (parsedDate.getDate() > maxDaysInMonth[parsedDate.getMonth() + 1]) {
          day = maxDaysInMonth[parsedDate.getMonth() + 1].toString().padStart(2, "0");
          formattedValue = [day, month, year].join("-");
          setInputValue(formattedValue);
        }
        onChange(parsedDate);
        setCursorDate(parsedDate);
      } else {
        onChange(null);
      }
    } catch (error) {
      console.error("Error parsing date input:", error);
      onChange(null);
    }
  };

  const handlePrevious = () => {
    if (view === 'days') setCursorDate(subMonths(cursorDate, 1));
    if (view === 'months') setCursorDate(subYears(cursorDate, 1));
    if (view === 'years') setCursorDate(subYears(cursorDate, 12));
  };

  const handleNext = () => {
    if (view === 'days') setCursorDate(addMonths(cursorDate, 1));
    if (view === 'months') setCursorDate(addYears(cursorDate, 1));
    if (view === 'years') setCursorDate(addYears(cursorDate, 12));
  };

  const handleViewToggle = () => {
    if (view === 'days') setView('months');
    else if (view === 'months') setView('years');
    else setView('days');
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCursorDate(setMonth(cursorDate, monthIndex));
    setView('days');
  };

  const handleYearSelect = (year: number) => {
    setCursorDate(setYear(cursorDate, year));
    setView('months');
  };

  // Calculate dynamic year grid
  const currentYear = cursorDate.getFullYear();
  const startYear = currentYear - (currentYear % 12);
  const yearsGrid = Array.from({ length: 12 }, (_, i) => startYear + i);

  let hiddenDates: { before?: Date; after?: Date } | undefined = undefined;

  if (fromYear || toYear) {
    hiddenDates = {};
    if (fromYear) hiddenDates.before = new Date(fromYear, 0, 1);
    if (toYear) hiddenDates.after = new Date(toYear, 11, 31);
  }

  const lightModeContent = forcelightmode ? "dark:bg-white dark:text-slate-900 border-slate-200" : "";

  return (
    <Popover
      modal={false}
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setView('days');
      }}
    >
      <FloatingInputController
        disableRHF
        ref={ref}
        type='number'
        name={rest.name}
        label={label}
        placeholder='Enter date'
        value={inputValue}
        onChange={handleInputChange}
        pattern={datePattern.source}
        error={rest.error}
        aria-label={rest.name}
        rightIcon={(
          <PopoverTrigger disabled={rest.disabled}
            onClick={() => setOpen(true)}
            aria-label="Toggle Calendar"
            className={cn("size-8 cursor-pointer flex justify-center items-center text-slate-400 hover:text-slate-600 transition-colors",
              rest.disabled && "text-muted-foreground pointer-events-none",
            )}
          >
            <CalendarIcon aria-label="Open Calendar" size={16} />
          </PopoverTrigger>
        )}
      />

      <PopoverContent className={cn("p-3 w-60", lightModeContent)} align="end" onOpenAutoFocus={(e) => e.preventDefault()}>

        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" className="size-8 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="ghost" className="h-8 font-medium text-sm" onClick={handleViewToggle}>
            {view === 'days' && format(cursorDate, "MMMM yyyy")}
            {view === 'months' && format(cursorDate, "yyyy")}
            {view === 'years' && `${yearsGrid[0]} - ${yearsGrid[11]}`}
          </Button>

          <Button variant="outline" className="size-8 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {view === 'days' && (
          <Calendar
            mode="single"
            selected={value || undefined}
            month={cursorDate}
            onMonthChange={setCursorDate}
            onSelect={handleDateChange}
            disabled={disableFuture ? (date) => date > new Date() : undefined}
            className="p-0 [&_nav]:hidden w-full"
          />
        )}

        {view === 'months' && (
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }, (_, i) => {
              const isSelected = value?.getMonth() === i && value?.getFullYear() === cursorDate.getFullYear();
              return (
                <Button
                  key={i}
                  variant={isSelected ? "default" : "ghost"}
                  className="h-10 w-full font-normal"
                  onClick={() => handleMonthSelect(i)}
                >
                  {format(setMonth(new Date(), i), "MMM")}
                </Button>
              )
            })}
          </div>
        )}

        {view === 'years' && (
          <div className="grid grid-cols-3 gap-1">
            {yearsGrid.map((year) => {
              const isSelected = value?.getFullYear() === year;
              const isOutOfRange = (fromYear && year < fromYear) || (toYear && year > toYear) || (disableFuture && year > new Date().getFullYear());

              return (
                <Button
                  key={year}
                  variant={isSelected ? "default" : "ghost"}
                  disabled={isOutOfRange}
                  className="h-10 w-full font-normal"
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </Button>
              )
            })}
          </div>
        )}

      </PopoverContent>
    </Popover>
  );
}
);