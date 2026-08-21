/** Default combined catalogue. Individual exports replace this module at build time. */
import { closureReports } from "./courses/closure-reports";
import { pmFundamentals } from "./courses/pm-fundamentals";

export const catalogPackages = [pmFundamentals, closureReports];
