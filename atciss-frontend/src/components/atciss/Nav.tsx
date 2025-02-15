/** @jsxImportSource theme-ui */

import { Link } from "react-router"
import { Button, Flex, Grid, ThemeUIStyleObject } from "theme-ui"

import { FIR_SETTINGS } from "app/config"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { Clock } from "components/atciss/Clock"
import { selectActiveFir, setActiveFir } from "services/configSlice"
import { selectUser } from "app/auth/slice"
import { XmSelect } from "./XmSelect"

const Nav = ({ sx }: { sx?: ThemeUIStyleObject }) => {
  const dispatch = useAppDispatch()
  const activeFir = useAppSelector(selectActiveFir)
  const user = useAppSelector(selectUser)

  return (
    <Flex
      sx={{
        ...sx,
        backgroundColor: "primary",
        borderBottom: 2,
        borderBottomColor: "darkShadow",
        borderBottomStyle: "solid",
        p: 2,
        gap: 2,
        alignItems: "start",
      }}
    >
      <Clock />
      <Grid
        sx={{
          gap: ".5rem",
          gridTemplateColumns: "repeat(auto-fit, 6rem)",
          gridTemplateRows: "2rem 2rem",
          flex: "auto",
        }}
      >
        <Link to="">
          <Button variant="nav">ATIS-AFW</Button>
        </Link>
        <Link to="map">
          <Button variant="nav">Map</Button>
        </Link>
        <Link to="wx">
          <Button variant="nav">Wx</Button>
        </Link>
        <Link to="loa">
          <Button variant="nav">LOA</Button>
        </Link>
        <Link to="notam">
          <Button variant="nav">NOTAM</Button>
        </Link>
        {user?.admin && (
          <Link to="idvs">
            <Button variant="nav">IDVS</Button>
          </Link>
        )}
        <Link to="alias" sx={{ gridRow: "2/3" }}>
          <Button variant="nav">Alias</Button>
        </Link>
        {FIR_SETTINGS[activeFir].initials.enabled && (
          <Link to="initials" sx={{ gridRow: "2/3" }}>
            <Button variant="nav">Initials</Button>
          </Link>
        )}
        <Link to="windy" sx={{ gridRow: "2/3" }}>
          <Button variant="nav">Windy</Button>
        </Link>
        <Link to="ac" sx={{ gridRow: "2/3" }}>
          <Button variant="nav">A/C-Type</Button>
        </Link>
        <Link to="aip-ifr" sx={{ gridRow: "2/3" }}>
          <Button variant="nav">AIP IFR</Button>
        </Link>
        <Link to="aip-vfr" sx={{ gridRow: "2/3" }}>
          <Button variant="nav">AIP VFR</Button>
        </Link>
        {user?.admin && (
          <Link to="bookings" sx={{ gridRow: "2/3" }}>
            <Button variant="nav">Bookings</Button>
          </Link>
        )}
      </Grid>
      <Grid
        sx={{
          gap: ".5rem",
          gridTemplateColumns: "repeat(auto-fit, 6rem)",
          gridTemplateRows: "2rem 2rem",
          flex: "auto",
          justifyContent: "flex-end",
        }}
      >
        <XmSelect
          value={activeFir}
          onChange={(e) => dispatch(setActiveFir(e.target.value))}
          sx={{
            minWidth: "6rem",
            backgroundColor: "primary",
            color: "background",
          }}
        >
          {Object.keys(FIR_SETTINGS).map((fir) => (
            <option key={fir}>{fir}</option>
          ))}
        </XmSelect>
      </Grid>
    </Flex>
  )
}

export { Nav }
