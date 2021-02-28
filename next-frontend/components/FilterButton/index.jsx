import React from "react"
import { Button } from "react-bootstrap"

const FilterButton = ({
  title,
  triggerHandler,
  variant,
  type,
  size,
  block,
  disabled,
  className,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      block={block}
      disabled={disabled}
      className={className}
      size={size}
      onClick={triggerHandler}>
      {title}
    </Button>
  )
}

export default FilterButton
