import React, { ReactNode } from "react";
import { SlideFade, SlideFadeProps } from "@chakra-ui/react";

const CustomSlideFade = ({ disabled = false, children, ...props }: CustomSlideFadeProps) => (
  disabled ?
    <>{children}</> :
    <SlideFade offsetY="100px" {...props}>
      {children}
    </SlideFade>
);

interface CustomSlideFadeProps extends SlideFadeProps {
  disabled?: boolean,
  children: ReactNode,
}

export default CustomSlideFade;
