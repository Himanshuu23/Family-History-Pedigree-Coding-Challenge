import { FamilyMember } from "./member";

interface Step {
  id: number;
  text: string;
  field: keyof FamilyMember;
  inputType?: string;
  isYesNo?: boolean;
  showIf?: () => boolean;
}