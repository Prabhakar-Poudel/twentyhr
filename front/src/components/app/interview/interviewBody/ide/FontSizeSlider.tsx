import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

interface Props {
  fontSize: number
  onChange: (event: Event, value: any) => void
}

function FontSizeSlider({ fontSize, onChange }: Props) {
  return (
    <>
      <Typography id="font-size-label">Font size</Typography>
      <Slider
        aria-labelledby="font-size-label"
        size="small"
        min={10}
        max={30}
        value={fontSize}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={onChange}
      />
    </>
  )
}

export default FontSizeSlider
