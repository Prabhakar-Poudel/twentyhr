import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

interface HeaderOptionsProps {
  fontSize: number
  setFontSize: (event: any) => void
}

const HeaderOptions = ({ fontSize, setFontSize }: HeaderOptionsProps) => {
  return (
    <div>
      <div className="dropdown ml-4">
        <button tabIndex={0} className="btn btn-outline btn-xs text-neutral-50">Configure</button>
        <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow ext-primary-content">
          <div className="card bg-base-100 shadow-xl pb-10">
            <div className="card-body">
              <Typography id="font-size-label">Font size</Typography>
              <Slider
                aria-labelledby="font-size-label"
                size="small"
                min={6}
                max={26}
                color="secondary"
                value={fontSize}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={setFontSize}
              />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderOptions
