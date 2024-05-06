const PORT_LABELS = ["left", "pin1", "right", "pin2"] as const

const useResistor = (name: string, props?: any) => {
  const R: any = (props2: any) => {
    const combinedProps = { ...props, ...props2 }
    const tracesToCreate: any[] = []
    for (const port_label of PORT_LABELS) {
      if (combinedProps[port_label]) {
        const from = `.${name} > .${port_label}`
        const to = combinedProps[port_label]
        tracesToCreate.push({ from, to })
        delete combinedProps[port_label]
      }
    }

    return (
      <>
        <resistor name={name} {...props} {...props2} />
        {tracesToCreate.map((trace, i) => (
          <trace key={i} {...trace} />
        ))}
      </>
    )
  }
  for (const port of PORT_LABELS) {
    R[port] = `.${name} > .${port}`
  }
  return R
}
