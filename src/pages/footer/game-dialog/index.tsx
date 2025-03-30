import {FC, useContext, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, type DialogProps, Grid} from "@mui/material";

import {BalanceContext} from "../../../components/balance-provider";
import {Panel} from "./panel";

export enum OPTIONS {
  SPADES = "♠",
  HEARTS = "♥",
  DIAMS = "♦",
  CLUBS = "♣",
}

const PLACEHOLDER = "?";

export interface IGameDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  onResults: (results: Array<string>) => void;
}

export const GameDialog: FC<IGameDialogProps> = props => {
  const {onClose, onResults, ...rest} = props;

  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState([PLACEHOLDER, PLACEHOLDER, PLACEHOLDER]);
  const wallet = useContext(BalanceContext);

  const handleClose = () => {
    onClose();
  };

  const getRandomOption = (): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const options = Object.values(OPTIONS);
        resolve(options[Math.floor(Math.random() * options.length)]);
      }, 1000);
    });
  };

  const calcResult = (results: Array<string>) => {
    if (results[0] === results[1] && results[1] === results[2] && results[2] === OPTIONS.SPADES) {
      return 5;
    }
    if (results[0] === results[1] && results[1] === results[2]) {
      return 2;
    }
    if (results[0] === results[1] || results[0] === results[2] || results[1] === results[2]) {
      return 0.5;
    }
    // results[0] !== results[1]  && results[0] !== results[2] && results[1]  !== results[2]
    return 0;
  };

  const handleSpin = async () => {
    setIsActive(true);
    wallet.update(-1);
    setResults([PLACEHOLDER, PLACEHOLDER, PLACEHOLDER]);
    const slot1 = await getRandomOption();
    setResults([slot1, PLACEHOLDER, PLACEHOLDER]);
    const slot2 = await getRandomOption();
    setResults([slot1, slot2, PLACEHOLDER]);
    const slot3 = await getRandomOption();
    setResults([slot1, slot2, slot3]);
    // adding -1 because context is not updated yet
    wallet.update(calcResult([slot1, slot2, slot3]) - 1);
    onResults([slot1, slot2, slot3]);
    setIsActive(false);
  };

  const handleDebug = () => {
    setIsActive(true);
    wallet.update(-1);
    setResults([OPTIONS.SPADES, OPTIONS.SPADES, OPTIONS.SPADES]);
    // adding -1 because context is not updated yet
    wallet.update(calcResult([OPTIONS.SPADES, OPTIONS.SPADES, OPTIONS.SPADES]) - 1);
    onResults([OPTIONS.SPADES, OPTIONS.SPADES, OPTIONS.SPADES]);
    setIsActive(false);
  };

  return (
    <Dialog onClose={handleClose} {...rest}>
      <DialogContent>
        <Grid container spacing={2}>
          {results.map((result, i) => (
            <Grid size={{xs: 4}} key={i}>
              <Panel>{result}</Panel>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDebug} variant="text">
          @
        </Button>
        <Box sx={{flexGrow: 1}} />
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSpin} color="primary" autoFocus disabled={isActive || wallet.balance <= 0.5}>
          Spin
        </Button>
      </DialogActions>
    </Dialog>
  );
};
