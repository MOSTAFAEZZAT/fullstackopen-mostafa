import diagnose from "../../data/diagnoses";   
import { Diagnose  } from "../types";

export const getDiagnoses = (): Diagnose[] => {
    return diagnose.map(({ code, name, latin }) => ({
        code,
        name,
        latin
    }));
};

export const getDiagnosesByCode = (codes: string[]): Diagnose[] => {
return diagnose.filter((diagnose) => codes.includes(diagnose.code));
};