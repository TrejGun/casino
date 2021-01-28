"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
exports.default = core_1.makeStyles(theme => ({
    appbar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        minHeight: theme.spacing(8),
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        color: theme.palette.common.white,
        textDecoration: "none",
        fontWeight: 500,
        fontSize: 24,
        "&:hover": {
            textDecoration: "none",
        },
    },
    fab: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}), { name: "Header" });
//# sourceMappingURL=styles.js.map