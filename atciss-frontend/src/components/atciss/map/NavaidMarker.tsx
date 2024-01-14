import L, { LatLngExpression } from "leaflet"
import { ReactElement, ReactNode } from "react"
import { createPortal } from "react-dom"
import { Marker, Tooltip } from "react-leaflet"
import { Box, Flex, Text } from "theme-ui"
import { Navaid } from "types/dfs"

export const ICONS: { [key: string]: ReactElement } = {
  rnav: (
    <g>
      <path
        fill="#FFFFFF"
        d="M32,27.4l10.5,18.1h-21L32,27.4 M32,9.4L5.9,54.6h52.1L32,9.4L32,9.4z"
      />
      <path d="M32,21.4l15.7,27.1H16.3L32,21.4 M32,9.4L5.9,54.6h52.1L32,9.4L32,9.4z" />
      <path
        fill="#FFFFFF"
        d="M32,9.4l26.1,45.1H5.9L32,9.4 M32,3.4l-2.6,4.5L3.3,53.1l-2.6,4.5h5.2h52.1h5.2l-2.6-4.5L34.6,7.9L32,3.4 L32,3.4z"
      />
    </g>
  ),
  dme: (
    <>
      <g>
        <path
          fill="#FFFFFF"
          d="M48.3,20v25H15.7V20H48.3 M58.3,10H5.7v45h52.7V10L58.3,10z"
        />
        <path d="M52.3,16v33H11.7V16H52.3 M58.3,10H5.7v45h52.7V10L58.3,10z" />
        <path
          fill="#FFFFFF"
          d="M58.3,10v45H5.7V10H58.3 M61.3,7h-3H5.7h-3v3v45v3h3h52.7h3v-3V10V7L61.3,7z"
        />
      </g>
      <g>
        <path
          fill="#FFFFFF"
          d="M31.5,26.7c3.2,0,5.8,2.6,5.8,5.8c0,3.2-2.6,5.8-5.8,5.8c-3.2,0-5.8-2.6-5.8-5.8 C25.7,29.3,28.3,26.7,31.5,26.7 M31.5,23.7c-4.8,0-8.8,3.9-8.8,8.8s3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8S36.3,23.7,31.5,23.7L31.5,23.7 z"
        />
        <circle cx="31.5" cy="32.5" r="5.8" />
      </g>
    </>
  ),
  vor: (
    <>
      <g>
        <path
          fill="#FFFFFF"
          d="M39.1,19.9l7.2,12.5l-7.2,12.5H24.7l-7.2-12.5l7.2-12.5H39.1 M44.9,9.9h-26L6,32.4l13,22.5h26l13-22.5 L44.9,9.9L44.9,9.9z"
        />
        <path d="M41.4,15.9l9.5,16.5l-9.5,16.5h-19l-9.5-16.5l9.5-16.5H41.4 M44.9,9.9h-26L6,32.4l13,22.5h26l13-22.5L44.9,9.9L44.9,9.9z" />
      </g>
      <g>
        <path
          fill="#FFFFFF"
          d="M31.5,26.7c3.2,0,5.8,2.6,5.8,5.8c0,3.2-2.6,5.8-5.8,5.8c-3.2,0-5.8-2.6-5.8-5.8 C25.7,29.3,28.3,26.7,31.5,26.7 M31.5,23.7c-4.8,0-8.8,3.9-8.8,8.8s3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8S36.3,23.7,31.5,23.7L31.5,23.7 z"
        />
        <circle cx="31.5" cy="32.5" r="5.8" />
      </g>
    </>
  ),
  vor_dme: (
    <>
      <g>
        <path
          fill="#FFFFFF"
          d="M48.3,20v25H15.7V20H48.3 M58.3,10H5.7v45h52.7V10L58.3,10z"
        />
        <path d="M52.3,16v33H11.7V16H52.3 M58.3,10H5.7v45h52.7V10L58.3,10z" />
        <path
          fill="#FFFFFF"
          d="M58.3,10v45H5.7V10H58.3 M61.3,7h-3H5.7h-3v3v45v3h3h52.7h3v-3V10V7L61.3,7z"
        />
      </g>
      <g>
        <path
          fill="#FFFFFF"
          d="M39.1,19.9l7.2,12.5l-7.2,12.5H24.7l-7.2-12.5l7.2-12.5H39.1 M44.9,9.9h-26L6,32.4l13,22.5h26l13-22.5 L44.9,9.9L44.9,9.9z"
        />
        <path d="M41.4,15.9l9.5,16.5l-9.5,16.5h-19l-9.5-16.5l9.5-16.5H41.4 M44.9,9.9h-26L6,32.4l13,22.5h26l13-22.5L44.9,9.9L44.9,9.9z" />
      </g>
      <g>
        <path
          fill="#FFFFFF"
          d="M31.5,26.7c3.2,0,5.8,2.6,5.8,5.8c0,3.2-2.6,5.8-5.8,5.8c-3.2,0-5.8-2.6-5.8-5.8 C25.7,29.3,28.3,26.7,31.5,26.7 M31.5,23.7c-4.8,0-8.8,3.9-8.8,8.8s3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8S36.3,23.7,31.5,23.7L31.5,23.7 z"
        />
        <circle cx="31.5" cy="32.5" r="5.8" />
      </g>
    </>
  ),
  ndb: (
    <>
      <g opacity="0.39">
        <ellipse fill="#FFFFFF" cx="32" cy="32" rx="30.8" ry="29.8" />
      </g>
      <g>
        <circle cx="32" cy="32" r="10.3" />
        <path
          fill="#FFFFFF"
          d="M32,23.2c4.8,0,8.8,3.9,8.8,8.8s-3.9,8.8-8.8,8.8s-8.8-3.9-8.8-8.8S27.2,23.2,32,23.2 M32,20.2 c-6.5,0-11.8,5.3-11.8,11.8S25.5,43.8,32,43.8S43.8,38.5,43.8,32S38.5,20.2,32,20.2L32,20.2z"
        />
      </g>
    </>
  ),
  vortac: (
    <>
      <g>
        <path d="M32,34.5c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6c3.1,0,5.6,2.5,5.6,5.6C37.6,32,35.1,34.5,32,34.5z" />
        <path
          fill="#FFFFFF"
          d="M32,24.8c2.3,0,4.1,1.8,4.1,4.1S34.3,33,32,33s-4.1-1.8-4.1-4.1S29.7,24.8,32,24.8 M32,21.8 c-3.9,0-7.1,3.2-7.1,7.1S28.1,36,32,36s7.1-3.2,7.1-7.1S35.9,21.8,32,21.8L32,21.8z"
        />
      </g>
      <g>
        <path
          d="M23.8,59.2c-2,0-3.6-1.6-3.6-3.6V44.2l-7.3-12.8l-9.5-5.7c-1.6-1-2.2-3.1-1.3-4.8l8.2-14.4c0.7-1.1,1.8-1.8,3.1-1.8
    c0.6,0,1.3,0.2,1.8,0.5l9.4,5.7h14.5l9.4-5.7c0.6-0.3,1.2-0.5,1.8-0.5c1.3,0,2.5,0.7,3.1,1.8L61.8,21c1,1.7,0.4,3.8-1.3,4.8
    l-9.5,5.7l-7.3,12.8v11.4c0,2-1.6,3.6-3.6,3.6H23.8z M37,41.8l8.5-15l-5-8.8h-17l-5,8.8l8.5,15H37z"
        />
        <path
          fill="#FFFFFF"
          d="M50.5,6.3c0.7,0,1.4,0.4,1.8,1l8.2,14.4c0.6,1,0.2,2.2-0.7,2.8L50,30.4l-7.7,13.4v11.8
    c0,1.1-0.9,2.1-2.1,2.1H23.8c-1.1,0-2.1-0.9-2.1-2.1V43.8L14,30.4l-9.8-5.9c-1-0.6-1.3-1.8-0.7-2.8l8.2-14.4c0,0,0,0,0,0
    c0.4-0.6,1.1-1,1.8-1c0.4,0,0.7,0.1,1.1,0.3l9.8,5.9h15.3l9.8-5.9c0,0,0,0,0,0C49.8,6.4,50.1,6.3,50.5,6.3 M26.1,43.3h11.7
    l9.4-16.5l-5.9-10.3H22.6l-5.9,10.3L26.1,43.3 M50.5,3.3c-0.9,0-1.7,0.2-2.5,0.7l0,0l-0.1,0l-9.1,5.4H25.2L16.1,4
    c-0.8-0.5-1.7-0.7-2.6-0.7c-1.8,0-3.4,0.9-4.3,2.4l0,0l0,0.1L0.9,20.2c-1.4,2.4-0.6,5.4,1.8,6.8l9.1,5.5l6.9,12.1v11
    c0,2.8,2.3,5.1,5.1,5.1h16.4c2.8,0,5.1-2.3,5.1-5.1v-11l6.9-12.1l9.1-5.5c2.3-1.4,3.1-4.5,1.8-6.8L54.9,5.9
    C54,4.3,52.3,3.3,50.5,3.3L50.5,3.3z M24.3,19.6h15.3l4.1,7.3l-7.7,13.5h-8.2l-7.7-13.5L24.3,19.6L24.3,19.6z"
        />
      </g>
    </>
  ),
  tacan: (
    <>
      <g>
        <path d="M32,33.5c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6c3.1,0,5.6,2.5,5.6,5.6C37.6,31,35.1,33.5,32,33.5z" />
        <path
          fill="#FFFFFF"
          d="M32,23.8c2.3,0,4.1,1.8,4.1,4.1S34.3,32,32,32c-2.3,0-4.1-1.8-4.1-4.1S29.7,23.8,32,23.8 M32,20.8 c-3.9,0-7.1,3.2-7.1,7.1S28.1,35,32,35s7.1-3.2,7.1-7.1S35.9,20.8,32,20.8L32,20.8z"
        />
      </g>
      <g>
        <path
          d="M23.8,58c-2,0-3.5-1.6-3.5-3.5V43.1l-7.2-12.7l-9.4-5.6c-1.6-1-2.2-3.1-1.3-4.8l8.2-14.3C11.2,4.7,12.4,4,13.7,4
    c0.6,0,1.2,0.2,1.8,0.5l9.4,5.7h14.4l9.4-5.6C49.1,4.2,49.7,4,50.3,4c1.2,0,2.4,0.7,3,1.7l8.2,14.3c0.9,1.7,0.4,3.8-1.3,4.8
    l-9.4,5.6l-7.2,12.7v11.3c0,2-1.6,3.5-3.5,3.5H23.8z M36.6,50.9v-9.6l9.1-15.9l8-4.8l-4.6-8.1l-7.9,4.8H22.9l-7.9-4.8l-4.6,8.1
    l8,4.8l9.1,15.9v9.6H36.6z"
        />
        <path
          fill="#FFFFFF"
          d="M13.7,5.5c0.3,0,0.7,0.1,1,0.3c0,0,0,0,0,0l9.7,5.8h15.2l9.7-5.8c0.3-0.2,0.7-0.3,1-0.3
    c0.7,0,1.4,0.4,1.8,1c0,0,0,0,0,0l8.2,14.3c0.6,1,0.2,2.2-0.7,2.8l-9.7,5.8l-7.6,13.3v11.7c0,1.1-0.9,2-2,2H23.8c-1.1,0-2-0.9-2-2
    V42.7l-7.6-13.3l-9.7-5.8c-1-0.6-1.3-1.8-0.7-2.8l8.2-14.3C12.3,5.9,12.9,5.5,13.7,5.5 M23.3,15.7l-8.9-5.3L8.3,21.1l8.9,5.4
    l8.7,15.2v10.7h12.2V41.7l8.7-15.2l8.9-5.4l-6.1-10.7l-8.9,5.3H23.3 M13.7,2.5c-1.8,0-3.5,1-4.4,2.5L1.1,19.3
    c-1.3,2.4-0.5,5.4,1.8,6.8l9.1,5.4l6.8,12v10.9c0,2.8,2.3,5,5,5h16.3c2.8,0,5-2.3,5-5V43.5l6.8-12l9.1-5.4
    c2.3-1.4,3.1-4.5,1.8-6.8L54.7,5l0,0l0-0.1c-0.9-1.5-2.6-2.4-4.3-2.4c-0.9,0-1.8,0.2-2.6,0.7l-9,5.4H25.2l-9-5.4l0,0l-0.1,0
    C15.4,2.7,14.5,2.5,13.7,2.5L13.7,2.5z M22.4,18.7h0.8h17.4h0.8l0.7-0.4l6.3-3.8l3.2,5.5l-6.4,3.9l-0.7,0.4L44.2,25l-8.7,15.2
    l-0.4,0.7v0.8v7.7h-6.2v-7.7v-0.8l-0.4-0.7L19.8,25l-0.4-0.7l-0.7-0.4L12.3,20l3.2-5.5l6.3,3.8L22.4,18.7L22.4,18.7z"
        />
      </g>
    </>
  ),
}

export const NavaidMarker = ({
  navaid,
  children,
}: {
  navaid: Navaid
  children?: ReactNode
}) => {
  const icon = (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        enableBackground="new 0 0 64 64"
        xmlSpace="preserve"
      >
        {ICONS[navaid.type.toLowerCase()] ?? ICONS["rnav"]}
      </svg>
      <div className="marker-label navaid-label">{navaid.designator}</div>
    </>
  )

  const element = L.DomUtil.create("div")

  const divIcon = L.divIcon({
    html: element,
    className: `navaid navaid-${navaid.type.toLowerCase()}`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })

  return (
    <>
      {createPortal(icon, element)}
      <Marker position={navaid.location as LatLngExpression} icon={divIcon}>
        <Tooltip>
          <Flex
            sx={{
              gap: 2,
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box>
              <Text variant="mapAd">{navaid.designator}</Text>{" "}
              {navaid.designator !== navaid.name && navaid.name}
            </Box>
            {(navaid.frequency || navaid.channel) && (
              <Box>
                {navaid.frequency} {navaid.channel}
              </Box>
            )}
          </Flex>
          {children}
        </Tooltip>
      </Marker>
    </>
  )
}