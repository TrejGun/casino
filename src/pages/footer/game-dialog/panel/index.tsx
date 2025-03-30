import {memo, ReactNode} from "react";
import {Card, CardContent, Typography} from "@mui/material";

export interface IPanelProps {
  children: ReactNode;
}

export const Panel = memo((props: IPanelProps) => {
  const {children} = props;

  return (
    <Card>
      <CardContent>
        <Typography
          sx={{
            width: 65,
            fontSize: 48,
            textAlign: "center",
          }}
        >
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
});
