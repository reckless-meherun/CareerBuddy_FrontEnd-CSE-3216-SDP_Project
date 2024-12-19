import React, { useContext } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '../ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from './ResumeInfoContext';

function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const onColorSelect = (selectedColor) => { // Renamed parameter for clarity
        console.log(selectedColor); // Logs the correct color
        setResumeInfo({
            ...resumeInfo,
            themeColor: selectedColor
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 bg-white">
                    <LayoutGrid />
                    Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 h-40">
                <h2 className='mb-2 text-sm'>Select Theme</h2>
                <div className='grid grid-cols-5 gap-2'>
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className='h-5 w-5 rounded-sm cursor-pointer border hover:border-black'
                            style={{ background: color }}
                            onClick={() => onColorSelect(color)} // Correct: Passing 'color'
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;