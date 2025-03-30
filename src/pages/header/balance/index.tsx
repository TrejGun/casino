import {FC, useContext} from "react";
import {Typography} from "@mui/material";

import {BalanceContext} from "../../../components/balance-provider";

export const Balance: FC = () => {
  const wallet = useContext(BalanceContext);

  return (
    <Typography
      sx={theme => ({
        fontSize: 24,
        fontWeight: 500,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      })}
    >
      Balance: ${wallet.balance.toFixed(2)}
    </Typography>
  );
};
