import LintResult from "../interface/LintResult";

export const getHitLintLineNumberList = (lintResult: LintResult[]) => {
  const hitLintLineNumberList = lintResult.map((lint) => lint.line);
  return hitLintLineNumberList;
};

export const getHitLintResultByLineNum = (
  lintResult: LintResult[],
  lineNum: number
) => {
  const hitLintResult = lintResult.filter((lint) => lint.line === lineNum);
  return hitLintResult;
};
