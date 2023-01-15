export default interface LintResult {
  column: number; //当該行における何文字目[end]かを表す
  index: number; //当該行における何文字目[start]かを表す
  line: number;
  loc: object;
  message: string; //エラーメッセージ
  range: number[];
  ruleId: string; //ルールID
  severaty: number; //エラーの重要度
  type: string;
  fix?: fix;
}

interface fix {
  range: number[];
  text: string;
}
