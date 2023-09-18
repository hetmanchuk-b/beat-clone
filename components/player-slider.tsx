import { FC } from 'react';
import {Slider} from "@/components/ui/slider";

interface PlayerSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const PlayerSlider: FC<PlayerSliderProps> = ({value = 1, onChange}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
  }

  return (
    <Slider
      defaultValue={[0.5]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.05}
      aria-label={'Volume'}
    />
  )
}

export default PlayerSlider
