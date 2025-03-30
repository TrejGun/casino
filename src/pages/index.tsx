import {FC, useCallback, useRef} from "react";
import {Box, Container} from "@mui/material";

import {UserProvider} from "../components/user-provider";
import {BalanceProvider} from "../components/balance-provider";
import {Header} from "./header";
import {Footer} from "./footer";
import {IResultsSelectorRef, Results} from "./content";

const App: FC = () => {
  const ref = useRef<IResultsSelectorRef>(null);

  const handleResults = useCallback((results: Array<string>) => ref.current?.addRow(results), [ref]);

  return (
    <UserProvider>
      <BalanceProvider balance={100}>
        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            minHeight: "100vh",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Header />
          <Container
            sx={theme => ({
              paddingTop: theme.spacing(11),
              paddingBottom: theme.spacing(11),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              [theme.breakpoints.up("sm")]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
              },
            })}
            maxWidth="md"
          >
            <Results ref={ref} />
          </Container>
          <Footer onResults={handleResults} />
        </Box>
      </BalanceProvider>
    </UserProvider>
  );
};

export default App;
