import LintResult from "../interface/LintResult";
import EditIcon from "../assets/edit.svg";

interface props {
  lintResult: LintResult;
}

export const LintResultCard = (props: props) => (
  <div
    className={
      "mb-2 rounded-lg border border-indigo-200 bg-white p-4 shadow-md shadow-indigo-50"
    }
  >
    <div className="flex items-center">
      <EditIcon className="w-12" />
      <div>
        <p className="ml-2 mb-0.5 font-sans text-sm tracking-widest text-indigo-600 antialiased">
          {props.lintResult.ruleId}
        </p>
        <p className="ml-2 font-sans text-base tracking-wider antialiased">
          {props.lintResult.message}
        </p>
      </div>
    </div>
  </div>
);

export default LintResultCard;
